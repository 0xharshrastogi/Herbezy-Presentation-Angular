import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, SharedModule],
	exports: [SharedModule],
})
export class ComponentsModule {}
