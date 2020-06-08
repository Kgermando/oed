import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { secteurList } from 'src/app/shared/db/province';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MembresService } from '../services/membres.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Membres } from '../services/models/membres';
import { nationalite } from 'src/app/shared/db/nation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membres-add',
  templateUrl: './membres-add.component.html',
  styleUrls: ['./membres-add.component.scss']
})
export class MembresAddComponent implements OnInit {

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

  isLoading: boolean = false;

  getManagerID: string;
  
  nation$ = nationalite;
  Langues: string[] = ['Français', 'Anglais', 'Lingala', 'Tshiluba', 'Swahili', 'Kikongo'];

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router,
    private fb: FormBuilder,
    private membresService: MembresService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.makingaddMembresForm();
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
      Adresse: [''],
      Telephone: ['', Validators.required],
      Email: [''],
      Etudes: [''],
      Experience: [''],
    });
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
        this.membresService.createMembres(this.membresInfo);
        this.addMembresForm.reset();
        this.router.navigate(['/admin/forms/membres/membres-list'])
        this.showSnackbar();
        // console.log(this.membresInfo);
      } else {
        this.openErrorBar();
      }
  }


  showSnackbar() {
		this.snackbar.open('Formulaires Enregistré!', '', {
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
