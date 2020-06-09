import { Component, OnInit } from '@angular/core';
import { OpportunityService } from 'src/app/admin/opportunity/services/opportunity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-opportunity',
  templateUrl: './profile-opportunity.component.html',
  styleUrls: ['./profile-opportunity.component.scss']
})
export class ProfileOpportunityComponent implements OnInit {

  p: number = 1;

  opportunity$;

  loading = false

  constructor(private router: Router,
              private opportunityService: OpportunityService) { }

  ngOnInit(): void {
    this.getActivity();
  }

  getActivity() {
    this.loading = true;
    this.opportunityService.getAllOpportunity().subscribe(
      list => {
          const actualites = list.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        });
        // console.log(products)
        this.opportunity$ = actualites;
        this.loading = false;
      }
    )
  }

  detail(id) {
    this.router.navigate(['/emdev/dashboard/profile-opportunity-detail', id]);
  }

}
