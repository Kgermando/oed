import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Membres } from './models/membres';

@Injectable({
  providedIn: 'root'
})
export class MembresService {

  userId: string;
  Membres: any;
  MembresCollection: AngularFirestoreCollection<Membres>;
  MembresInfo: Observable<Membres[]>;

   // Pour la methode getOneProduct()
  private envDoc: AngularFirestoreDocument<Membres>;
  public envView: Observable<Membres>;

  constructor(
    private angularfireauth: AngularFireAuth,
    private angularfirestore: AngularFirestore
  ) {
    this.angularfireauth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });

    this.MembresCollection = angularfirestore.collection<Membres>("Membres");
  }

  getUserId(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        observer.next(user.uid);
      });
    });
  }

  createMembres(MembresInfo) {
    this.MembresCollection.add(MembresInfo);
  }

  updateMembres(MembresInfo, MembresId) {
    this.MembresCollection.doc(MembresId).update(MembresInfo);
  }

  getMembresByManager(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.angularfirestore
            .collection<Membres>("Membres", ref =>
              ref.where("managerId", "==", this.userId)
            )
            .snapshotChanges()
            .subscribe(Membres => {
              observer.next(Membres);
            });
        } else {
          observer.next(null);
        }
      });
    });
  }

  getMembres(): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore.collection<Membres>("Membres").snapshotChanges()
        .subscribe(Membres => {
            observer.next(Membres);
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

  removeMembresByID(id){
    this.angularfirestore.collection("Membres").doc(id).delete();
  }

  getMembresByMembresId(id): Observable<any> {
    return new Observable(observer => {
      this.MembresCollection
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
  getOneProduct(idMembres: string) {
    this.envDoc = this.angularfirestore.doc<Membres>(`Membres/${idMembres}`);
    return this.envView = this.envDoc.snapshotChanges().pipe(map(action => {
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