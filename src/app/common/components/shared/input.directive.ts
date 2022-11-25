import { Directive, HostBinding, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
	selector: 'input[appInput]',
})
export class InputDirective implements OnInit {
	private readonly formControl: NgControl;

	private readonly commonClassName = 'app-input';

	@HostBinding('class') public classes = this.commonClassName;

	public constructor(control: NgControl) {
		this.formControl = control;
	}

	public ngOnInit(): void {
		this.formControl.statusChanges?.subscribe((status: 'VALID' | 'INVALID') => {
			const className = 'border-custom-error';

			this.classes =
				status === 'VALID'
					? this.commonClassName
					: [this.commonClassName, className].join(' ');
		});
	}
}
