import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private token: string;

	constructor(private http: HttpClient) {
		
	}

	register(user: User): Observable<{message: string, data: User}> {
		return this.http.post<{message: string, data: User}>('/api/auth/register', user);
	};

	login(user: User):Observable<{message: string, data: string}> {
		return this.http.post<{message:string, data: string}>('/api/auth/login', user)
			.pipe(
				tap(
					({data}) => {
						localStorage.setItem('auth-token', data);
						this.setToken(data);
					}
				)
			);
	};

	setToken(token: string) {
		this.token = token;
	};

	getToken(): string {
		return this.token;
	};

	isAuthenticated(): boolean {
		return !!this.token;
	};

	logout() {
		this.setToken('');
		localStorage.removeItem('auth-token');
	};
};