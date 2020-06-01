import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpportunityRoutingModule } from './opportunity-routing.module';
import { OpportunityComponent } from './opportunity.component';
import { OpportunityAddComponent } from './opportunity-add/opportunity-add.component';
import { OpportunityListComponent } from './opportunity-list/opportunity-list.component';
import { OpportunityEditComponent } from './opportunity-edit/opportunity-edit.component';
import { OpportunityViewComponent } from './opportunity-view/opportunity-view.component';


@NgModule({
  declarations: [OpportunityComponent, OpportunityAddComponent, OpportunityListComponent, OpportunityEditComponent, OpportunityViewComponent],
  imports: [
    CommonModule,
    OpportunityRoutingModule
  ]
})
export class OpportunityModule { }
