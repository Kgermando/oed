import { Permissions, Roles } from './permissions.model';
export interface User {
  uid?: string;
  name?: string;
  email?: string;
  adress?: string;
  phone?: string;
  roles?: Roles;
  companyname?: string;
  photoURL?:string;
}

export class RegisterRequest {
  constructor() {}
  email = '';
  password = ''; 
  name: string;
  adress?: string;
  phone?: string;
  role: Permissions;
}

export class LoginRequest {
  constructor() {}
  email = '';
  password = '';
}
