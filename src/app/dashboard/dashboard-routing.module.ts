import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ProfileOpportunityComponent } from './profile-opportunity/profile-opportunity.component';
import { ProfileOpportunityDetailComponent } from './profile-opportunity-detail/profile-opportunity-detail.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'profile', component: ProfileComponent },
    { path: 'profile-update', component: ProfileUpdateComponent },
    { path: 'profile-opportunity', component: ProfileOpportunityComponent },
    { path: 'profile-opportunity-detail', component: ProfileOpportunityDetailComponent },

    { path: '', redirectTo: 'profile', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
