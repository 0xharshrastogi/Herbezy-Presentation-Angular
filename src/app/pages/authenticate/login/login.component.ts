import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AbstractFormBuilder, LoginFormBuilder } from '@common/formBuilders';
import { IAuthService } from '@common/interfaces';
import { AuthService } from '@common/services';
import type { TFormControlFromKey, TFormKeys, TFormStructure, TLoginForm } from '@common/types';
import { PasswordValidationError } from '@common/validators';

import { BaseComponentFormHandler } from '../common/baseComponentFormHandler';

type TForm = FormGroup<TFormStructure<TLoginForm>>;

const CREDENTIAL_INVALID_ERROR = 'invalidCredential';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponentFormHandler {
	private readonly auth: IAuthService;

	private readonly router: Router;

	public readonly CREDENTIAL_INVALID_ERROR_KEY = CREDENTIAL_INVALID_ERROR;

	public readonly form: TForm;

	public get passwordErrorValidationMessages() {
		const control = this.getFormControl('password');
		if (!control.errors || !('password' in control.errors)) return [];

		return (<PasswordValidationError>control.errors).password.message;
	}

	public constructor(auth: AuthService, router: Router, store: Store) {
		const builder: AbstractFormBuilder<TLoginForm> = new LoginFormBuilder();
		const form = builder.createForm();

		super(store);

		this.auth = auth;
		this.router = router;
		this.form = form;
	}

	public getFormControl<T extends TFormKeys<LoginComponent['form']>>(
		key: T
	): TFormControlFromKey<TForm, T> {
		return this.form.controls[key];
	}

	public onFormSubmit() {
		if (this.form.invalid) return;
		const { value: credential } = this.form;

		this.login(<Required<typeof credential>>credential);
	}

	private login(credentials: TLoginForm) {
		this.authenticationStatus$.next({ event: 'AuthenticationStart' });

		this.auth
			.login(credentials)
			.subscribe(result =>
				result.isAuthenticated
					? this.handleOnLoginSuccess(result.token)
					: this.handleOnLoginFailure(result)
			);
	}

	private handleOnLoginFailure(failure: {
		isAuthenticated: false;
		message: string;
		error: unknown;
	}) {
		this.form.setErrors({ [this.CREDENTIAL_INVALID_ERROR_KEY]: { message: failure.message } });
		this.authenticationStatus$.next({
			event: 'AuthenticationFailed',
			props: { error: new Error(failure.message) },
		});
	}

	private handleOnLoginSuccess(jsonWebToken: string) {
		this.form.setErrors({ [this.CREDENTIAL_INVALID_ERROR_KEY]: null });
		this.authenticationStatus$.next({
			event: 'AuthenticationSuccess',
			props: { token: jsonWebToken },
		});

		this.router.navigate(['Dashboard']);
	}
}
