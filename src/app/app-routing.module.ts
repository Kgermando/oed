import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './auth/services/guard/admin.guard';


const routes: Routes = [
  { path: 'emdev', loadChildren: () => import('../app/em-dev/em-dev.module').then(m => m.EmDevModule)},
  { path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard]},

  { path: '', redirectTo: 'emdev', pathMatch: 'full'},
  { path: '**', redirectTo: 'emdev'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
