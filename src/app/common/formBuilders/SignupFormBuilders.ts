import {
	AbstractControl,
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';

import { map, Observable } from 'rxjs';

import { IAuthService } from '@common/interfaces';
import { TFormStructure, TSignupForm } from '@common/types';
import { PasswordValidator } from '@common/validators';

import { AbstractFormBuilder } from './AbstractFormBuilder';

export class SignupFormBuilder extends AbstractFormBuilder<TSignupForm> {
	private readonly auth: IAuthService;

	private form: FormGroup<TFormStructure<TSignupForm>> = new FormGroup({
		firstName: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(300)],
		}),

		lastName: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(300)],
		}),

		email: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.email],
			asyncValidators: [this.emailAvailabilityValidator.bind(this)],
		}),

		password: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, control => new PasswordValidator().validate(control)],
		}),
	});

	public constructor(auth: IAuthService) {
		super();

		this.auth = auth;
	}

	public createForm(): FormGroup<TFormStructure<TSignupForm>> {
		return this.form;
	}

	private emailAvailabilityValidator(
		control: AbstractControl<string>
	): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
		const { value: email } = control;
		return this.auth
			.isEmailAvailable(email)
			.pipe(map(result => (result.isEmailAvailable ? null : { emailAvailable: result })));
	}
}
