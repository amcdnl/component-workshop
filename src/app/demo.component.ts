import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { scenarios } from '../assets/scenarios';

@Component({
  selector: 'app-demo',
  template: `
    <div fxLayout="row" fxFlexFill>
      <div fxFlex fxFlexFill fxLayoutAlign="center center">
        <app-dynamic [scenario]="scenario" [group]="group"></app-dynamic>
      </div>
      <div fxFlex="20%" class="input-row">
        <app-inputs [scenario]="scenario" [group]="group"></app-inputs>
      </div>
    </div>
  `,
  preserveWhitespaces: false
})
export class DemoComponent {

  scenario: any;
  group: any;

  constructor(route: ActivatedRoute) {
    const groupName = route.snapshot.params['group'];
    const scenarioName = route.snapshot.params['scenario'];
    this.group = scenarios.find(s => s.route === groupName);
    this.scenario = this.group.scenarios.find(s => s.route === scenarioName);
  }

}
