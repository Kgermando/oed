import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Actualite } from '../services/models/actualite';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActualiteService } from '../services/actualite.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actualite-edit',
  templateUrl: './actualite-edit.component.html',
  styleUrls: ['./actualite-edit.component.scss']
})
export class ActualiteEditComponent implements OnInit {

  addActualiteForm: FormGroup;
  actualiteInfo: Actualite = {
    Title:'',
    PhotoUrl:'',
    Description:'',
    Content:'',
    Created: null,
    managerId: '',
  };

  isLoading = false;
  isPreview = false;
  getManagerID: string;

  constructor(
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router,
    private fb: FormBuilder,
    private actualiteService: ActualiteService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.makingAddActualiteForm();
    let managerId = this.route.snapshot.paramMap.get("id");
    if (managerId) {
      this.getActivityby(managerId);
      this.getManagerID = managerId;
    }
  }

  makingAddActualiteForm() {
    this.addActualiteForm = this.fb.group({
      Title:  [''],
      Description: [''],
      Actualitequantity: [''],
      Content: [''],
    });
  }

  onSubmit() {
    if(this.addActualiteForm.valid) {
      this.isLoading = true;
      this.actualiteInfo = {
      Title: this.addActualiteForm.value.Title,
      Description: this.addActualiteForm.value.Description,
      Content: this.addActualiteForm.value.Content,
      PhotoUrl: this.getImageUrl(),
      Created: new Date(),
      // managerId: this.getManagerID
    };
    this.actualiteService.updateActualite(this.actualiteInfo, this.getManagerID);
    this.showSnackbar();
    this.isLoading = false;
    this.addActualiteForm.reset();
    // console.log(this.actualiteInfo);
    
    } else {
      this.isLoading = false;
      this.openErrorBar();
    }  
  }

  showSnackbar() {
		this.snackbar.open("L'Article a été Modifié!", '', {
      duration: 6000
    });
  }

  openErrorBar() {
    this.snackbar.open('Erreur d\'enregistrement!', '', {
      duration: 6000
    });
  }


  // getSupplierID(){
  //   this.ProductService.getUserId().subscribe(res=>{
  //     this.supplierID = res;
  //   })
  // }

  getImageUrl(){
    if(this.imgDownloadUrl == null){
      if(this.actualiteInfo.PhotoUrl == null){
      }
      else{
        return this.actualiteInfo.PhotoUrl;
      }
    }
    else{
      return this.imgDownloadUrl;
    }
  }

  getActivityby(managerId) {
    this.actualiteService.getProfileBymanagerId(managerId).subscribe(product => {
      this.patchData(product.data);
      this.actualiteInfo = product.data;
    });
    // console.log(this.actualiteInfo););
  }

  patchData(actualite: Actualite) {
    this.addActualiteForm.patchValue({
      Title: actualite.Title,
      Description: actualite.Description,
      Content: actualite.Content
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
