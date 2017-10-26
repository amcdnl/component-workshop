import { Component } from '@angular/core';
import { scenarios } from '../assets/scenarios';

@Component({
  selector: 'app-root',
  template: `
    <div fxLayout="row" fxFlexFill>
      <nav fxFlex="20%" class="primary-nav">
        <h1>Component Workshop</h1>
        <ul>
          <li *ngFor="let group of scenarios">
            <h3>{{group.name}}</h3>
            <ul>
              <li *ngFor="let scenario of group.scenarios">
                {{scenario.name}}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <content fxFlex fxFlexFill>
        <div fxLayout="row" fxFlexFill>
          <div fxFlex fxFlexFill fxLayoutAlign="center center">
            <app-dynamic [groupName]="group" [scenarioName]="scenario"></app-dynamic>
          </div>
          <div fxFlex="25%" class="input-row">
            <app-inputs [groupName]="group" [scenarioName]="scenario"></app-inputs>
          </div>
        </div>
      </content>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  preserveWhitespaces: false
})
export class AppComponent {
  scenarios = scenarios;
  group = 'Notice';
  scenario = 'basic notice';
}
