import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersMoraleComponent } from './pers-morale.component';
import { PersMoraleAddComponent } from './pers-morale-add/pers-morale-add.component';
import { PersMoraleListComponent } from './pers-morale-list/pers-morale-list.component';
import { PersMoraleViewComponent } from './pers-morale-view/pers-morale-view.component';
import { PersMoraleEditComponent } from './pers-morale-edit/pers-morale-edit.component';


const routes: Routes = [
  { path: '', component: PersMoraleComponent, children: [
    { path: 'pers-morale-add', component: PersMoraleAddComponent },
    { path: 'pers-morale-list', component: PersMoraleListComponent },
    { path: 'pers-morale-view/:id', component: PersMoraleViewComponent },
    { path: 'pers-morale-edit/:id', component: PersMoraleEditComponent },

    { path: '', redirectTo: 'perso-morale-list', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersMoraleRoutingModule { }
