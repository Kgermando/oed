import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { HomeComponent } from './home/home.component';
import { FormsMembresComponent } from './forms-membres/forms-membres.component';
import { ContactComponent } from './contact/contact.component';
import { FormsPartenairesComponent } from './forms-partenaires/forms-partenaires.component';


const routes: Routes = [
  { path: '', component: LayoutsComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'forms-membres', component: FormsMembresComponent },
    { path: 'forms-paternaires', component: FormsPartenairesComponent },
    { path: 'contact', component: ContactComponent },
    
    { path: '', redirectTo: 'home', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
