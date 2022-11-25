import { Observable } from 'rxjs';

import { TJsonWebToken, TLoginForm, TSignupForm } from '@common/types';

type TCredential = TLoginForm;

type TSignupData = TSignupForm;

type TEmailAvailable = { isEmailAvailable: boolean; email: string };

type TAuthenticationActionResult =
	| ({ isAuthenticated: true } & TJsonWebToken)
	| { isAuthenticated: false; message: string; error: unknown };

export interface IAuthService {
	login(credential: TCredential): Observable<TAuthenticationActionResult>;

	signup(userData: TSignupData): Observable<TAuthenticationActionResult>;

	isEmailAvailable(email: string): Observable<TEmailAvailable>;

	validate(jsonWebToken: string): Observable<boolean>;
}
