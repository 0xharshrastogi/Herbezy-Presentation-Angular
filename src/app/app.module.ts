import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthenticateEffects } from '@common/ngrx/authenticate/authenticate.effect';
import { reducer } from '@common/ngrx/reducer';

import { configuration } from 'src/configuration/configuration';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';

const modules: NgModule['imports'] = [];

if (configuration.environment === 'development') {
	modules.push(StoreDevtoolsModule.instrument());
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule,
		HttpClientModule,
		PagesModule,
		StoreModule.forRoot(reducer),
		EffectsModule.forRoot([AuthenticateEffects]),
		...modules,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
