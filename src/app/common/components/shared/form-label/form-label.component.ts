import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-form-label',
	templateUrl: './form-label.component.html',
	styleUrls: ['./form-label.component.scss'],
})
export class FormLabelComponent {
	@Input() public for!: string;
}
