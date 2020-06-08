import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { nationalite } from 'src/app/shared/db/nation';
import { PersMorale } from 'src/app/admin/forms/pers-morale/services/models/pers-morale';
import { PersMoraleService } from 'src/app/admin/forms/pers-morale/services/pers-morale.service';

@Component({
  selector: 'app-forms-person-morale',
  templateUrl: './forms-person-morale.component.html',
  styleUrls: ['./forms-person-morale.component.scss']
})
export class FormsPersonMoraleComponent implements OnInit {

  persMoraleFG: FormGroup;
  persMoraleForm: PersMorale = {
    id: '',
    PhotoUrl: '',
    ProjectForm: '',
    CompanyName: '',
    IdNat: '',
    RCCM: '',
    NImpot: '',
    AutorisationOuvertureN: 0,
    Objet: '',
    HeadQuarters: '',
    SecteurActivite: '',
    BrancheActivite: '',
    TelephoneEntreprise: '',
    EmailEntreprise: '',
    Name: '',
    Nationalite: '',
    Function: '',
    Phone: '',
    Email: '',
    managerId: '',
    Created: null
  }

  isPreview = false;
  getManagerId: string;

  nation$ = nationalite;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private storage: AngularFireStorage,
              private snackbar: MatSnackBar,
              private persMoraleService: PersMoraleService) { }

  ngOnInit():void {
    this.makingAddPersMoraleForm();
  }

  makingAddPersMoraleForm() {
    this.persMoraleFG = this.formBuilder.group({
      ProjectForm: ['', Validators.required],
      CompanyName: ['', Validators.required],
      IdNat: [''],
      RCCM: [''],
      NImpot: [''],
      AutorisationOuvertureN: [''],
      Objet: [''],
      HeadQuarters: [''],
      SecteurActivite: [''],
      BrancheActivite: [''],
      TelephoneEntreprise: [''],
      EmailEntreprise: [''],
      Name: ['', Validators.required],
      Nationalite: [''],
      Function: [''],
      Phone: [''],
      Email: [''],
      // managerId: [''],
    })
  }


  onSubmit() {
    if (this.persMoraleFG.valid) {
      this.persMoraleForm = {
        ProjectForm: this.persMoraleFG.value.ProjectForm,
        CompanyName: this.persMoraleFG.value.CompanyName,
        IdNat: this.persMoraleFG.value.IdNat,
        RCCM: this.persMoraleFG.value.RCCM,
        NImpot: this.persMoraleFG.value.NImpot,
        AutorisationOuvertureN: this.persMoraleFG.value.AutorisationOuvertureN,
        Objet: this.persMoraleFG.value.Objet,
        HeadQuarters: this.persMoraleFG.value.HeadQuarters,
        SecteurActivite: this.persMoraleFG.value.SecteurActivite,
        BrancheActivite: this.persMoraleFG.value.BrancheActivite,
        TelephoneEntreprise: this.persMoraleFG.value.TelephoneEntreprise,
        EmailEntreprise: this.persMoraleFG.value.EmailEntreprise,
        Name: this.persMoraleFG.value.Name,
        Nationalite: this.persMoraleFG.value.Nationalite,
        Function: this.persMoraleFG.value.Function,
        Phone: this.persMoraleFG.value.Phone,
        Email: this.persMoraleFG.value.Email,
        PhotoUrl: this.imgDownloadUrl,
        managerId: this.getManagerId,
        Created: new Date(),
      };
      this.persMoraleService.createpersMorale(this.persMoraleForm);
      this.showSnackbar();
      this.router.navigate(['/admin/forms/pers-morale/pers-morale-list']);
    } else {
      this.openErrorBar();
    }
    
  }

  showSnackbar() {
		this.snackbar.open('Formulaires Envoyé!', '', {
      duration: 6000
    });
  }

  openErrorBar() {
    this.snackbar.open('Erreur d\'enregistrement!', '', {
      duration: 6000
    });
  }

 // Main task
 task: AngularFireUploadTask;

 // Progress monitoring
 percentage: Observable<number>;

 snapshot: Observable<any>;

 // Download URL
 downloadURL: Observable<string>;

 //download url string
 imgDownloadUrl: string;

 // State for dropzone CSS toggling
 isHovering: boolean;

 toggleHover(event: boolean) {
   this.isHovering = event;
 }

 startUpload(event: FileList) {
   this.isPreview = true;
   // The File object
   const file = event.item(0);

   // Client-side validation example
   if (file.type.split("/")[0] !== "image") {
     console.error("unsupported file type :( ");
     return;
   }

   // The storage path
   const path = `PersMorale/${new Date().getTime()}_${file.name}`;
   const fileRef = this.storage.ref(path);
   // Totally optional metadata
   const customMetadata = { app: "My AngularFire-powered PWA!" };

   // The main task
   this.task = this.storage.upload(path, file, { customMetadata });

   // Progress monitoring
   this.percentage = this.task.percentageChanges();

   //Download URL file
   this.snapshot = this.task
     .snapshotChanges()
     .pipe(
       finalize(() => {
         this.downloadURL = this.storage.ref(path).getDownloadURL()
         console.log(this.downloadURL); // Get a Observable
         this.downloadURL.subscribe(res => {
           if (res) {
             this.imgDownloadUrl = res;
           }
         });
       })
     );
 }

 // Determines if the upload task is active
 isActive(snapshot) {
   return (
     snapshot.state === "running" &&
     snapshot.bytesTransferred < snapshot.totalBytes
   );
 }

}
