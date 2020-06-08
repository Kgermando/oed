import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminActualiteComponent } from './admin-actualite.component';
import { ActualiteAddComponent } from './actualite-add/actualite-add.component';
import { ActualiteListComponent } from './actualite-list/actualite-list.component';
import { ActualiteEditComponent } from './actualite-edit/actualite-edit.component';
import { ActualiteViewComponent } from './actualite-view/actualite-view.component';


const routes: Routes = [
  { path: '', component: AdminActualiteComponent, children: [
    { path: 'actu-add', component: ActualiteAddComponent },
    { path: 'actu-list', component: ActualiteListComponent },
    { path: 'actu-edit/:id', component: ActualiteEditComponent },
    { path: 'actu-view/:id', component: ActualiteViewComponent },

    { path: '', redirectTo: 'actu-list', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminActualiteRoutingModule { }
