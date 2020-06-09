import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actualite } from '../services/models/actualite';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActualiteService } from '../services/actualite.service';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualite-add',
  templateUrl: './actualite-add.component.html',
  styleUrls: ['./actualite-add.component.scss']
})
export class ActualiteAddComponent implements OnInit {

  addActualiteForm: FormGroup;
  actualiteInfo: Actualite = {
    Title:'',
    PhotoUrl:'',
    // Description:'',
    Content:'',
    Created: null,
    managerId: '',
  };

  isLoading = false;
  isPreview = false;
  getManagerID: string;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router,
    private fb: FormBuilder,
    private actualiteService: ActualiteService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // this.getUserId();
    this.makingAddActualiteForm();
  }

  makingAddActualiteForm() {
    this.addActualiteForm = this.fb.group({
      Title:  [''],
      // Description: [''],
      Actualitequantity: [''],
      Content: [''],
    });
  }

  onSubmit() {
    if(this.addActualiteForm.valid) {
      this.isLoading = true;
      this.actualiteInfo = {
      Title: this.addActualiteForm.value.Title,
      // Description: this.addActualiteForm.value.Description,
      Content: this.addActualiteForm.value.Content,
      PhotoUrl: this.imgDownloadUrl,
      Created: new Date(),
      // managerId: this.getManagerID
    };
    this.actualiteService.createActualite(this.actualiteInfo);
    this.showSnackbar();
    this.isLoading = false;
    this.addActualiteForm.reset();
    this.router.navigate(['/admin/activity/actu-list']);
    // console.log(this.actualiteInfo);
    
    } else {
      this.isLoading = false;
      this.openErrorBar();
    }  
  }

  showSnackbar() {
		this.snackbar.open('Article Enregistré!', '', {
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
    const path = `Actualite/${new Date().getTime()}_${file.name}`;
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
