import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { User, RegisterRequest } from '../services/models/user';
import { Permissions, PermissionsMap } from '../services/models/permissions.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  _permissions: PermissionsMap[];
  _registerRequest: RegisterRequest = new RegisterRequest();
  _user: User;
  private onDestroy$ = new Subject<void>();

  constructor(public authService: AuthService) {
    this._permissions = [
      // { value: Permissions.ADMIN, viewValue: 'Admininstrator' },
      // { value: Permissions.MANAGER, viewValue: 'Manager' },
      { value: Permissions.USER, viewValue: 'Client' }
    ];
  }

  ngOnInit(): void {
    this.authService.user$.pipe(takeUntil(this.onDestroy$)).subscribe(user => (this._user = user));
  }

  signup() {
    this.authService.emailSignUp(this._registerRequest);
  }

  check() {
    this.authService.isAdmin(this._user);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

