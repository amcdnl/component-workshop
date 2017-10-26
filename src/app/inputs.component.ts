import { Component, Input, OnInit } from '@angular/core';
import { scenarios } from '../assets/scenarios';

@Component({
  selector: 'app-inputs',
  template: `
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

  ngOnInit() {
    this.group = scenarios.find(s => s.name === this.groupName);
    this.scenario = this.group.scenarios.find(s => s.name === this.scenarioName);
  }

  onChange(event) {
    console.log('Changing', event);
  }

}
