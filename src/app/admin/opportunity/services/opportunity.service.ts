import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Opportunity } from './models/opportunity';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  userId: string;
  opportunity: any;
  opportunityCollection: AngularFirestoreCollection<Opportunity>;
  opportunityInfo: Observable<Opportunity[]>;

  // Pour la methode getOneProduct()
  private OpportunityDoc: AngularFirestoreDocument<Opportunity>;
  public OpportunityView: Observable<Opportunity>;

  constructor(
    private angularfireauth: AngularFireAuth,
    private angularfirestore: AngularFirestore
  ) {
    this.angularfireauth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });

    this.opportunityCollection = angularfirestore.collection<Opportunity>("Opportunity");
  }

  createOpportunity(OpportunityInfo) {
    this.opportunityCollection.add(OpportunityInfo);
  }

  updateOpportunity(OpportunityInfo, OpportunityId) {
    this.opportunityCollection.doc(OpportunityId).update(OpportunityInfo);
  }

  getAllOpportunity(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.angularfirestore
            .collection<Opportunity>("Opportunity")
            .snapshotChanges()
            .subscribe(Opportunity => {
              observer.next(Opportunity);
            });
        } else {
          observer.next(null);
        }
      });
    });
  }

  getOpportunityBySupplier(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.angularfirestore
            .collection<Opportunity>("Opportunity", ref =>
              ref.where("managerId", "==", this.userId)
            )
            .snapshotChanges()
            .subscribe(Opportunity => {
              observer.next(Opportunity);
            });
        } else {
          observer.next(null);
        }
      });
    });
  }

  getProfileBymanagerId(managerId): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore
        .collection("Person")
        .doc(managerId)
        .snapshotChanges()
        .pipe(
          map(changes => {
            const data = changes.payload.data();
            const id = changes.payload.id;
            return { id, data };
          })
        ).subscribe(profile=>{
          observer.next(profile);
        })
    });
  }

  removeOpportunityByID(id){
    this.angularfirestore.collection("Opportunity").doc(id).delete();
  }

  getOpportunityByOpportunityId(id): Observable<any> {
    return new Observable(observer => {
      this.opportunityCollection
        .doc(id)
        .snapshotChanges()
        .pipe(
          map(changes => {
            const data = changes.payload.data();
            const id = changes.payload.id;
            return { id, data };
          })
        )
        .subscribe(res => {
          observer.next(res);
        });
    });
  }

  // Get one data in database
  getOneProduct(idOpportunity: string) {
    this.OpportunityDoc = this.angularfirestore.doc<Opportunity>(`Opportunity/${idOpportunity}`);
    return this.OpportunityView = this.OpportunityDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data();
        data.Created = new Date(data.Created.seconds * 1000);
        data.id = action.payload.id;
        return data;
      }
    }));
  }
}
