import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { HomeComponent } from './home/home.component';
import { FormsMembresComponent } from './forms-membres/forms-membres.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FormsPersonMoraleComponent } from './forms-person-morale/forms-person-morale.component';
import { ActivitesComponent } from './activites/activites.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';


const routes: Routes = [
  { path: '', component: LayoutsComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'forms-membres', component: FormsMembresComponent },
    { path: 'forms-person-morale', component: FormsPersonMoraleComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'activites', component: ActivitesComponent },
    { path: 'activites-detail/:id', component: ActivityDetailComponent },
    
    { path: '', redirectTo: 'home', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
