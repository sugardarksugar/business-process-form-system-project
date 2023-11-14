import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubmitFormPageRoutingModule } from './submit-form-routing.module';
import { SubmitFormPage } from './submit-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitFormPageRoutingModule
  ],
  declarations: [SubmitFormPage]
})
export class SubmitFormPageModule { }
