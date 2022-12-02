import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RootComponent } from './root/root.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				pathMatch: 'full',
				component: RootComponent,
				title: 'Herbezy Dashboard',
				children: [
					{
						path: '',
						component: HomeComponent,
					},
				],
			},
		]),
	],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
