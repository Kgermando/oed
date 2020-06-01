import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';


const routes: Routes = [
  { path: '', component: FormsComponent, children: [
    { path: 'membres', loadChildren: () => import('../forms/membres/membres.module').then(m => m.MembresModule)},
    // { path: 'partenaire', loadChildren: () => import('../forms/partenaire/partenaire.module').then(m => m.PartenaireModule)},
    { path: 'pers-morale', loadChildren: () => import('../forms/pers-morale/pers-morale.module').then(m => m.PersMoraleModule)},

    { path: '', redirectTo: 'membres', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
