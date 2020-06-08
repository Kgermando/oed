import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminActualiteRoutingModule } from './admin-actualite-routing.module';
import { AdminActualiteComponent } from './admin-actualite.component';
import { ActualiteAddComponent } from './actualite-add/actualite-add.component';
import { ActualiteListComponent } from './actualite-list/actualite-list.component';
import { ActualiteViewComponent } from './actualite-view/actualite-view.component';
import { ActualiteEditComponent } from './actualite-edit/actualite-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdminActualiteComponent, ActualiteAddComponent, ActualiteListComponent, ActualiteViewComponent, ActualiteEditComponent],
  imports: [
    CommonModule,
    AdminActualiteRoutingModule,
    SharedModule
  ]
})
export class AdminActualiteModule { }
