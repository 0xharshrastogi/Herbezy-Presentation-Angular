import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				pathMatch: 'full',
				component: RootComponent,
				children: [
					{
						path: 'lol',
						component: RootComponent,
						title: 'Herbezy Dashboard',
					},
				],
			},
		]),
	],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
