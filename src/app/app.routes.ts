import { Routes } from '@angular/router';
import { DemoComponent } from './demo.component';

export const routes: Routes = [
  {
    path: ':group/:scenario',
    component: DemoComponent
  }
];
