import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PersMoraleService } from '../services/pers-morale.service';

@Component({
  selector: 'app-pers-morale-list',
  templateUrl: './pers-morale-list.component.html',
  styleUrls: ['./pers-morale-list.component.scss']
})
export class PersMoraleListComponent implements OnInit {

  displayedColumns: string[] = ["Created", "CompanyName", "Name", "RCCM", "edit", "remove"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private persMoraleService: PersMoraleService, private router: Router) {}

  ngOnInit() {
    this.persMoraleService.getAllPersMorales().subscribe(
      list => {
          const persMorale = list.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        });
        // console.log(products)
        this.dataSource = new MatTableDataSource(persMorale);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    })
  }

  addProductClick(){
    this.router.navigate(['/admin/forms/pers-morale/pers-morale-add']);
  }

  removeProduct(id){
    this.persMoraleService.removepersMoraleByID(id);
  }


}
