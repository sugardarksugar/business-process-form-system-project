import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormResponseService,
  Field,
  ReferenceForm,
} from '../form-response.service';
import {
  FormService,
  SearchFormResult,
  SearchResultForm,
  SubmitFormContent,
} from '../form.service';

@Component({
  selector: 'app-form-content',
  templateUrl: './form-content.page.html',
  styleUrls: ['./form-content.page.scss'],
})
export class FormContentPage implements OnInit {
  form_id = +this.route.snapshot.paramMap.get('id')!;
  fields: Field[] = [];
  filler_id?: number;
  referenceForms: ReferenceForm[] = [];

  get permission(): 'filler' | 'viewer' {
    return this.api.jwtPayload?.id == this.filler_id ? 'filler' : 'viewer';
  }

  searchResult?: SearchFormResult;

  submitFormContent: SubmitFormContent = {
    title: '',
    referenceForms_ids: [],
    template_id: 0,
    viewer_emails: '',
    filler_email: '',
  };

  templateName = '';

  refForms = [] as any;

  constructor(
    public api: ApiService,
    public route: ActivatedRoute,
    public formResponseService: FormResponseService,
    public formService: FormService
  ) {}

  searchTemplate() {
    this.formService.searchFormsByTitle(this.templateName, (json) => {
      this.searchResult = json;
      console.log(json);
    });
  }

  selectedForm(form: SearchResultForm) {
    this.submitFormContent.template_id = form.id;
    this.templateName = form.name;
  }

  getFormDetails() {
    let id = +this.form_id!;

    if (!id) return;
    this.formResponseService.getFormDetails(id, (json) => {
      this.fields = json.formDetails.fields;
      this.filler_id = json.formDetails.filler_id;
      this.refForms = json.referenceForms;
    });
  }

  saveDraft() {
    this.formResponseService.saveDraft(
      this.form_id,
      this.fields.map((field) => ({
        field_id: field.field_id,
        content: field.content || '',
      })),
      () => {
        this.api.showSuccess('Saved Draft');
      }
    );
  }

  async ngOnInit() {
    this.getFormDetails();
  }
}
