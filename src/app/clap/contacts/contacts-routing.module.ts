import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { AuthGuard } from '#app/core/auth/auth.guard';

const contactsRoutes: Routes = [
  {
    path: 'contacts',
    component: ContactsComponent,
    children: [
      {
        path: '',
        component: ContactListComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.list' }
      },
      {
        path: 'new',
        component: ContactEditComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.new' }
      },
      {
        path: ':id/edit',
        component: ContactEditComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.edit' }
      }
    ],
    canActivate: [AuthGuard],
    data: { function: 'rights' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(contactsRoutes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
