import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RootComponent } from './root/root.component';

@NgModule({
	declarations: [RootComponent],
	imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
