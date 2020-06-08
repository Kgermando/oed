import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Actualite } from './models/actualite';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilityService } from 'src/app/auth/services/utility-service/utility.service';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {

  userId: string;
  actualite: any;
  actualiteCollection: AngularFirestoreCollection<Actualite>;
  actualiteInfo: Observable<Actualite[]>;

  // Pour la methode getOneProduct()
  private actualiteDoc: AngularFirestoreDocument<Actualite>;
  public actualiteView: Observable<Actualite>;

  constructor(
    private angularfireauth: AngularFireAuth,
    private angularfirestore: AngularFirestore
  ) {
    this.angularfireauth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });

    this.actualiteCollection = angularfirestore.collection<Actualite>("Actualite");
  }

  createActualite(actualiteInfo) {
    this.actualiteCollection.add(actualiteInfo);
  }

  updateActualite(actualiteInfo, actualiteId) {
    this.actualiteCollection.doc(actualiteId).update(actualiteInfo);
  }

  getAllActualite(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.angularfirestore
            .collection<Actualite>("Actualite")
            .snapshotChanges()
            .subscribe(Actualite => {
              observer.next(Actualite);
            });
        } else {
          observer.next(null);
        }
      });
    });
  }

  getActualiteBySupplier(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.angularfirestore
            .collection<Actualite>("Actualite", ref =>
              ref.where("managerId", "==", this.userId)
            )
            .snapshotChanges()
            .subscribe(Actualite => {
              observer.next(Actualite);
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

  removeActualiteByID(id){
    this.angularfirestore.collection("Actualite").doc(id).delete();
  }

  getActualiteByActualiteId(id): Observable<any> {
    return new Observable(observer => {
      this.actualiteCollection
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
  getOneProduct(idActualite: string) {
    this.actualiteDoc = this.angularfirestore.doc<Actualite>(`Actualite/${idActualite}`);
    return this.actualiteView = this.actualiteDoc.snapshotChanges().pipe(map(action => {
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
