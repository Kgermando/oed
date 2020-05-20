import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { QueryService } from 'src/app/shared/services/data/query.service';
import { User } from '../models/user';
import { Entities } from '../models/permissions.model';
// import { Roles, Entities } from '../models/fsEnum';


@Injectable({
	providedIn: 'root'
})
export class SecurityService {
	constructor(private query: QueryService) {}

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
 

	matchAdmin(user: User): boolean {
		const allowed = ['admin'];
		return this.checkAuthorization(user, allowed);
	}

	matchManager(user: User): boolean {
		const allowed = ['manager', 'user'];
		return this.checkAuthorization(user, allowed);
	}
	
	matchUser(user: User): boolean {
		const allowed = ['user'];
		return this.checkAuthorization(user, allowed);
	}
	

	
	isAdmin(): Observable<boolean> {
		return new Observable((observer) => {
			this.query
				.getLoggedInUserID()
				.pipe(
					switchMap((res) => {
						return this.query.getSingleData(Entities.Person, res);
					})
				)
				.pipe(first())
				.subscribe((res2) => {
					let result = this.matchAdmin(res2);
					observer.next(result);
				}),
				(err) => observer.error(err),
				() => observer.complete();
		});
	}


	isUser(): Observable<boolean> {
		return new Observable((observer) => {
			this.query
				.getLoggedInUserID()
				.pipe(
					switchMap((res) => {
						return this.query.getSingleData(Entities.Person, res);
					})
				)
				.pipe(first())
				.subscribe((res2) => {
					let result = this.matchUser(res2);
					observer.next(result);
				}),
				(err) => observer.error(err),
				() => observer.complete();
		});
	}


	isManager(): Observable<boolean> {
		return new Observable((observer) => {
			this.query
				.getLoggedInUserID()
				.pipe(
					switchMap((res) => {
						return this.query.getSingleData(Entities.Person, res);
					})
				)
				.pipe(first())
				.subscribe((res2) => {
					let result = this.matchManager(res2);
					observer.next(result);
				}),
				(err) => observer.error(err),
				() => observer.complete();
		});
	}

	// getRole():Observable<any>{
	// 	return new Observable(obs => {
	// 		this.query
	// 			.getLoggedInUserID()
	// 			.pipe(
	// 				switchMap((res) => {
	// 					return this.query.getSingleData(Entities.Person, res);
	// 				})
	// 			)
	// 			.pipe(first())
	// 			.subscribe((res2) => { 
	// 				obs.next(res2.roles);}),
	// 			(err) => obs.error(err),
	// 			() => obs.complete();
	// 	})
	// }
}
