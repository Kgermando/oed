import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryFn, AngularFirestoreCollection, AngularFirestore,
         AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/auth/services/models/user';


@Injectable({
    providedIn: 'root'
  })
  export class UserService {

    readonly path = 'users';
    private collection: AngularFirestoreCollection<User>;

    private UserDoc: AngularFirestoreDocument<User>;
    private User: Observable<User>;
  
  
    constructor(private afs: AngularFirestore, private angularfireauth: AngularFireAuth) {
      this.collection = afs.collection<User>(this.path);
     }
  
     private getCollection(collection: string) {
      this.collection = this.afs.collection<User>(collection);
    }
  
    add(data: User) {
      return this.afs.doc<User>(`${this.path}/${data.uid}`).set(data).then((error => {
        console.log(error);
      }));
    }
  
    remove(uid: string): Promise<void> {
      return this.afs.doc<User>(`${this.path}/${uid}`).delete();
    }

    removeProductByID(id){
      this.afs.collection("users").doc(id).delete();
    }
  
    update(data: User) {
      return this.afs.doc<User>(`${this.path}/${data.uid}`).set(data).then((error => {
        console.log(error);
      }));
    }
  
    getCollection$(ref?: QueryFn): Observable<User[]> {
      return this.afs.collection<User>(this.path, ref)
        .snapshotChanges().pipe(map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as User;
            const id = data.uid;
            return { id, ...data };
          });
        })
        );
    }

    getProductBySupplier(ref?: QueryFn): Observable<any> {
        return new Observable(observer => {
          this.angularfireauth.authState.subscribe(user => {
        
              this.afs.collection<User>("users", ref)
                .snapshotChanges()
                .subscribe(product => {
                  observer.next(product);
                });
            } );
        });
      }

      getOneUser(idUser: string) {
        this.UserDoc = this.afs.doc<User>(`users/${idUser}`);
        return this.User = this.UserDoc.snapshotChanges().pipe(map(action => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data();
            data.uid = action.payload.id;
            return data;
          }
        }));
      }
    
}