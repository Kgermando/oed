import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactsRecuComponent } from './contacts-recu/contacts-recu.component';
import { ContactsEcrireComponent } from './contacts-ecrire/contacts-ecrire.component';
import { ContactsEditComponent } from './contacts-edit/contacts-edit.component';
import { ContactsViewComponent } from './contacts-view/contacts-view.component';


const routes: Routes = [
  { path: '', component: ContactsComponent, children: [
    { path: 'contacts-recu', component: ContactsRecuComponent},
    { path: 'contact-ecrire', component: ContactsEcrireComponent },
    { path: 'contact-edit/:id', component: ContactsEditComponent },
    { path: 'contact-view/:id', component: ContactsViewComponent },
    { path: 'contact-view/:id/admin/contacts/contact-ecrire', component: ContactsEcrireComponent },

    { path: '', redirectTo: 'contacts-recu', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
