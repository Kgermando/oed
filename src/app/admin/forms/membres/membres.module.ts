import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembresRoutingModule } from './membres-routing.module';
import { MembresComponent } from './membres.component';
import { MembresAddComponent } from './membres-add/membres-add.component';
import { MembresListComponent } from './membres-list/membres-list.component';
import { MembresViewComponent } from './membres-view/membres-view.component';
import { MembresEditComponent } from './membres-edit/membres-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MembresComponent, MembresAddComponent, MembresListComponent, MembresViewComponent, MembresEditComponent],
  imports: [
    CommonModule,
    MembresRoutingModule,

    SharedModule
  ]
})
export class MembresModule { }
