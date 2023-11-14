import { Knex } from "knex";
import { HttpError } from "../error";

export class FormService {
  constructor(private knex: Knex) {}

  async createTemplate(form: { title: string; fields: any[] }) {
    let templateId = await this.knex
      .insert({ name: form.title })
      .into("template")
      .returning("id");

    for (let field of form.fields) {
      await this.knex
        .insert({
          template_id: templateId[0].id,
          label: field.label,
          type: field.type,
          order: field.order,
        })
        .into("field");
    }
  }

  async checkDupTemplateName(form: { title: string; fields: any[] }) {
    let templateName = await this.knex
      .select("name")
      .from("template")
      .where("name", form.title);
    return templateName;
  }

  async searchForm(title: string) {
    let forms = await this.knex
      .select("id", "name")
      .from(`template`)
      .whereILike("name", "%" + title + "%");

    return { forms };
  }

  async searchReferenceForm(referenceTitle: string) {
    let referenceForms = await this.knex
      .select("id", "submitted_title")
      .from(`form`)
      .whereILike("submitted_title", "%" + referenceTitle + "%");
    console.log("referenceForms:", referenceForms);

    return { referenceForms };
  }

  async getUserIdByEmail(email: string): Promise<number> {
    let user = await this.knex
      .from("user")
      .where("email", email)
      .select("id")
      .first();
    if (!user) {
      throw new HttpError(404, "User not found, email: " + email);
    }
    return user.id;
  }
  async submitForm(submitForm: {
    title: string;
    referenceForms_ids?: string[];
    template_id: number;
    filler_email: string;
    viewer_emails: string[];
    creator_id: number;
  }) {
    let create_time = new Date();
    let remove_time = new Date(new Date().setDate(create_time.getDate() + 30));

    let [row] = await this.knex
      .insert({
        submitted_title: submitForm.title,
        template_id: submitForm.template_id,
        creator_id: submitForm.creator_id,
        filler_id: await this.getUserIdByEmail(submitForm.filler_email),
        submit_time: create_time,
        remove_time: remove_time,
      })
      .into("form")
      .returning("id");

    let form_id = row.id;

    if (submitForm.referenceForms_ids) {
      for (let referenceForm_id of submitForm.referenceForms_ids) {
        await this.knex
          .insert({
            form_id: form_id,
            reference_form_id: referenceForm_id,
          })
          .into("form_reference");
      }
    }

    for (let email of submitForm.viewer_emails) {
      await this.knex
        .insert({
          form_id: form_id,
          user_id: await this.getUserIdByEmail(email),
        })
        .into("form_viewer");
    }
  }
  async getViewerForm(user_id: number) {
    let viewerForms = await this.knex
      .from("form")
      .where("form_viewer.user_id", user_id)
      .select(
        "form_id",
        "submitted_title",
        "submit_time",
        "user.email as creator_email"
      )
      .innerJoin("form_viewer", "form_viewer.form_id", "form.id")
      .innerJoin("user", "user.id", "creator_id");

    return { viewerForms };
  }

  async getFillerForm(user_id: number) {
    let fillerForms = await this.knex
      .from("form")
      .where("filler_id", user_id)
      .innerJoin("user", "user.id", "creator_id")
      .select(
        "form.id as form_id",
        "submitted_title",
        "submit_time",
        "user.email as creator_email"
      );

    return { fillerForms };
  }

  async deleteReceivedForm(formID: number, userID: number) {
    let query = this.knex
      .from("form_viewer")
      .delete()
      .where("form_id", formID)
      .where("user_id", userID);
    console.log("query:", query.toSQL());
    await query;

    return "viewerFormDeleted";
  }
}
