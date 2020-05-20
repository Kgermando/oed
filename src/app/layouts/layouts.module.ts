import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsMembresComponent } from './forms-membres/forms-membres.component';
import { FormsPartenairesComponent } from './forms-partenaires/forms-partenaires.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ActivityComponent } from './activity/activity.component';


@NgModule({
  declarations: [LayoutsComponent, HomeComponent, FormsMembresComponent, FormsPartenairesComponent, ContactComponent, AboutComponent, ActivityComponent],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    SharedModule
  ]
})
export class LayoutsModule { }
