import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'submit/form',
    loadChildren: () =>
      import('./submit-form/submit-form.module').then(
        (m) => m.SubmitFormPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminPageModule),
  },
  {
    path: 'create/user',
    loadChildren: () =>
      import('./create-user/create-user.module').then(
        (m) => m.CreateUserPageModule
      ),
  },
  {
    path: 'Inbox',
    loadChildren: () =>
      import('./inbox/inbox.module').then((m) => m.InboxPageModule),
  },
  {
    path: 'form-content/:id',
    loadChildren: () =>
      import('./form-content/form-content.module').then(
        (m) => m.FormContentPageModule
      ),
  },
  {
    path: 'create-template',
    loadChildren: () =>
      import('./create-template/create-template.module').then(
        (m) => m.CreateTemplatePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
