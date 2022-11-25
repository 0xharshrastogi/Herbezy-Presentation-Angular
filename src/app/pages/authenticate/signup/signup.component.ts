import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AbstractFormBuilder, SignupFormBuilder } from '@common/formBuilders';
import type { IAuthService } from '@common/interfaces/IAuthService';
import { AuthService } from '@common/services';
import type { TFormControlFromKey, TFormKeys, TFormStructure, TSignupForm } from '@common/types';

import { BaseComponentFormHandler } from '../common/baseComponentFormHandler';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends BaseComponentFormHandler {
	private readonly auth: IAuthService;

	private readonly router: Router;

	public form: FormGroup<TFormStructure<TSignupForm>>;

	public constructor(auth: AuthService, router: Router, store: Store) {
		super(store);

		const formBuilder: AbstractFormBuilder<TSignupForm> = new SignupFormBuilder(auth);

		this.auth = auth;
		this.router = router;
		this.form = formBuilder.createForm();
	}

	public getFormControl<T extends TFormKeys<SignupComponent['form']>>(
		key: T
	): TFormControlFromKey<SignupComponent['form'], T> {
		return this.form.controls[key];
	}

	public onFormSubmit() {
		if (this.form.invalid) return;
		const { value: userData } = this.form;

		this.signup(<Required<typeof userData>>userData);
	}

	public signup(formData: TSignupForm) {
		this.authenticationStatus$.next({
			event: 'AuthenticationStart',
		});
		this.auth.signup(formData).subscribe(result => {
			if (!result.isAuthenticated) return;

			this.handleSignupSuccess(result.token);
		});
	}

	private handleSignupSuccess(token: string) {
		this.authenticationStatus$.next({
			event: 'AuthenticationSuccess',
			props: {
				token,
			},
		});
		this.router.navigate(['Home']);

		console.log('Signup Successful...');
	}
}
