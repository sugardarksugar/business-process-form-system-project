import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormContentPage } from './form-content.page';

const routes: Routes = [
  {
    path: '',
    component: FormContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormContentPageRoutingModule {}
