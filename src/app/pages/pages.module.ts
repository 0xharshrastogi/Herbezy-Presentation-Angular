import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, PagesRoutingModule, HomeModule],
	exports: [],
})
export class PagesModule {}
