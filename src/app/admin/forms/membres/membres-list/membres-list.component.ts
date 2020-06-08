import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MembresService } from '../services/membres.service';

@Component({
  selector: 'app-membres-list',
  templateUrl: './membres-list.component.html',
  styleUrls: ['./membres-list.component.scss']
})
export class MembresListComponent implements OnInit {

  displayedColumns: string[] = ["Created", "FullName", "Sex", "Nationalite", "Telephone", "EtatCivil", "edit", "remove"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private persMoraleService: MembresService, private router: Router) {}

  ngOnInit() {
    this.persMoraleService.getMembres().subscribe(
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
    this.router.navigate(['/admin/forms/membres/membres-add']);
  }

  removeProduct(id){
    this.persMoraleService.removeMembresByID(id);
  }


}
