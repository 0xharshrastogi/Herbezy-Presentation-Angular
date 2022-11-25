/* eslint-disable no-mixed-spaces-and-tabs */
import { AbstractControl, Validator } from '@angular/forms';

import { PASSWORD_REGEXP } from '../constants';

type PasswordValidatorConfig = {
	length?: number;
	containLowercase?: boolean;
	containUppercase?: boolean;
	containNumber?: boolean;
} & ({ containSymbol: true; allowedSymbols: string[] } | { containSymbol?: false });

export type PasswordValidationError = { password: { message: string[] } };

export class PasswordValidator implements Validator {
	private readonly config?: PasswordValidatorConfig;

	public constructor();
	public constructor(config?: PasswordValidatorConfig) {
		this.config = config;
	}

	private static validateWithoutConfig(value: string): PasswordValidationError | null {
		return PASSWORD_REGEXP.test(value)
			? null
			: {
					password: {
						message: [
							'Must contain 8 characters',
							'Must contain at least 1 number',
							'Must contain at least 1 capital case',
							'Must contain at least 1 lowercase case',
							'Must contain at least 1 symbol',
						],
					},
			  };
	}

	private static validateWithConfig(_value: string): PasswordValidationError | null {
		throw new Error('Method Not Implemented');
	}

	public validate(control: AbstractControl<string>): PasswordValidationError | null {
		const { value } = control;

		return this.config
			? PasswordValidator.validateWithConfig(value)
			: PasswordValidator.validateWithoutConfig(value);
	}
}
