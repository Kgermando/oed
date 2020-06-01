import { Component, OnInit } from '@angular/core';
import { nationalite } from 'src/app/shared/db/nation';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { vision } from 'src/app/shared/db/vision';
import { conference } from 'src/app/shared/db/conference';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nation$ = nationalite;

  vision$ = vision;
  
  conference = conference;

  slides = [
    {'image':'../../../assets/img/hero-slider/1.jpg'},
    {'image':'../../../assets/img/hero-slider/2.jpg'},
    {'image':'../../../assets/img/hero-slider/3.jpg'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
