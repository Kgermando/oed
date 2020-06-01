import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';
import { ActivityAddComponent } from './activity-add/activity-add.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';
import { ActivityViewComponent } from './activity-view/activity-view.component';


@NgModule({
  declarations: [ActivityComponent, ActivityAddComponent, ActivityListComponent, ActivityEditComponent, ActivityViewComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule
  ]
})
export class ActivityModule { }
