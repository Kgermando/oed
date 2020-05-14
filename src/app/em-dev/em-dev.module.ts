import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmDevRoutingModule } from './em-dev-routing.module';
import { EmDevComponent } from './em-dev.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [EmDevComponent, FooterComponent],
  imports: [
    CommonModule,
    EmDevRoutingModule,

    SharedModule
  ]
})
export class EmDevModule { }
