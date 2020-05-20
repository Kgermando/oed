import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryFn, AngularFirestoreCollection, AngularFirestore,
         AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Contact } from '../models/contact';


@Injectable({
    providedIn: 'root'
  })
  export class ContactService {

    readonly path = 'Contacts';
    private collection: AngularFirestoreCollection<Contact>;

    private ContactDoc: AngularFirestoreDocument<Contact>;
    private contact: Observable<Contact>;
  
  
    constructor(private afs: AngularFirestore, private angularfireauth: AngularFireAuth) {
      this.collection = afs.collection<Contact>(this.path);
     }
  
     private getCollection(collection: string) {
      this.collection = this.afs.collection<Contact>(collection);
    }
  
    add(data: Contact) {
      return this.afs.doc<Contact>(`${this.path}/${data.id}`).set(data).then((error => {
        console.log(error);
      }));
    }
  
    remove(id: string): Promise<void> {
      return this.afs.doc<Contact>(`${this.path}/${id}`).delete();
    }

    removeProductByID(id){
      this.afs.collection("Contacts").doc(id).delete();
    }
  
    update(data: Contact) {
      return this.afs.doc<Contact>(`${this.path}/${data.id}`).set(data).then((error => {
        console.log(error);
      }));
    }
  
    getCollection$(ref?: QueryFn): Observable<Contact[]> {
      return this.afs.collection<Contact>(this.path, ref)
        .snapshotChanges().pipe(map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Contact;
            const id = data.id;
            return { id, ...data };
          });
        })
        );
    }

    getProductBySupplier(ref?: QueryFn): Observable<any> {
        return new Observable(observer => {
          this.angularfireauth.authState.subscribe(user => {
        
              this.afs.collection<Contact>("Contacts", ref)
                .snapshotChanges()
                .subscribe(product => {
                  observer.next(product);
                });
            } );
        });
      }

      getOneContact(idContact: string) {
        this.ContactDoc = this.afs.doc<Contact>(`Contacts/${idContact}`);
        return this.contact = this.ContactDoc.snapshotChanges().pipe(map(action => {
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