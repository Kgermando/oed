import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartenaireRoutingModule } from './partenaire-routing.module';
import { PartenaireComponent } from './partenaire.component';


@NgModule({
  declarations: [PartenaireComponent],
  imports: [
    CommonModule,
    PartenaireRoutingModule
  ]
})
export class PartenaireModule { }
