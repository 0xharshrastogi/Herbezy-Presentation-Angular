import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthActionTypes } from '@common/ngrx/authenticate/authenticate.action';

@Component({
	selector: 'app-root',
	template: `
    <router-outlet></router-outlet>
  `,
	styles: [],
})
export class AppComponent implements OnInit {
	private readonly store: Store;

	public constructor(store: Store) {
		this.store = store;
	}

	public ngOnInit(): void {
		const initiateAuthenticationAction = AuthActionTypes.initiateJsonWebTokenAuthentication();

		console.log('Initiating Authentication');
		this.store.dispatch(initiateAuthenticationAction);
	}
}
