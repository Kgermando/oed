import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersMoraleRoutingModule } from './pers-morale-routing.module';
import { PersMoraleComponent } from './pers-morale.component';
import { PersMoraleAddComponent } from './pers-morale-add/pers-morale-add.component';
import { PersMoraleListComponent } from './pers-morale-list/pers-morale-list.component';
import { PersMoraleViewComponent } from './pers-morale-view/pers-morale-view.component';
import { PersMoraleEditComponent } from './pers-morale-edit/pers-morale-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PersMoraleComponent, PersMoraleAddComponent, PersMoraleListComponent, PersMoraleViewComponent, PersMoraleEditComponent],
  imports: [
    CommonModule,
    PersMoraleRoutingModule,

    SharedModule
  ]
})
export class PersMoraleModule { }
