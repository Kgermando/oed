import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembresRoutingModule } from './membres-routing.module';
import { MembresComponent } from './membres.component';


@NgModule({
  declarations: [MembresComponent],
  imports: [
    CommonModule,
    MembresRoutingModule
  ]
})
export class MembresModule { }
