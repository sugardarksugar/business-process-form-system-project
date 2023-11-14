import { NextFunction, Request, Response } from "express";
import { FormService } from "../services/form.services";
import { array, email, id, object, optional, string } from "cast.ts";
import { decodeToken } from "../jwt";

export class FormController {
  constructor(private formService: FormService) {}

  createTemplate = async (req: Request, res: Response) => {
    let form = req.body;

    if (!form.title) {
      return res.json({
        status: false,
        type: "text",
        message: "Please input from title!",
      });
    }

    let checkDupTemplateName = await this.formService.checkDupTemplateName(
      form
    );

    if (checkDupTemplateName.length >= 1) {
      return res.json({
        status: false,
        type: "text",
        message: "Template name already taken!",
      });
    }

    await this.formService.createTemplate(form);

    return res.json({
      status: true,
      type: "text",
      message: "Template Saved!",
    });
  };

  searchForm = async (req: Request, res: Response) => {
    let title = req.query.title as string;
    res.json(await this.formService.searchForm(title));
  };

  searchReferenceForm = async (req: Request, res: Response) => {
    let referenceTitle = req.query.title as string;
    res.json(await this.formService.searchReferenceForm(referenceTitle));
  };

  submitForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let parser = object({
        body: object({
          title: string(),
          referenceForms_ids: optional(array(string())),
          template_id: id(),
          filler_email: email(),
          viewer_emails: array(email()),
        }),
      });

      let submitForm = parser.parse(req).body;
      console.log("submitForm ", submitForm);
      let creator_id = decodeToken(req).id;

      await this.formService.submitForm({
        ...submitForm,
        creator_id,
      });

      res.json({
        status: true,
        type: "text",
        message: "Form Submitted",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getViewerForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user_id = decodeToken(req).id;

      await this.formService.getViewerForm(user_id);

      let json = await this.formService.getViewerForm(user_id);

      res.json(json);
    } catch (error) {
      next(error);
    }
  };

  getFillerForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user_id = decodeToken(req).id;

      await this.formService.getFillerForm(user_id);

      let json = await this.formService.getFillerForm(user_id);

      res.json(json);
    } catch (error) {
      next(error);
    }
  };

  deleteReceivedForm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let deleteReceivedFormInfo = req.body;
      console.log("deleteReceivedFormInfo:", deleteReceivedFormInfo);

      let deleteFormResult = await this.formService.deleteReceivedForm(
        deleteReceivedFormInfo.formID,
        deleteReceivedFormInfo.userID
      );
      if (deleteFormResult === "viewerFormDeleted") {
        alert("Deleted Received Viewer Form Success!");
      } else {
        return alert(
          "Deleted all Received Form Including Viewer and Filler Success!"
        );
      }
    } catch (error) {
      return next(error);
    }
  };
}
