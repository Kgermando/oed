import { Injectable, NgZone } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User, RegisterRequest, LoginRequest } from '../models/user';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ToastService } from '../toast.service';
import { Permissions } from '../models/permissions.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  users$: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;
  errorsData: BehaviorSubject<string> = new BehaviorSubject<string>('');


  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toaster: ToastService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getAllUsers() {
    this.usersCollection = this.afs.collection<User>('users');
    return (this.users$ = this.usersCollection.valueChanges());
  }

  getErrors() {
    return of(this.errorsData);
  }

  updateUserName(user: User) {
    return new Promise<any>((resolve, reject) => {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      userRef
        .set(user, { merge: true })
        .then(() => {
          this.toaster.openSnackBar('Updated The users name.');
        })
        .catch(() => {
          reject();
        });
    });
  }

  emailSignUp(request: RegisterRequest) {
    return this.afAuth
      .createUserWithEmailAndPassword(request.email, request.password)
      .then(user => {
        return this.updateUserData(user.user, request);
      })
      .catch(error => {
        this.errorsData.next(error.message);
        this.toaster.openSnackBar(error.message);
      });
  }

  signOut() {
    this.afAuth.signOut();
    this.router.navigate(['/fastsmart/auth/login']);
  }

  signIn(req: LoginRequest) {
    return this.afAuth.signInWithEmailAndPassword(req.email, req.password);
  }

  private updateUserData(user, customData: RegisterRequest) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      name: customData.name,
      adress: customData.adress,
      phone: customData.phone,
      email: user.email,
      roles: {
        admin: customData.role === Permissions.ADMIN,
        manager: customData.role === Permissions.MANAGER,
        user: customData.role === Permissions.USER
      }
    };
    userRef.set(data, { merge: true });
    return this.router.navigate(['/fastsmart/layouts/home']);
  }

  isLogged(user: User): boolean {
    if (user === null) {
      return false;
    } else {
      return true;
    }
  }


   
  canUser(user: User): boolean {
    const allowed = ['manager', 'user'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['user'];
    return this.checkAuthorization(user, allowed);
  }

  isAdmin(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      console.log('no user');
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        console.log('authorized');
        return true;
      }
    }
    console.log('NOT authorized');
    return false;
  }

}
