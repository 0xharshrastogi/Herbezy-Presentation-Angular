import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
	selector: 'app-navigation-bar',
	templateUrl: './navigation-bar.component.html',
	styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
	@Input() public isSidebarActive = true;

	@Output() public sidebarClose = new EventEmitter<boolean>();

	@HostBinding('class')
	public class = 'h-14 p-3 lg:px-10 flex items-center shadow';

	constructor() {
		this.sidebarClose.subscribe(console.log);
	}
}
