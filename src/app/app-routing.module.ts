import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultHomeComponent } from './clap/homes/default-home/default-home.component';
import { AuthGuard } from './core/auth/auth.guard';


const routes: Routes = [
  { path: '', component: DefaultHomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
