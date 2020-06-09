import { Component, OnInit } from '@angular/core';
import { team } from 'src/app/shared/db/team';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  team$ = team;
  constructor() { }

  ngOnInit(): void {
  }

  

}
