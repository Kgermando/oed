import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActualiteService } from '../services/actualite.service';

@Component({
  selector: 'app-actualite-list',
  templateUrl: './actualite-list.component.html',
  styleUrls: ['./actualite-list.component.scss']
})
export class ActualiteListComponent implements OnInit {

  displayedColumns: string[] = ["Created","Title","edit","remove"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private actualiteService: ActualiteService,
              // private excelService: ExcelService,
              private router: Router) {}

  ngOnInit(): void {

    this.actualiteService.getAllActualite().subscribe(
      list => {
          const actualites = list.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        });
        // console.log(products)
        this.dataSource = new MatTableDataSource(actualites);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    })
  }
 

  addProductClick(){
    this.router.navigate(['/admin/activity/actu-add']);
  }

  removeProduct(id){
    this.actualiteService.removeActualiteByID(id);
  }
 
  view(id) {
    this.router.navigate(['/admin/activity/actu-view', id]);
  }

  edit(id) {
    this.router.navigate(['/admin/activity/actu-edit', id]);
  }


  exportAsXLSX(): void {
    // this.excelService.exportAsExcelFile(this.contacts, 'Backup_Contact');
  }

}
