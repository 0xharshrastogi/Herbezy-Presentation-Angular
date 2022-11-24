import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, PagesRoutingModule],
	exports: [PagesRoutingModule],
})
export class PagesModule {}
