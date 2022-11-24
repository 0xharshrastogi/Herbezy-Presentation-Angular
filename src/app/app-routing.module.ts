import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
	imports: [
		RouterModule.forRoot([
			{ path: 'Home', component: HomeComponent },
			{ path: '', component: HomeComponent },
		]),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
