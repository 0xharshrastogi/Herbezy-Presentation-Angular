import { Directive, OnDestroy } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, map, Subject, Subscription } from 'rxjs';
import { AuthActionTypes } from 'src/app/common/ngrx/authenticate/authenticate.action';

type AuthStartEvent = { event: 'AuthenticationStart' };
type AuthSuccessEvent = { event: 'AuthenticationSuccess'; props: { token: string } };
type AuthFailureEvent = { event: 'AuthenticationFailed'; props: { error: Error } };

type AuthEvent = AuthStartEvent | AuthSuccessEvent | AuthFailureEvent;

const isStartEvent = (props: AuthEvent): props is AuthStartEvent =>
	props.event === 'AuthenticationStart';

const isFailedEvent = (props: AuthEvent): props is AuthFailureEvent =>
	props.event === 'AuthenticationFailed';

const isSuccessEvent = (props: AuthEvent): props is AuthSuccessEvent =>
	props.event === 'AuthenticationSuccess';

@Directive()
export abstract class BaseComponentFormHandler implements OnDestroy {
	private readonly store: Store;

	protected readonly authenticationStatus$ = new Subject<AuthEvent>();

	private readonly startAuthenticationEvent$ = this.authenticationStatus$.pipe(
		filter(isStartEvent)
	);

	private readonly successAuthenticationEvent$ = this.authenticationStatus$.pipe(
		filter(isSuccessEvent),
		map(event => event.props)
	);

	private readonly failedAuthenticationEvent$ = this.authenticationStatus$.pipe(
		filter(isFailedEvent),
		map(event => event.props)
	);

	private subscriptions: Subscription[] = [];

	protected constructor(store: Store) {
		this.store = store;
		this.registerAuthStatusChange();
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	// eslint-disable-next-line class-methods-use-this
	protected isErrorState(
		control: FormControl | null,
		form: NgForm | FormGroupDirective
	): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}

	private registerAuthStatusChange() {
		const startEventSubscription = this.startAuthenticationEvent$.subscribe(() => {
			this.store.dispatch(AuthActionTypes.startAuthentication());
		});

		const failureEventSubscription = this.failedAuthenticationEvent$.subscribe(props => {
			this.store.dispatch(AuthActionTypes.authenticationFailed(props));
		});

		const successEventSubscription = this.successAuthenticationEvent$.subscribe(props => {
			this.store.dispatch(AuthActionTypes.authenticationSucceed(props));
		});

		this.subscriptions.push(
			startEventSubscription,
			failureEventSubscription,
			successEventSubscription
		);
	}
}
