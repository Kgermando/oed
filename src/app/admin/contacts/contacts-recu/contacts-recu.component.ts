import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ContactService } from '../services/data/contact.service';
// import { ExcelService } from 'src/app/shared/services/data/excel.service';

@Component({
  selector: 'app-contacts-recu',
  templateUrl: './contacts-recu.component.html',
  styleUrls: ['./contacts-recu.component.scss']
})
export class ContactsRecuComponent implements OnInit {

  displayedColumns: string[] = ["FullName", "Telephone", "Email", "Sujet", "Created", "remove"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  contacts;

  constructor(private contactService: ContactService,
              // private excelService: ExcelService,
              private router: Router) {}

  ngOnInit(): void {

    this.contactService.getProductBySupplier().subscribe(
      list => {
          const contacts = list.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        });
        // console.log(products)
        this.dataSource = new MatTableDataSource(contacts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  })
  }
 

  addProductClick(){
    this.router.navigate(['/admin/contacts/contact-add']);
  }

  removeProduct(id){
    this.contactService.removeProductByID(id);
  }
 
  view(id) {
    this.router.navigate(['/admin/contacts/contact-view', id]);
  }

  edit(id) {
    this.router.navigate(['/admin/products/product-edit', id]);
  }


  exportAsXLSX(): void {
    // this.excelService.exportAsExcelFile(this.contacts, 'Backup_Contact');
  }


}
