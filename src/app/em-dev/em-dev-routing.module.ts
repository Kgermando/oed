import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmDevComponent } from './em-dev.component';


const routes: Routes = [
  { 
    path: '', component: EmDevComponent, children: [
      {path: 'layouts', loadChildren: () => import('../layouts/layouts.module').then(m => m.LayoutsModule)},
      { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},

      { path: '', redirectTo: 'layouts', pathMatch: 'full'},
      { path: '**', redirectTo: 'layouts'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmDevRoutingModule { }
