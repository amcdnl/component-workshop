import { scenario } from '../lib';
import { MatButtonModule, MatButton } from '@angular/material';

scenario('Button', {
    imports: [MatButtonModule]
  })
  .add('basic button', {
    component: MatButton,
    context: {
      text: 'hello'
    },
    template: `<button mat-button>{{text}}</button>`
  });
