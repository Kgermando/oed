import { Component, OnInit } from '@angular/core';
import { nationalite } from 'src/app/shared/db/nation';

@Component({
  selector: 'app-forms-partenaires',
  templateUrl: './forms-partenaires.component.html',
  styleUrls: ['./forms-partenaires.component.scss']
})
export class FormsPartenairesComponent implements OnInit {

  nation$ = nationalite;
  constructor() { }

  ngOnInit(): void {
  }

}
