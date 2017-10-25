import { Component } from '@angular/core';
import { metadata } from '../assets/meta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  metadata = metadata;
}
