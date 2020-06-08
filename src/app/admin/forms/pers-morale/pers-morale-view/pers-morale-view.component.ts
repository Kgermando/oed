import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersMorale } from '../services/models/pers-morale';
import { CustomerUserInformation } from 'src/app/auth/services/models/user';
import { PersMoraleService } from '../services/pers-morale.service';

@Component({
  selector: 'app-pers-morale-view',
  templateUrl: './pers-morale-view.component.html',
  styleUrls: ['./pers-morale-view.component.scss']
})
export class PersMoraleViewComponent implements OnInit {

  persMoraleData: PersMorale;
  persMoraleView: PersMorale = {};

  managerInfo: CustomerUserInformation;

  loading = false;

	constructor(
		private route: ActivatedRoute,
		private persMoraleService: PersMoraleService
	) {
	}

	ngOnInit(): void {
    let persMoraleViewId = this.route.snapshot.paramMap.get('id');
    this.getDetails(persMoraleViewId);
	}

  getDetails(id: string): void {
    this.loading = true;
    this.persMoraleService.getOneProduct(id).subscribe(persMorale => {
      this.persMoraleView = persMorale;
      this.persMoraleService.getProfileBymanagerId(persMorale.managerId).subscribe(
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
