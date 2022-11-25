import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './authenticate.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
	{
		path: '',
		component: AuthenticateComponent,
		children: [
			{ path: 'Login', component: LoginComponent, title: 'Log In' },
			{ path: 'Signup', component: SignupComponent, title: 'Sign Up' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthenticateRoutingModule {}
