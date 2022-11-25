import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, of } from 'rxjs';

import { IAuthService, IErrorService } from '@common/interfaces';
import type { TJsonWebToken, TLoginForm, TSignupForm } from '@common/types';

import { ErrorService } from './error.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService implements IAuthService {
	private readonly http: HttpClient;

	private readonly errors: IErrorService;

	private readonly uri = {
		'SIGNUP': 'https://localhost:8080/api/Auth/Signup',
		'LOGIN': 'https://localhost:8080/api/Auth/Login',
		'EMAIL_AVAILABILITY': 'https://localhost:8080/api/Auth/EmailAvailable',
		'VALIDATE': 'https://localhost:8080/api/Auth/Validate',
	};

	public constructor(http: HttpClient, errors: ErrorService) {
		this.http = http;
		this.errors = errors;
	}

	public login(
		credential: TLoginForm
	): Observable<
		| ({ isAuthenticated: true } & TJsonWebToken)
		| { isAuthenticated: false; message: string; error: unknown }
	> {
		const uri = this.uri.LOGIN;

		console.log('Posting user credential');
		return this.http.post<TJsonWebToken>(uri, credential).pipe(
			map(response => ({ isAuthenticated: true as const, ...response })),

			catchError(error => {
				console.error(error);
				const isHttpErrorResponse = error instanceof HttpErrorResponse;

				if (isHttpErrorResponse && error.status === HttpStatusCode.Unauthorized) {
					return of({
						isAuthenticated: false as const,
						message:
							'The email and password you entered did not match our records. <strong>Please double check and try again</strong>',
						error,
					});
				}

				this.errors.register(error);
				return of({
					isAuthenticated: false as const,
					message:
						'Please try after some time. <strong>Something went wrong on our end.</strong>',
					error,
				});
			})
		);
	}

	public signup(
		userData: TSignupForm
	): Observable<
		| ({ isAuthenticated: true } & TJsonWebToken)
		| { isAuthenticated: false; message: string; error: unknown }
	> {
		const uri = this.uri.SIGNUP;
		return this.http.post<TJsonWebToken>(uri, userData).pipe(
			map(response => ({
				isAuthenticated: true as const,
				...response,
			})),

			catchError(error => {
				console.error(error);
				const isHttpErrorResponse = error instanceof HttpErrorResponse;

				if (isHttpErrorResponse && error.status === HttpStatusCode.BadRequest) {
					return of({
						isAuthenticated: false as const,
						message: 'Validation of form values failed, recheck form',
						error,
					});
				}

				this.errors.register(error);
				return of({
					isAuthenticated: false as const,
					message:
						'Please try after some time. <strong>Something went wrong on our end.</strong>',
					error,
				});
			})
		);
	}

	public isEmailAvailable(
		email: string
	): Observable<{ isEmailAvailable: boolean; email: string }> {
		return this.http.get<{ isEmailAvailable: boolean; email: string }>(
			this.uri.EMAIL_AVAILABILITY,
			{ params: { email } }
		);
	}

	public validate(jsonWebToken: string): Observable<boolean> {
		const uri = this.uri.VALIDATE;
		return this.http
			.get<{ valid: boolean }>(uri, {
				headers: { 'Authorization': `bearer ${jsonWebToken}` },
			})
			.pipe(map(response => response.valid));
	}
}
