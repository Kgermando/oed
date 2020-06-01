import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpportunityComponent } from './opportunity.component';
import { OpportunityAddComponent } from './opportunity-add/opportunity-add.component';
import { OpportunityListComponent } from './opportunity-list/opportunity-list.component';
import { OpportunityEditComponent } from './opportunity-edit/opportunity-edit.component';
import { OpportunityViewComponent } from './opportunity-view/opportunity-view.component';


const routes: Routes = [
  { path: '', component: OpportunityComponent, children: [
    { path: 'opportunity-add', component: OpportunityAddComponent },
    { path: 'opportunity-list', component: OpportunityListComponent },
    { path: 'opportunity-edit/:id', component: OpportunityEditComponent },
    { path: 'opportunity-view/:id', component: OpportunityViewComponent },

    { path: '', redirectTo: 'opportunity-list', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityRoutingModule { }
