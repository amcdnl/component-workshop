# component-workshop
Component workshop is a interactive component library.

See the [spec here](https://docs.google.com/document/d/1RHDUny30x5V8-1-XrmFjnddxg-yKZsDcRJqtQTCxvLw/edit#).

### DSL
#### Concept 1
```javascript
/**
 * Define a group of scenarios with their metadata information
 */
scenario('Button Variations', {
    imports: [ButtonModule]
  })

  /**
   * Add a scenario to this group of scenarios
   */
  .add('Basic Button', {
    /**
     * Class of the component to get metadata lookup from
     */
    component: ButtonComponent,

    /**
     * Inputs would override defaults provided by TypeScript metadata
     */
    inputs: {
      color: {
        default: 'white',
        control: 'colorpicker',
        description: 'Override the default jsdoc'
      }
    },

    /**
     * Context is anything used inside the template that
     * isn't nescarrily bound to a input (but can be).
     */
    context: {
      text: {
        type: 'string',
        control: 'textbox',
        value: 'Hello'
      },
      primary: 'blue',
      onClick: () => { console.log('here') }
    },

    /**
     * The markup for the scenario
     */
    template: `
      <button mat-button 
              [color]="primary" 
              (click)="onClick()">
        {{text}}
      </button>
    `
  });
  ```

#### Concept 2
```javascript
@Module({
  imports: [MatButtonModule],
  declarations: [BasicButtonComponent]
}) 
export class ButtonTestModule {}

@Component({
  template: `<button mat-button>{{text}}</button>`
})
export class BasicButtonComponent implements Scenario {
  @ViewChild(MatButton) child;
  text = 'Hi';
}

scenario('Button')
  .add('Basic Button', {
    component: BasicButtonComponent,
    context: {
      text: {
        description: 'Text inside the button'
      }
    }
  })
```

#### Concept 3
```javascript
@Module({
  imports: [MatButtonModule],
  declarations: [BasicButtonComponent]
}) 
export class ButtonTestModule {}

@Scenario({
  group: 'Button',
  name: 'Baisc Button',
  context: {
    text: {
      description: 'Text inside the button'
    }
  }
})
@Component({
  template: `<button mat-button>{{text}}</button>`
})
export class BasicButtonComponent implements Scenario {
  @ViewChild(MatButton) child;
  text = 'Hi';
}
```