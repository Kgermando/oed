import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembresComponent } from './membres.component';
import { MembresAddComponent } from './membres-add/membres-add.component';
import { MembresListComponent } from './membres-list/membres-list.component';
import { MembresEditComponent } from './membres-edit/membres-edit.component';
import { MembresViewComponent } from './membres-view/membres-view.component';


const routes: Routes = [
  { path: '', component: MembresComponent, children: [
    { path: 'membres-add', component: MembresAddComponent },
    { path: 'membres-list', component: MembresListComponent },
    { path: 'membres-edit/:id', component: MembresEditComponent },
    { path: 'membres-view/:id', component: MembresViewComponent },

    { path: '', redirectTo: 'membres-list', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembresRoutingModule { }
