import { Directive, HostBinding } from '@angular/core';

@Directive({
	selector: 'button[appButton], a[appButton]',
})
export class ButtonDirective {
	@HostBinding('class') get classes() {
		return 'inline-block capitalize bg-custom-primary px-3 py-5 text-white font-semibold rounded-[4px] dark:text-custom-secondary hover:bg-custom-primary-dark-0 shadow-md outline-offset-4 outline-custom-primary-light-2 active:shadow-none';
	}
}
