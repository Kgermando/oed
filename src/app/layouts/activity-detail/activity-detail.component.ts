import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActualiteService } from 'src/app/admin/admin-actualite/services/actualite.service';
import { CustomerUserInformation } from 'src/app/auth/services/models/user';
import { Actualite } from 'src/app/admin/admin-actualite/services/models/actualite';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

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
