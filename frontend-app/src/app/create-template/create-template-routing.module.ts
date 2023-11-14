import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTemplatePage } from './create-template.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTemplatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTemplatePageRoutingModule {}
