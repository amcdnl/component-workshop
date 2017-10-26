# component-workshop
Component workshop is a interactive component library.

See the [spec here](https://docs.google.com/document/d/1RHDUny30x5V8-1-XrmFjnddxg-yKZsDcRJqtQTCxvLw/edit#).

### DSL
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
  .add('Button', {
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
     * Outputs would override defaults provided by TypeScript metadata
     */
    outputs: {
      click: {
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
  })

  /**
   * Have the ability to extend a component that
   * might be a slightly different variation of another
   */
  .extend('Raised Button', {
    template: `
      <button mat-raised-button 
              [color]="primary" 
              (click)="onClick()">
        {{text}}
      </button>
    `
  })
  ```