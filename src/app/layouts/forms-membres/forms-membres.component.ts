import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { secteurList } from 'src/app/shared/db/province';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { nationalite } from 'src/app/shared/db/nation';
import { Membres } from 'src/app/admin/forms/membres/services/models/membres';
import { MembresService } from 'src/app/admin/forms/membres/services/membres.service';

@Component({
  selector: 'app-forms-membres',
  templateUrl: './forms-membres.component.html',
  styleUrls: ['./forms-membres.component.scss']
})
export class FormsMembresComponent implements OnInit {

  addMembresForm: FormGroup;
  membresInfo: Membres = {
    id: '',
    FullName: '',
    Sex: '',
    PhotoUrl: '',
    Birthday: '',
    PlaceBirthday: '',
    EtatCivil: '',
    NbreEnfant: null,
    LangueParle: '',
    Adresse: '',
    Telephone: '',
    Email: '',
    Nationalite: '',
    Province: '',
    Ville: '',
    TerritoireCheferie: '',
    Etudes: '',
    Experience: '',
    // Frais: '',
    // Paye: '',
    Approuve: false,
    Created: null,
    managerId: '',
  };

  isPreview = false;

  isLoading: boolean = false;

  getManagerID: string;
  
  nation$ = nationalite;
  Langues: string[] = ['Français', 'Anglais', 'Lingala', 'Tshiluba', 'Swahili', 'Kikongo'];

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private membresService: MembresService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getUserId();
    this.makingaddMembresForm();
    
  }
  
  makingaddMembresForm() {
    this.addMembresForm = this.fb.group({
      CalamiteNaturelRecente: ['', Validators.required],
      FullName: ['', Validators.required],
      Sex: ['', Validators.required],
      Birthday: ['', Validators.required],
      PlaceBirthday: ['', Validators.required],
      EtatCivil: ['', Validators.required],
      NbreEnfant: ['', Validators.required],
      LangueParle: ['', Validators.required],
      Adresse: ['', Validators.required],
      Telephone: ['', Validators.required],
      Email: ['', Validators.required],
      Nationalite: ['', Validators.required],
      Province: ['', Validators.required],
      Ville: ['', Validators.required],
      TerritoireCheferie: ['', Validators.required],
      Etudes: ['', Validators.required],
      Experience: ['', Validators.required],
      // Frais: ['', Validators.required],
      Approuve: ['', Validators.required],
    });
  }

  getUserId(){
      this.membresService.getUserId().subscribe(res=>{
        this.getManagerID = res;
      })
  }

  onSubmit() {
    if (this.addMembresForm.valid) {
          this.isLoading = true;
          this.membresInfo = {
            FullName: this.addMembresForm.value.FullName,
            Sex: this.addMembresForm.value.Sex,
            PhotoUrl: this.imgDownloadUrl,
            Birthday: this.addMembresForm.value.Birthday,
            PlaceBirthday: this.addMembresForm.value.PlaceBirthday,
            EtatCivil: this.addMembresForm.value.EtatCivil,
            LangueParle: this.addMembresForm.value.LangueParle,
            Adresse: this.addMembresForm.value.Adresse,
            Telephone: this.addMembresForm.value.Telephone,
            Email: this.addMembresForm.value.Email,
            Nationalite: this.addMembresForm.value.Nationalite,
            Province: this.addMembresForm.value.Province,
            Ville: this.addMembresForm.value.Ville,
            TerritoireCheferie: this.addMembresForm.value.TerritoireCheferie,
            Etudes: this.addMembresForm.value.Etudes,
            Experience: this.addMembresForm.value.Experience,
            // Frais: this.addMembresForm.value.Frais,
            // Paye: 'PAYE',
            Approuve: this.addMembresForm.value.Approuve,
            Created: new Date(),
            managerId: this.getManagerID
          };
        this.membresService.createMembres(this.membresInfo);
        this.addMembresForm.reset();
        this.showSnackbar();
        // console.log(this.membresInfo);
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
    const path = `Membres/${new Date().getTime()}_${file.name}`;
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
