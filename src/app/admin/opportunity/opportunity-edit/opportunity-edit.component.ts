import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Opportunity } from '../services/models/opportunity';
import { OpportunityService } from '../services/opportunity.service';

@Component({
  selector: 'app-opportunity-edit',
  templateUrl: './opportunity-edit.component.html',
  styleUrls: ['./opportunity-edit.component.scss']
})
export class OpportunityEditComponent implements OnInit {

  addOpportunityForm: FormGroup;
  opportunityInfo: Opportunity = {
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
    private opportunityService: OpportunityService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.makingaddOpportunityForm();
    let managerId = this.route.snapshot.paramMap.get("id");
    if (managerId) {
      this.getActivityby(managerId);
      this.getManagerID = managerId;
    }
  }

  makingaddOpportunityForm() {
    this.addOpportunityForm = this.fb.group({
      Title:  [''],
      Description: [''],
      Actualitequantity: [''],
      Content: [''],
    });
  }

  onSubmit() {
    if(this.addOpportunityForm.valid) {
      this.isLoading = true;
      this.opportunityInfo = {
      Title: this.addOpportunityForm.value.Title,
      Description: this.addOpportunityForm.value.Description,
      Content: this.addOpportunityForm.value.Content,
      PhotoUrl: this.getImageUrl(),
      Created: new Date(),
      // managerId: this.getManagerID
    };
    this.opportunityService.updateOpportunity(this.opportunityInfo, this.getManagerID);
    this.showSnackbar();
    this.isLoading = false;
    this.addOpportunityForm.reset();
    this.router.navigate(['/admin/opportunity/opportunity-list']);
    // console.log(this.opportunityInfo);
    
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

  getImageUrl(){
    if(this.imgDownloadUrl == null){
      if(this.opportunityInfo.PhotoUrl == null){
      }
      else{
        return this.opportunityInfo.PhotoUrl;
      }
    }
    else{
      return this.imgDownloadUrl;
    }
  }

  getActivityby(managerId) {
    this.opportunityService.getProfileBymanagerId(managerId).subscribe(product => {
      this.patchData(product.data);
      this.opportunityInfo = product.data;
    });
    // console.log(this.opportunityInfo););
  }

  patchData(opportunity: Opportunity) {
    this.addOpportunityForm.patchValue({
      Title: opportunity.Title,
      Description: opportunity.Description,
      Content: opportunity.Content
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
