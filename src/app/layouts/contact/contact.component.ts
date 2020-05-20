import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Contact } from 'src/app/admin/contacts/services/models/contact';
import { ContactService } from 'src/app/admin/contacts/services/data/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactFG: FormGroup;
  contact: Contact = {
    id: '',
    FullName: '',
    Telephone: '',
    Email: '',
    Sujet: '',
    Message: '',
    Created: null,
    Confirmation: ''
  }

loading = false;
errorMessage = 'Vérifiez les champs';

  constructor(
              private formBuilder: FormBuilder,
              private router: Router,
              private db: AngularFirestore,
              private contactService: ContactService,
              private snackbar: MatSnackBar
              ) {
      this.contactFG = this.formBuilder.group({
        // id: ['', Validators.required],
        FullName: ['', Validators.required],
        Telephone: ['', Validators.required],
        Email: ['', Validators.required],
        Sujet: ['', Validators.required],
        Message: ['', Validators.required]
      })
     }

  ngOnInit(): void {}

  save() {
    if (this.contactFG.valid) {
      this.loading = true;
      this.contact = this.contactFG.value;
      this.contact.id = this.db.createId();
      this.contact.Confirmation = "NON LU";
      this.contact.Created = new Date();
      this.contactService.add(this.contact).then(res => {
        console.log(res)
        this.loading = false;
        this.router.navigateByUrl('/fastsmart/layouts/contact');
        this.openSuccessBar()
        this.contactFG.reset();
      }).then((res => {
        console.log(res);
        console.log('Contact enregistrée !');
      }));
    } else {
      this.markFormGroupTouched(this.contactFG);
      this.openErrorBar()
    }
  }

  openSuccessBar() {
    // let snackBarRef = snackBar.open('Message archived');
    this.snackbar.open('Message avec succés!', '', {
      duration: 3000
    });
  }

  openErrorBar() {
    this.snackbar.open('Erreur d\'envoie', '', {
      duration: 3000
    });
  }


  FullNameValidate() {
    const control = this.contactFG.get('FullName');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  MessageValidate() {
    const control = this.contactFG.get('Message');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  TelephoneValidate() {
    const control = this.contactFG.get('Telephone');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  SujetValidate() {
    const control = this.contactFG.get('Sujet');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
  

  markFormGroupTouched(formGroup: FormGroup) {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    (<any> Object).values(formGroup.controls).forEach(control => {
      if (control.controls) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

}
