import { Knex } from "knex";
// import { HttpError } from "../error";

export interface FilledFormFields {
  form_id: number;
  field_id: number;
  content: string;
}

export interface FilledForm {
  filledFormFields: FilledFormFields[];
}

export class FormResponseService {
  constructor(private knex: Knex) {}

  async getFormDetails(form_id: number) {
    let refFormDetails = [];
    let searchReferencedForms = await this.knex
      .from("form_reference")
      .innerJoin("form", "form.id", "form_reference.reference_form_id")
      .where("form_reference.form_id", form_id)
      .select("form_reference.reference_form_id");

    for (let { reference_form_id } of searchReferencedForms) {
      let result = await this.knex.raw(
        /* sql */ `
select field.id as field_id,
    field.label,
    field.type,
    field.order,
    form_response.content
from form
    inner join template on template.id = form.template_id
    inner join field on field.template_id = template.id
    left join form_response on form_response.field_id = field.id
    and form_response.form_id = form.id
where form.id = ?
order by field.order asc
`,
        [reference_form_id]
      );

      refFormDetails.push({
        form_id: reference_form_id,
        fields: result.rows,
      });
    }

    let form = await this.knex
      .where("form.id", form_id)
      .from("form")
      .select("form.filler_id")
      .first();

    let filler_id = form?.filler_id;

    let result = await this.knex.raw(
      /* sql */ `
SELECT field.id as field_id,
    field.label,
    field.type,
    field.order,
    form_response.content
from form
    inner join field on field.template_id = form.template_id
    left join form_response on form_response.field_id = field.id
    and form_response.form_id = form.id
where form.id = ?
order by field.order asc
`,
      [form_id]
    );
    let fields = result.rows;
    console.log(fields);

    return {
      formDetails: { fields, filler_id },
      referenceForms: refFormDetails,
    };
  }

  async saveDraft(
    form_id: number,
    fields: { field_id: number; content: string }[]
  ) {
    await this.knex.transaction(async (knex) => {
      for (let field of fields) {
        let row = await knex("form_response")
          .select("id")
          .where({ form_id, field_id: field.field_id })
          .first();
        if (row) {
          await knex("form_response")
            .where({ id: row.id })
            .update({ content: field.content });
        } else {
          await knex("form_response").insert({
            form_id,
            field_id: field.field_id,
            content: field.content,
          });
        }
      }
    });
    return {};
  }

  //   async submitFilledForm() {
  //     await this.knex
  //       .insert
  //       // field_id:submitedContent.field_id,
  //       // form_id:,
  //       // content:,
  //       ();
  //   }

  // async submitFilledForm(filledFormFields: FilledFormFields) {
  //     for (let field of filledFormFields)
  // }
}
