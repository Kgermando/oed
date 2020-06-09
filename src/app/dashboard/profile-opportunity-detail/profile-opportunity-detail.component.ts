import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpportunityService } from 'src/app/admin/opportunity/services/opportunity.service';
import { CustomerUserInformation } from 'src/app/auth/services/models/user';
import { Opportunity } from 'src/app/admin/opportunity/services/models/opportunity';

@Component({
  selector: 'app-profile-opportunity-detail',
  templateUrl: './profile-opportunity-detail.component.html',
  styleUrls: ['./profile-opportunity-detail.component.scss']
})
export class ProfileOpportunityDetailComponent implements OnInit {

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
