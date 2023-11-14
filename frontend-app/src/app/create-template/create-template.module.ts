import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTemplatePageRoutingModule } from './create-template-routing.module';

import { CreateTemplatePage } from './create-template.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTemplatePageRoutingModule
  ],
  declarations: [CreateTemplatePage]
})
export class CreateTemplatePageModule {}
