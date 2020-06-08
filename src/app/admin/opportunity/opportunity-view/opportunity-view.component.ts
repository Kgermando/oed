import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CustomerUserInformation } from 'src/app/auth/services/models/user';
import { Opportunity } from '../services/models/opportunity';
import { OpportunityService } from '../services/opportunity.service';

@Component({
  selector: 'app-opportunity-view',
  templateUrl: './opportunity-view.component.html',
  styleUrls: ['./opportunity-view.component.scss']
})
export class OpportunityViewComponent implements OnInit {

  opportunityData: Opportunity;
  opportunityView: Opportunity = {};

  managerInfo: CustomerUserInformation;

  loading = false;

	constructor(
		private route: ActivatedRoute,
		private opportunityService: OpportunityService
	) {
		// let opportunityViewId = this.route.snapshot.paramMap.get('id');
    // this.getDetails(opportunityViewId);
	}

	ngOnInit(): void {
    let opportunityViewId = this.route.snapshot.paramMap.get('id');
    this.getDetails(opportunityViewId);
	}

  getDetails(id: string): void {
    this.loading = true;
    this.opportunityService.getOneProduct(id).subscribe(opportunity => {
      this.opportunityView = opportunity;
      this.opportunityService.getProfileBymanagerId(opportunity.managerId).subscribe(
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
