import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PermissionsMap, Permissions } from 'src/app/auth/services/models/permissions.model';
import { RegisterRequest, User } from 'src/app/auth/services/models/user';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
 
@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit, OnDestroy {
  _permissions: PermissionsMap[];
  _registerRequest: RegisterRequest = new RegisterRequest();
  _user: User; 
  private onDestroy$ = new Subject<void>();

  constructor(public authService: AuthService) {
    this._permissions = [
      { value: Permissions.ADMIN, viewValue: 'Admininstrator' },
      { value: Permissions.MANAGER, viewValue: 'Manager' },
      { value: Permissions.USER, viewValue: 'User' }
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
