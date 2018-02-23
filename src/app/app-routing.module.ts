import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOptionsFormComponent } from './components/account-options-form/account-options-form.component';

const appRoutes: Routes = [
  { path: '', component: AccountOptionsFormComponent, data: { readonly: false } },
  { path: 'readonly', component: AccountOptionsFormComponent, data: { readonly: true } },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
