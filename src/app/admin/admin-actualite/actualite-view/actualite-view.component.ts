import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actualite } from '../services/models/actualite';
import { ActualiteService } from '../services/actualite.service';
import { CustomerUserInformation } from 'src/app/auth/services/models/user';


@Component({
  selector: 'app-actualite-view',
  templateUrl: './actualite-view.component.html',
  styleUrls: ['./actualite-view.component.scss']
})
export class ActualiteViewComponent implements OnInit {

  actualiteData: Actualite;
  actualiteView: Actualite = {};

  managerInfo: CustomerUserInformation;

  loading = false;

	constructor(
		private route: ActivatedRoute,
		private actualiteService: ActualiteService
	) {
		// let actualiteViewId = this.route.snapshot.paramMap.get('id');
    // this.getDetails(actualiteViewId);
	}

	ngOnInit(): void {
    let actualiteViewId = this.route.snapshot.paramMap.get('id');
    this.getDetails(actualiteViewId);
	}

  getDetails(id: string): void {
    this.loading = true;
    this.actualiteService.getOneProduct(id).subscribe(actualite => {
      this.actualiteView = actualite;
      this.actualiteService.getProfileBymanagerId(actualite.managerId).subscribe(
        (res) => {
          this.managerInfo = res.data;
          this.loading = false;
          // console.log(res);
        },
        (err) => {
          this.loading = false;
        }
      );
      this.loading = false;
    });
  }
  
}
