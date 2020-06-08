import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { nationalite } from 'src/app/shared/db/nation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Membres } from '../services/models/membres';
import { MembresService } from '../services/membres.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { secteurList } from 'src/app/shared/db/province';

@Component({
  selector: 'app-membres-edit',
  templateUrl: './membres-edit.component.html',
  styleUrls: ['./membres-edit.component.scss']
})
export class MembresEditComponent implements OnInit {

  addMembresForm: FormGroup;
  membresInfo: Membres = {
    id: '',
    FullName: '',
    Sex: '',
    PhotoUrl: '',
    Birthday: '',
    PlaceBirthday: '',
    EtatCivil: '',
    LangueParle: '',
    Adresse: '',
    Telephone: '',
    Email: '',
    Nationalite: '',
    Province: '',
    Etudes: '',
    Experience: '',
    Created: null,
  };

  isPreview = false;
  getManagerId: string;

  persMorale: any;

  nation$ = nationalite;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private membresService: MembresService,
    private snackbar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.makingaddMembresForm();
    let getManagerId = this.route.snapshot.paramMap.get("id");
    if (getManagerId) {
      this.getpersMoraleby(getManagerId);
      this.getManagerId = getManagerId;
    }
  }

  makingaddMembresForm() {
    this.addMembresForm = this.fb.group({
      FullName: ['', Validators.required],
      Sex: ['', Validators.required],
      Birthday: ['', Validators.required],
      PlaceBirthday: ['', Validators.required],
      EtatCivil: ['', Validators.required],
      Nationalite: ['', Validators.required],
      LangueParle: ['', Validators.required],
      Province: [''],
      Adresse: ['', Validators.required],
      Telephone: ['', Validators.required],
      Email: [''],
      Etudes: [''],
      Experience: [''],
    });
  }

  onSubmit() {
    if (this.addMembresForm.valid) {
      this.membresInfo = {
        FullName: this.addMembresForm.value.FullName,
        Sex: this.addMembresForm.value.Sex,
        PhotoUrl: this.imgDownloadUrl,
        Birthday: this.addMembresForm.value.Birthday,
        PlaceBirthday: this.addMembresForm.value.PlaceBirthday,
        Nationalite: this.addMembresForm.value.Nationalite,
        EtatCivil: this.addMembresForm.value.EtatCivil,
        LangueParle: this.addMembresForm.value.LangueParle,
        Province: this.addMembresForm.value.Province,
        Adresse: this.addMembresForm.value.Adresse,
        Telephone: this.addMembresForm.value.Telephone,
        Email: this.addMembresForm.value.Email,
        Etudes: this.addMembresForm.value.Etudes,
        Experience: this.addMembresForm.value.Experience,
        Created: new Date(),
      };
    this.membresService.updateMembres(this.addMembresForm, this.getManagerId);
    this.showSnackbar();
    this.router.navigate(['/admin/forms/membres/membres-list'])
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
      if(this.membresInfo.PhotoUrl == null){
      }
      else{
        return this.membresInfo.PhotoUrl;
      }
    }
    else{
      return this.imgDownloadUrl;
    }
  }

  getpersMoraleby(getManagerId) {
    this.membresService.getMembresByMembresId(getManagerId).subscribe(persMorale => {
      this.patchData(persMorale.data);
      this.persMorale = persMorale.data;
    });
    // console.log(this.persMoraleInfo););
  }

  patchData(membres: Membres) {
    this.addMembresForm.patchValue({
      FullName: membres.FullName,
      Sex: membres.Sex,
      Birthday: membres.Birthday,
      PlaceBirthday: membres.PlaceBirthday,
      EtatCivil: membres.EtatCivil,
      LangueParle: membres.LangueParle,
      Adresse: membres.Adresse,
      Telephone: membres.Telephone,
      Email: membres.Email,
      Nationalite: membres.Nationalite,
      Province: membres.Province,
      Etudes: membres.Etudes,
      Experience: membres.Experience,
    });
  }

  // Province/ville/secteur
  countryList = secteurList;
  secteurCheferie: Array<any>;
  ville: Array<any>;

  changeCountry(count) {
    this.ville = this.countryList.find(con => con.name == count).ville;
    this.secteurCheferie = this.countryList.find(con => con.name == count).secteurCheferie;
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
