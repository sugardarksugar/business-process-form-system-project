import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Form } from '../form.service';
import { ApiService } from '../api.service';
import { FormService } from '../form.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.page.html',
  styleUrls: ['./create-template.page.scss'],
})
export class CreateTemplatePage implements OnInit {
  nextOrder = 1;

  form: Form = {
    title: '',
    fields: [],
  };

  constructor(public formService: FormService, public api: ApiService) {}

  reorderForm(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log(ev);
  }
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  ngOnInit() {
    this.addField();
  }

  addField() {
    this.form.fields.push({ label: '', type: '', order: this.nextOrder });
    this.nextOrder++;
  }

  removeField(i: number) {
    this.form.fields.splice(i, 1);
  }

  get json(): string {
    return JSON.stringify(this.form, null, 2);
  }

  async saveForm(form: Form) {
    await this.formService.createTemplate(form);
  }
}
