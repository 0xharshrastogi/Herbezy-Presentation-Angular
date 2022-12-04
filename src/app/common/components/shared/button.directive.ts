import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
	selector: 'button[appButton], a[appButton]',
})
export class ButtonDirective {
	private readonly elementRef: ElementRef<Element>;

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

	@HostBinding('class') public className =
		'inline-block capitalize bg-custom-primary px-3 py-5 text-white font-semibold rounded-[4px] dark:text-white hover:bg-custom-primary-dark-0 shadow-md outline-offset-4 outline-custom-primary-light-2 active:shadow-none';

	constructor(elementRef: ElementRef) {
		this.elementRef = elementRef;
	}
}
