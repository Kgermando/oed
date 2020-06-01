import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';
import { ActivityAddComponent } from './activity-add/activity-add.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';
import { ActivityViewComponent } from './activity-view/activity-view.component';


const routes: Routes = [
  { path: '', component: ActivityComponent, children: [
    { path: 'activity-add', component: ActivityAddComponent },
    { path: 'activity-list', component: ActivityListComponent },
    { path: 'activity-edit/:id', component: ActivityEditComponent },
    { path: 'activity-view/:id', component: ActivityViewComponent},

    { path: '', redirectTo: 'activity-list', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
