import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { activity } from 'src/app/shared/db/activity';
import { Router } from '@angular/router';
import { ActualiteService } from 'src/app/admin/admin-actualite/services/actualite.service';

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.scss']
})
export class ActivitesComponent implements OnInit {

  options: AnimationOptions = {
    path: '../../assets/lottie/developement.json',
  };
 
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  p: number = 1;

  // activity$ = activity;

  activity$;

  loading = false

  constructor(private router: Router,
              private activityService: ActualiteService) { }

  ngOnInit(): void {
    this.getActivity();
  }

  getActivity() {
    this.loading = true;
    this.activityService.getAllActualite().subscribe(
      list => {
          const actualites = list.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        });
        // console.log(products)
        this.activity$ = actualites;
        this.loading = false;
      }
    )
  }

  detail(id) {
    this.router.navigate(['/emdev/layouts/activites-detail', id]);
  }

}
