import { Component, ViewEncapsulation } from '@angular/core';
import { scenarios } from '../assets/scenarios';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav class="sidenav-nav">
        <ul>
          <li *ngFor="let group of scenarios">
            <h3>{{group.name}}</h3>
            <ul>
              <li *ngFor="let scenario of group.scenarios">
                <a routerLink="/{{group.route}}/{{scenario.route}}">{{scenario.name}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </mat-sidenav>
      <div fxLayout="column" fxFlexFill>
        <nav fxFlex="64px">
          <mat-toolbar color="primary" class="primary-toolbar" fxLayout="row">
            <button type="button" class="menu-btn" mat-icon-button (click)="sidenav.open()">
              <mat-icon>menu</mat-icon>
            </button>
            <div fxFlex fxFlexFill fxFlexOffset="20px">
              <h1>Component Workshop</h1>
            </div>
          </mat-toolbar>
        </nav>
        <content fxFlex>
          <router-outlet></router-outlet>
        </content>
      </div>
    </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class AppComponent {
  scenarios = scenarios;
  group = 'Notice';
  scenario = 'basic notice';
}
