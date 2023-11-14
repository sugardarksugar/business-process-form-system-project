import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormContentPageRoutingModule } from './form-content-routing.module';

import { FormContentPage } from './form-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormContentPageRoutingModule
  ],
  declarations: [FormContentPage]
})
export class FormContentPageModule {}
