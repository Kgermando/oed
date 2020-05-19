import { Component, OnInit } from '@angular/core';
import { nationalite } from 'src/app/shared/db/nation';

@Component({
  selector: 'app-forms-membres',
  templateUrl: './forms-membres.component.html',
  styleUrls: ['./forms-membres.component.scss']
})
export class FormsMembresComponent implements OnInit {

  nation$ = nationalite;
  constructor() { }

  ngOnInit(): void {
  }

}
