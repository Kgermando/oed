import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-em-dev',
  templateUrl: './em-dev.component.html',
  styleUrls: ['./em-dev.component.scss']
})
export class EmDevComponent implements OnInit {

  loggedIn$: Observable<boolean>;
  loggedOut$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth,
              public authService: AuthService,
              private router: Router,
              ) { }

  async ngOnInit() {
    
    this.loggedIn$ = this.afAuth.authState.pipe(
      map(user => !!user)
    );
    this.loggedOut$ = this.loggedIn$.pipe(
      map(loggedIn => !loggedIn)
    );

  }

  async signOut() {
    await this.afAuth.signOut()
    await localStorage.clear();
    await this.router.navigateByUrl("/emdev/auth")
  }

}
