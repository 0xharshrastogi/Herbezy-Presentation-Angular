import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonDirective } from './ButtonDirective';

@NgModule({
	declarations: [ButtonDirective],
	imports: [CommonModule],
	exports: [ButtonDirective],
})
export class SharedModule {}
