import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@common/components/components.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [RootComponent, HomeComponent],
	imports: [CommonModule, DashboardRoutingModule, ComponentsModule],
})
export class DashboardModule {}
