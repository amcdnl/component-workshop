import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatInputModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { DynamicComponent } from './dynamic.component';
import { InputsComponent } from './inputs.component';
import { DemoComponent } from './demo.component';
import { reducers } from './app.reducer';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponent,
    InputsComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    RouterModule.forRoot(routes, {
      useHash: false
    }),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
