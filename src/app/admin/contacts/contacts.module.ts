import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactsRecuComponent } from './contacts-recu/contacts-recu.component';
import { ContactsEcrireComponent } from './contacts-ecrire/contacts-ecrire.component';
import { ContactsEditComponent } from './contacts-edit/contacts-edit.component';
import { ContactsViewComponent } from './contacts-view/contacts-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ContactsComponent, ContactsRecuComponent, ContactsEcrireComponent, ContactsEditComponent, ContactsViewComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    SharedModule
  ]
})
export class ContactsModule { }
