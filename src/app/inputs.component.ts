import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UpdateComponent, UpdateContext } from './scenario.actions';

@Component({
  selector: 'app-inputs',
  template: `
    <div>
      <h3>Inputs</h3>
      <mat-form-field *ngFor="let input of scenario.inputs" class="input-field">
        <input matInput
               [placeholder]="input.name"
               [value]="input.value"
               (change)="onInputChange(input.name, $event.target.value)">
        <mat-hint>{{input.doc}}</mat-hint>
      </mat-form-field>
      <mat-form-field *ngFor="let input of scenario.context" class="input-field">
        <input matInput
              [placeholder]="input.name"
              [value]="input.value"
              (change)="onContextChange(input.name, $event.target.value)">
        <mat-hint>{{input.doc}}</mat-hint>
      </mat-form-field>
    </div>
  `,
})
export class InputsComponent {

  @Input() group;
  @Input() scenario;

  constructor(private store: Store<any>) {}

  onInputChange(name, value) {
    console.log('Component Input Changed', name, value);
    const update = {};
    update[name] = value;
    this.store.dispatch(new UpdateComponent(update));
  }

  onContextChange(name, value) {
    console.log('Context Changed', name, value);
    const update = {};
    update[name] = value;
    this.store.dispatch(new UpdateContext(update));
  }

}
