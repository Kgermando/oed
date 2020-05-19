import { Component, OnInit } from '@angular/core';
import { nationalite } from 'src/app/shared/db/nation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nation$ = nationalite;
  constructor() { }

  ngOnInit(): void {
  }

}
