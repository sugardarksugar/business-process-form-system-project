import { Component, OnInit } from '@angular/core';
import { FillerForm, FormService, ViewerForm } from '../form.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { log } from 'console';
import {
  FormResponseService,
  DeleteReceivedFormDetails,
} from '../form-response.service';

type AnyForm = { role: string } & (ViewerForm | FillerForm);

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  constructor(
    private router: Router,
    public formService: FormService,
    public api: ApiService,
    public formResponseService: FormResponseService
  ) {}

  viewerForms: ViewerForm[] = [];

  fillerForms: FillerForm[] = [];

  allForms: AnyForm[] = [];

  deleteReceivedFormDetails: DeleteReceivedFormDetails = {
    formID: '',
    userID: '',
  };

  updateAllForms() {
    this.allForms = [
      ...this.viewerForms.map((form) =>
        Object.assign(form, { role: 'viewer' })
      ),
      ...this.fillerForms.map((form) =>
        Object.assign(form, { role: 'filler' })
      ),
    ].sort(
      (a, b) =>
        new Date(b.submit_time).getTime() - new Date(a.submit_time).getTime()
    );
  }

  async getSubmittedFormAsViewer() {
    let id = this.api.jwtPayload ? this.api.jwtPayload.id : -1;
console.log('id:',id);

    await this.formService.getSubmittedFormAsViewer(id, (json) => {
      if (json.viewerForms) {
        this.viewerForms = json.viewerForms;
        this.updateAllForms();
      }
    });
  }

  async getSubmittedFormAsFiller() {
    let id = this.api.jwtPayload ? this.api.jwtPayload.id : -1;
    await this.formService.getSubmittedFormAsFiller(id, (json) => {
      if (json.fillerForms) {
        this.fillerForms = json.fillerForms;
        this.updateAllForms();
      }
    });
  }

  deleteReceivedForm(form_id: number) {
    let deleteReceivedFormDetails = {
      formID: '',
      userID: '',
    };
    deleteReceivedFormDetails.formID = form_id.toString();
    deleteReceivedFormDetails.userID = this.api.jwtPayload?.id.toString()!;
    this.formService.deleteReceivedForm(deleteReceivedFormDetails);
    // window.location.reload();
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.getSubmittedFormAsViewer();
    await this.getSubmittedFormAsFiller();
  }
}
