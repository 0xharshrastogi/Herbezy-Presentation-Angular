import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TFormStructure, TLoginForm } from '@common/types';

import { AbstractFormBuilder } from './AbstractFormBuilder';

export class LoginFormBuilder extends AbstractFormBuilder<TLoginForm> {
	private form: FormGroup<TFormStructure<TLoginForm>> = new FormGroup({
		email: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.email],
		}),

		password: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required],
		}),
	});

	public createForm(): FormGroup<TFormStructure<TLoginForm>> {
		return this.form;
	}
}
