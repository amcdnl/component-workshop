import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UpdateComponent } from './scenario.actions';

@Component({
  selector: 'app-inputs',
  template: `
    <div>
      <h3>Inputs</h3>
      <mat-form-field *ngFor="let input of scenario.inputs">
        <input matInput
               [placeholder]="input.name"
               [value]="input.value"
               (change)="onChange(input.name, $event.target.value)">
        <mat-hint>{{input.doc}}</mat-hint>
      </mat-form-field>
    </div>
  `,
})
export class InputsComponent {

  @Input() group;
  @Input() scenario;

  constructor(private store: Store<any>) {}

  onChange(name, value) {
    console.log('Component Input Changed', event);
    const update = {};
    update[name] = value;
    this.store.dispatch(new UpdateComponent(update));
  }

}
