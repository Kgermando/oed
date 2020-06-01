import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsMembresComponent } from './forms-membres/forms-membres.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FormsPersonMoraleComponent } from './forms-person-morale/forms-person-morale.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivitesComponent } from './activites/activites.component';
import { ActivitesFilterComponent } from './activites/activites-filter/activites-filter.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [LayoutsComponent, HomeComponent, FormsMembresComponent, ContactComponent, 
                 AboutComponent, FormsPersonMoraleComponent, ActivityDetailComponent, ActivitesComponent,
                 ActivitesFilterComponent],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    SharedModule,
    LottieModule.forRoot({ player: playerFactory })
  ]
})
export class LayoutsModule { }
