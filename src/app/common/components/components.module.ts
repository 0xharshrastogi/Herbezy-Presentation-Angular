import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
	declarations: [SidebarComponent, NavigationBarComponent],
	imports: [CommonModule, SharedModule, RouterModule],
	exports: [SharedModule, SidebarComponent, NavigationBarComponent],
})
export class ComponentsModule {}
