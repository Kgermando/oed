import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
  { path: 'em&dev', loadChildren: () => import('../app/em-dev/em-dev.module').then(m => m.EmDevModule)},
  // { path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule)},

  { path: '', redirectTo: 'em&dev', pathMatch: 'full'},
  { path: '**', redirectTo: 'em&dev', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
