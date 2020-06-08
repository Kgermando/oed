import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PersMorale } from '../services/models/pers-morale';
import { nationalite } from 'src/app/shared/db/nation';
import { PersMoraleService } from '../services/pers-morale.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pers-morale-edit',
  templateUrl: './pers-morale-edit.component.html',
  styleUrls: ['./pers-morale-edit.component.scss']
})
export class PersMoraleEditComponent implements OnInit {

  persMoraleFG: FormGroup;
  persMoraleForm: PersMorale = {
    id: '',
    PhotoUrl: '',
    ProjectForm: '',
    CompanyName: '',
    IdNat: '',
    RCCM: '',
    NImpot: '',
    AutorisationOuvertureN: null,
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

  persMorale: any;

  nation$ = nationalite;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private snackbar: MatSnackBar,
    private persMoraleService: PersMoraleService) { }


  ngOnInit(): void {
    this.makingAddPersMoraleForm();
    let getManagerId = this.route.snapshot.paramMap.get("id");
    if (getManagerId) {
      this.getpersMoraleby(getManagerId);
      this.getManagerId = getManagerId;
    }
  }

  makingAddPersMoraleForm() {
    this.persMoraleFG = this.formBuilder.group({
      ProjectForm: [''],
      CompanyName: [''],
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
      Name: [''],
      Nationalite: [''],
      Function: [''],
      Phone: [''],
      Email: ['']
    })
  }

  onSubmit() {
    if (this.persMoraleFG.valid) {
      this.persMoraleForm = {
      PhotoUrl: this.imgDownloadUrl,
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
      managerId: this.getManagerId,
      Created: new Date(),
    };
    this.persMoraleService.updatepersMorale(this.persMoraleForm, this.getManagerId);
    this.showSnackbar();
    this.router.navigate(['/admin/forms/pers-morale/pers-morale-list']);
    } else {
      this.openErrorBar();
    }
    
  }

  showSnackbar() {
		this.snackbar.open('Modification enregistré !', '', {
      duration: 6000
    });
  }

  openErrorBar() {
    this.snackbar.open('Erreur d\'enregistrement!', '', {
      duration: 6000
    });
  }

  getImageUrl(){
    if(this.imgDownloadUrl == null){
      if(this.persMoraleForm.PhotoUrl == null){
      }
      else{
        return this.persMoraleForm.PhotoUrl;
      }
    }
    else{
      return this.imgDownloadUrl;
    }
  }

  getpersMoraleby(getManagerId) {
    this.persMoraleService.getpersMoraleBypersMoraleId(getManagerId).subscribe(persMorale => {
      this.patchData(persMorale.data);
      this.persMorale = persMorale.data;
    });
    // console.log(this.persMoraleInfo););
  }

  patchData(persMorale: PersMorale) {
    this.persMoraleFG.patchValue({
      ProjectForm: persMorale.ProjectForm,
      CompanyName: persMorale.CompanyName,
      IdNat: persMorale.IdNat,
      RCCM: persMorale.RCCM,
      NImpot: persMorale.NImpot,
      AutorisationOuvertureN: persMorale.AutorisationOuvertureN,
      Objet: persMorale.Objet,
      HeadQuarters: persMorale.HeadQuarters,
      SecteurActivite: persMorale.SecteurActivite,
      BrancheActivite: persMorale.BrancheActivite,
      TelephoneEntreprise: persMorale.TelephoneEntreprise,
      EmailEntreprise: persMorale.EmailEntreprise,
      Name: persMorale.Name,
      Nationalite: persMorale.Nationalite,
      Function: persMorale.Function,
      Phone: persMorale.Phone,
      Email: persMorale.Email
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
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.storage.ref(path).getDownloadURL();
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
