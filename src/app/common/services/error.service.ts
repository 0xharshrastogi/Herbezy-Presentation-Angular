import { Injectable } from '@angular/core';

import { IErrorService } from '@common/interfaces/IErrorService';

@Injectable({
	providedIn: 'root',
})
export class ErrorService implements IErrorService {
	// eslint-disable-next-line class-methods-use-this
	public register(error: unknown) {
		localStorage.setItem(error + new Date().toString(), JSON.stringify(error));
	}
}
