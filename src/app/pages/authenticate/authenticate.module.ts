import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '@common/components/components.module';

import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { AuthenticateComponent } from './authenticate.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
	declarations: [AuthenticateComponent, LoginComponent, SignupComponent],
	imports: [CommonModule, AuthenticateRoutingModule, ComponentsModule, ReactiveFormsModule],
})
export class AuthenticateModule {}
