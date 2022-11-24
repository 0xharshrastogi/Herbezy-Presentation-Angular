import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../common/components/components.module';

import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, RouterModule, ComponentsModule],
	exports: [],
})
export class PagesModule {}
