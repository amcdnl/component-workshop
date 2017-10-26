import { Component, Input, OnInit } from '@angular/core';
import { scenarios } from '../assets/scenarios';
import { Store } from '@ngrx/store';
import { UpdateComponent } from './app.actions';

@Component({
  selector: 'app-inputs',
  template: `
    <h3>Inputs</h3>
    <ul>
      <li *ngFor="let input of scenario.inputs">
        {{input.name}}
        <input [value]="input.value" (change)="onChange($event)" />
      </li>
    </ul>
  `,
})
export class InputsComponent implements OnInit {

  @Input() groupName;
  @Input() scenarioName;

  scenario;
  group;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.group = scenarios.find(s => s.name === this.groupName);
    this.scenario = this.group.scenarios.find(s => s.name === this.scenarioName);
  }

  onChange(event) {
    console.log('Changing', event);
    this.store.dispatch(new UpdateComponent({
      text: event.target.value
    }));
  }

}
