import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * A fancy alert
 */
@Component({
  selector: 'app-alert',
  template: `
    <ng-content></ng-content>
  `
})
export class AlertComponent {

}
