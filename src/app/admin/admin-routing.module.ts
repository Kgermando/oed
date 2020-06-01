import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'users', loadChildren: () => import('../admin/users/users.module').then(m => m.UsersModule)},
    { path: 'contacts', loadChildren: () => import('../admin/contacts/contacts.module').then(m => m.ContactsModule)},
    { path: 'stats', loadChildren: () => import('../admin/stats/stats.module').then(m => m.StatsModule)},
    { path: 'forms', loadChildren: () => import('../admin/forms/forms.module').then(m => m.FormsModule)},
    { path: 'activity', loadChildren: () => import('../../app/admin/activity/activity.module').then(m => m.ActivityModule)},
    { path: 'opportunity', loadChildren: () => import('../../app/admin/opportunity/opportunity.module').then(m => m.OpportunityModule)},
    { path: '', redirectTo: 'contacts', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
