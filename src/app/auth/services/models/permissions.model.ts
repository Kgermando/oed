export enum Permissions {
  ADMIN = 1,
  MANAGER = 2,
  USER = 3
}

export interface PermissionsMap {
  value: Permissions;
  viewValue: string;
}

export interface Roles {
  admin?: boolean;
  manager?: boolean;
  user?: boolean;
}
 
export enum Entities {
	Person = 'User',
	Product = 'Product',
	Category = 'Category',
	Location = 'Location',
	Roles = 'Roles',
	Enquiry = 'Enquiry',
	Purchase = 'Purchase',
	Brand = 'Brand',
	Notification = 'Notification'
}