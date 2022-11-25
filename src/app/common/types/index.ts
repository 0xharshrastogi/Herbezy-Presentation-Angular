import { FormControl, FormGroup } from '@angular/forms';

export type TFormKeys<T> = T extends FormGroup<infer U> ? keyof U : never;

export type TFormControlFromKey<T, K extends TFormKeys<T>> = T extends FormGroup<infer R>
	? R[K]
	: never;

export type TFormStructure<T> = { [key in keyof T]: FormControl<T[key]> };

export type TLoginForm = {
	email: string;
	password: string;
};

export type TSignupForm = { firstName: string; lastName: string } & TLoginForm;

export type TJsonWebToken = { token: string };
