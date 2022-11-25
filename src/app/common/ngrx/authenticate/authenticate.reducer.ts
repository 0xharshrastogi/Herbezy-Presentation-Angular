import { createReducer, on } from '@ngrx/store';

import { AuthActionTypes } from './authenticate.action';

export interface IAuthReducer {
	bearer: string | null;
	isAuthenticating: boolean;
}

const initialReducerState: IAuthReducer = {
	bearer: null,
	isAuthenticating: false,
};

const handleBegunAuthenticationAction = (state: IAuthReducer): IAuthReducer => ({
	...state,
	bearer: null,
	isAuthenticating: true,
});

export const reducer = createReducer<IAuthReducer>(
	initialReducerState,

	on(AuthActionTypes.startAuthentication, handleBegunAuthenticationAction),
	on(AuthActionTypes.initiateJsonWebTokenAuthentication, handleBegunAuthenticationAction),

	on(
		AuthActionTypes.authenticationFailed,
		(state): IAuthReducer => ({ ...state, isAuthenticating: false })
	),

	on(
		AuthActionTypes.authenticationSucceed,
		(state, { token }): IAuthReducer => ({ ...state, bearer: token, isAuthenticating: false })
	)
);
