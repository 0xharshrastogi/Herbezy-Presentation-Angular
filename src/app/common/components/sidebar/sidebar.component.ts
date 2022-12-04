import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sidebar, [app-sidebar]',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
	private readonly router: Router;

	private isOpen = false;

	private elementRef: ElementRef<Element>;

	public navigationRoutes = [
		{ path: '.', boxIconClassName: 'bx bx-home', label: 'Dashboard' },
		{ path: 'Restaurants', boxIconClassName: 'bx bx-store', label: 'Restaurant' },
		{ path: 'Setting', boxIconClassName: 'bx bx-cog', label: 'Setting' },
	];

	@HostBinding('class') public className =
		'fixed bg-white min-h-screen bg-inherit shadow w-full top-0 lg:max-w-xs lg:static sidebar-container flex flex-col';

	public get isActive() {
		return this.isOpen;
	}

	@Input() public set isActive(active: boolean) {
		this.isOpen = active;

		const { classList } = this.elementRef.nativeElement;
		const CLASSNAMES = 'close';

		if (active) {
			classList.remove(CLASSNAMES);
			return;
		}
		classList.add(CLASSNAMES);
	}

	constructor(elementRef: ElementRef<HTMLElement>, router: Router) {
		this.elementRef = elementRef;
		this.router = router;
	}

	public logout() {
		console.log('Logging out', this);
		this.router.navigate(['Authenticate', 'Login']);
	}
}
