import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
	declarations: [SidebarComponent],
	imports: [CommonModule, SharedModule, RouterModule],
	exports: [SharedModule, SidebarComponent],
})
export class ComponentsModule {}
