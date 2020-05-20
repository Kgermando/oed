import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'users', loadChildren: () => import('../admin/users/users.module').then(m => m.UsersModule)},
    // { path: 'products', loadChildren: () => import('../admin/products/products.module').then(m => m.ProductsModule)},
    { path: 'contacts', loadChildren: () => import('../admin/contacts/contacts.module').then(m => m.ContactsModule)},
    // { path: 'stats', loadChildren: () => import('../admin/stats/stats.module').then(m => m.StatsModule)},
    { path: '', redirectTo: 'contacts', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
