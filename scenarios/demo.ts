import { scenario } from '../lib';
import { NoticeComponent, TestModule } from '../tests';

scenario('Notice', {
    imports: [TestModule]
  })
  .add('basic notice', {
    component: NoticeComponent,
    context: {
      text: 'hello'
    },
    template: `<app-notice>{{text}}</app-notice>`
  });
