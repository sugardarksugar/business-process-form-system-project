import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitFormPage } from './submit-form.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitFormPageRoutingModule { }
