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
  membres: any;
  membresCollection: AngularFirestoreCollection<Membres>;
  membresInfo: Observable<Membres[]>;

  // Pour la methode getOneProduct()
  private membreseDoc: AngularFirestoreDocument<Membres>;
  public membresView: Observable<Membres>;

  constructor(
    private angularfireauth: AngularFireAuth,
    private angularfirestore: AngularFirestore
  ) {
    this.angularfireauth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });

    this.membresCollection = angularfirestore.collection<Membres>("Membres");
  }


  createMembres(membresInfo) {
    this.membresCollection.add(membresInfo);
  }

  updateMembres(membresInfo, membresId) {
    this.membresCollection.doc(membresId).update(membresInfo);
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

  getAllMembres(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.angularfirestore
            .collection<Membres>("Membres")
            .snapshotChanges()
            .subscribe(persMorale => {
              observer.next(persMorale);
            });
        } else {
          observer.next(null);
        }
      });
    });
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
      this.membresCollection
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
    this.membreseDoc = this.angularfirestore.doc<Membres>(`Membres/${idMembres}`);
    return this.membresView = this.membreseDoc.snapshotChanges().pipe(map(action => {
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
