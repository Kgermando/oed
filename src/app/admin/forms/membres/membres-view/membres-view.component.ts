import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembresService } from '../services/membres.service';
import { Membres } from '../services/models/membres';
import { CustomerUserInformation } from 'src/app/auth/services/models/user';

@Component({
  selector: 'app-membres-view',
  templateUrl: './membres-view.component.html',
  styleUrls: ['./membres-view.component.scss']
})
export class MembresViewComponent implements OnInit {

  membresView: Membres = {};

  managerInfo: CustomerUserInformation;

  loading = false;

	constructor(
		private route: ActivatedRoute,
		private membresService: MembresService
	) {
		let persMoraleViewId = this.route.snapshot.paramMap.get('id');
    this.getDetails(persMoraleViewId);
	}

	ngOnInit(): void {
    let persMoraleViewId = this.route.snapshot.paramMap.get('id');
    this.getDetails(persMoraleViewId);
	}

  getDetails(id: string): void {
    this.loading = true;
    this.membresService.getOneProduct(id).subscribe(membres => {
      this.membresView = membres;
      this.membresService.getProfileByManagerId(membres.managerId).subscribe(
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
