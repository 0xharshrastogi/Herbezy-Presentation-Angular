import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
	selector: 'button[appButton], a[appButton]',
})
export class ButtonDirective {
	private readonly elementRef: ElementRef<Element>;

	@Input() variant: 'Default' | 'Icon' = 'Default';

	@Input() set full(value: boolean) {
		console.count('Button Full');
		const { classList } = this.elementRef.nativeElement;
		const className = 'w-full';

		if (value) {
			classList.add(className);
			return;
		}
		classList.remove(className);
	}

	@HostBinding('class') public get className() {
		return ButtonDirective.buttonClassnames[this.variant];
	}

	constructor(elementRef: ElementRef) {
		this.elementRef = elementRef;
	}

	private static buttonClassnames = {
		'Default':
			'inline-block capitalize bg-custom-primary px-3 py-5 text-white font-semibold rounded-[4px] dark:text-white hover:bg-custom-primary-dark-0 shadow-md outline-offset-4 outline-custom-primary-light-2 active:shadow-none',
		'Icon': 'text-lg h-10 w-10 leading-5 text-custom-secondary-light-2 text-custom-secondary hover:bg-custom-secondary-light-1 px-2 py-1 rounded-md transition-all ease-in',
	};
}
