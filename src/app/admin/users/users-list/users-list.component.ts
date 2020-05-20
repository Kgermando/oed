import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth/auth.service';
// import { ExcelService } from 'src/app/shared/services/data/excel.service';
import { User } from 'src/app/auth/services/models/user';
import { UserService } from '../services/data/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ["name", "email", "phone", "roles"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  users;

  users$: Observable<User[]>;

  constructor(private authService: AuthService,
              private userService: UserService,
              // private excelService: ExcelService,
              private router: Router) { }

  ngOnInit(): void {
    this.users$ = this.authService.getAllUsers();

    this.userService.getProductBySupplier().subscribe(
      list => {
          const users = list.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        });
        // console.log(products)
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  })


  }

  view(uid) {
    this.router.navigate(['/admin/users/user-view', uid]);
  }

}
