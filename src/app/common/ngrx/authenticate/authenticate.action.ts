import { createAction, props } from '@ngrx/store';

export class AuthActionTypes {
	public static initiateJsonWebTokenAuthentication = createAction(
		'[Authentication] Authentication Initiated For Json Web Token'
	);

	public static startAuthentication = createAction('[Authentication] Authentication Started');

	public static authenticationSucceed = createAction(
		'[Authentication] Authenticated Successfully',
		props<{ token: string }>()
	);

	public static authenticationFailed = createAction(
		'[Authentication] Authenticated Failed',
		props<{ error: Error }>()
	);

	public static jwtFound = createAction(
		'[Authentication] JSON Web Token Found',
		props<{ token: string }>()
	);

	public static logout = createAction('[Authentication] Logout');
}
