import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';
import { User } from 'src/app/auth/services/models/user';
import { UserService } from '../services/data/user.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {

  user: User = {
    uid: '',
    name: '',
    email: '',
    adress: '',
    phone: '',
    roles: {
      admin: false,
      manager: false,
      user: false,
    },
  };

  constructor(private route: ActivatedRoute,
              private content: ElementRef,
              private userService: UserService) {}

    downloadPDF() {
      console.log('Download here');
      const report = new jsPDF();
  
      const specialElementHeaders = {
        '#editor'(element , renderer) {
          return true;
        }
      };
      const content = this.content.nativeElement;
      report.fromHTML(content.innerHTML, 15, 15, {
        width: 150,
        elementHeaders: specialElementHeaders
      });
      report.save('Produit.pdf');
    }
  
    ngOnInit(): void {
      const id: string = this.route.snapshot.params.id;
      this.getDetails(id);
    }
  
    getDetails(id: string): void {
      // this.spinnerService.showSpinner();
      this.userService.getOneUser(id).subscribe(user => {
        this.user = user;
        // this.spinnerService.hideSpinner();
      });
    }


}
