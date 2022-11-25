import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { JWT_AUTH_TOKEN } from '@common/constants';
import { IAuthService } from '@common/interfaces';
import { AuthService } from '@common/services';
import { isNotNull } from '@common/utils';

import { AuthActionTypes } from './authenticate.action';
import { AuthenticationErrorTypes } from './authenticationErrorTypes';

@Injectable()
export class AuthenticateEffects {
	private readonly auth: IAuthService;

	private readonly store: Store;

	private initiateAuthenticationEffectUpdated = createEffect(() => {
		return this.actions.pipe(
			ofType(AuthActionTypes.initiateJsonWebTokenAuthentication),
			map(() => AuthenticateEffects.getJsonWebToken()),
			map(token =>
				isNotNull(token)
					? AuthActionTypes.jwtFound({ token })
					: AuthActionTypes.authenticationFailed({
							error: AuthenticationErrorTypes.jwtTokenNotFound(),
					  })
			)
		);
	});

	private authenticateUsingJwtEffect = createEffect(() => {
		return this.actions.pipe(
			ofType(AuthActionTypes.jwtFound),
			exhaustMap(({ token }) => this.isTokenValid(token)),
			map(result =>
				result.isValid
					? AuthActionTypes.authenticationSucceed(result)
					: AuthActionTypes.authenticationFailed({
							error: AuthenticationErrorTypes.jwtTokenInvalidOrExpired(),
					  })
			),
			catchError(error => of(AuthActionTypes.authenticationFailed({ error })))
		);
	});

	private authenticatedEffect = createEffect(
		() => {
			return this.actions.pipe(
				ofType(AuthActionTypes.authenticationSucceed),
				map(props => props.token),
				tap(token => AuthenticateEffects.storeJsonWebToken(token))
			);
		},
		{ dispatch: false }
	);

	private authenticationFailedEffect = createEffect(
		() => {
			return this.actions.pipe(
				ofType(AuthActionTypes.authenticationFailed),
				tap(({ error }) => console.error(error))
			);
		},
		{ dispatch: false }
	);

	public constructor(private readonly actions: Actions, auth: AuthService, store: Store) {
		this.auth = auth;
		this.store = store;
	}

	private isTokenValid = (token: string) =>
		this.auth.validate(token).pipe(map(isValid => ({ isValid, token })));

	private static getJsonWebToken() {
		return localStorage.getItem(JWT_AUTH_TOKEN);
	}

	private static storeJsonWebToken(token: string) {
		localStorage.setItem(JWT_AUTH_TOKEN, token);
	}
}
