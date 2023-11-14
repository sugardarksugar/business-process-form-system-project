import { array, id, object, string } from "cast.ts";
import { FormResponseService } from "../services/form-response.service";
import { NextFunction, Request, Response } from "express";

export class FormResponseController {
  constructor(public formResponseService: FormResponseService) {}

  getFormDetails = async (req: Request, res: Response) => {
    let form_id = +req.params.id;
    let json = await this.formResponseService.getFormDetails(form_id);

    return res.status(200).json(json);
  };

  //   submitFilledForm = async (req: Request, res: Response) => {
  //     try {
  //       let filledForm = req.body;
  //       let json = await this.formResponseService.submitFilledForm(filledForm);

  //       return res.status(200).json(json);
  //     } catch (error) {}
  //   };

  saveDraft = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let parser = object({
        params: object({
          id: id(),
        }),
        body: array(
          object({
            field_id: id(),
            content: string(),
          })
        ),
      });
      let input = parser.parse(req);
      let json = await this.formResponseService.saveDraft(
        input.params.id,
        input.body
      );

      res.json(json);
    } catch (error) {
      console.log(error);

      next(error);
    }
  };
}
