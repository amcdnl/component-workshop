import { NgModule } from '@angular/core';

import { AlertComponent } from './alert';
import { NoticeComponent } from './notice';

@NgModule({
  declarations: [
    AlertComponent,
    NoticeComponent
  ],
  exports: [
    AlertComponent,
    NoticeComponent
  ],
})
export class TestModule { }
