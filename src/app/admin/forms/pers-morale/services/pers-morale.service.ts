import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PersMorale } from './models/pers-morale';

@Injectable({
  providedIn: 'root'
})
export class PersMoraleService {
  userId: string;
  PersMorale: any;
  PersMoraleCollection: AngularFirestoreCollection<PersMorale>;
  PersMoraleInfo: Observable<PersMorale[]>;

   // Pour la methode getOneProduct()
  private persMoraleDoc: AngularFirestoreDocument<PersMorale>;
  public persMoraleView: Observable<PersMorale>;

  constructor(
    private angularfireauth: AngularFireAuth,
    private angularfirestore: AngularFirestore
  ) {
    this.angularfireauth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });

    this.PersMoraleCollection = angularfirestore.collection<PersMorale>("PersMorale");
  }

  getUserId(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        observer.next(user.uid);
      });
    });
  }

  createPersMorale(PersMoraleInfo) {
    this.PersMoraleCollection.add(PersMoraleInfo);
  }

  updatePersMorale(PersMoraleInfo, PersMoraleId) {
    this.PersMoraleCollection.doc(PersMoraleId).update(PersMoraleInfo);
  }

  getPersMoraleByManager(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.angularfirestore
            .collection<PersMorale>("PersMorale", ref =>
              ref.where("managerId", "==", this.userId)
            )
            .snapshotChanges()
            .subscribe(PersMorale => {
              observer.next(PersMorale);
            });
        } else {
          observer.next(null);
        }
      });
    });
  }

  getPersMorale(): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore.collection<PersMorale>("PersMorale").snapshotChanges()
        .subscribe(PersMorale => {
            observer.next(PersMorale);
      });
    })
  }

  getProfileByManagerId(managerId): Observable<any> {
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
        ).subscribe(profile => {
          observer.next(profile);
        })
    });
  }

  removePersMoraleByID(id){
    this.angularfirestore.collection("PersMorale").doc(id).delete();
  }

  getPersMoraleByPersMoraleId(id): Observable<any> {
    return new Observable(observer => {
      this.PersMoraleCollection
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

  // Geet one data in database
  getOneProduct(idPersMorale: string) {
    this.persMoraleDoc = this.angularfirestore.doc<PersMorale>(`PersMorale/${idPersMorale}`);
    return this.persMoraleView = this.persMoraleDoc.snapshotChanges().pipe(map(action => {
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

