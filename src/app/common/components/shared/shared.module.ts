import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonDirective } from './button.directive';
import { InputDirective } from './input.directive';

import { FormFieldComponent } from './form-field/form-field.component';
import { FormLabelComponent } from './form-label/form-label.component';

@NgModule({
	declarations: [ButtonDirective, InputDirective, FormFieldComponent, FormLabelComponent],
	imports: [CommonModule],
	exports: [ButtonDirective, InputDirective, FormFieldComponent, FormLabelComponent],
})
export class SharedModule {}
