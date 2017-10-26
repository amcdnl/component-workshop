import { NgModule, Component, ViewChild } from '@angular/core';

export const scenarios = [];
let metadata = [];

export interface ScenariosOptions {
  imports?: any[];
  providers?: any[];
  declarations?: any[];
}

export interface ScenariosResults {
  name: string;
  module: any;
  scenarios: ScenarioResults[];
  add: (name: string, options: ScenarioOptions) => ScenariosResults;
}

export interface ScenarioResults {
  component: any;
  name: string;
  inputs: any[];
  outputs: any[];
}

export interface ScenarioOptions {
  component: any;
  template: string;
  inputs?: {k: string, v: InputOptions};
  outputs?: {k: string, v: OutputOptions };
  context?: any; // {k: string, v: ContextOptions|string|number|object|Function};
}

export interface OutputOptions {
  description: string;
}

export interface InputOptions {
  description?: string;
  default?: any;
  control?: string;
}

export interface ContextOptions {
  type?: string;
  control?: string;
  value: string|number|object|Function;
}

/**
 * Register the metadata globally
 */
export function registerMetadata(metas) {
  metadata = metas;
}

/**
 * Top level scenarios container.
 *
 * Example:
 *    scenario('button', { ... })
 *
 */
export function scenario(name: string, options: ScenariosOptions): ScenariosResults {
  const declarations = [];

  if (options.declarations) {
    declarations.push(...options.declarations);
  }

  const module = NgModule({
    imports: options.imports,
    providers: options.providers,
    declarations
  })(class T { });

  const inst = {
    name,
    module,
    scenarios: [],
    add: (n: string, o: ScenarioOptions) => {
      const comp = addScenario(n, o);
      declarations.push(comp.component);
      inst.scenarios.push(comp);
      return inst;
    }
  };

  scenarios.push(inst);
  return inst;
}

/**
 * Creates a scenario.
 *
 * Example:
 *    scenario(...).add('raised button, { ... });
 */
function addScenario(name: string, options: ScenarioOptions): ScenarioResults {
  class T {
    @ViewChild(options.component) child;
  }
  const component = Component({
    selector: name.split(' ').join('-'),
    template: options.template
  })(T);

  const context = {};

  /* tslint:disable */
  // transpose context to context
  if (options.context) {
    for (const k in options.context) {
      const v = options.context[k];
      const isProp = v.hasOwnProperty('type') &&
                     v.hasOwnProperty('value');

      if (isProp) {
        context[k] = v.value;
      } else {
        context[k] = options.context[k];
      }
    }

    // project the local context onto the component
    Object.assign(component, context);
  }

  // transpose inputs to component
  if (options.inputs) {
    for (const k in options.inputs) {
      const v = options.inputs[k];
      (<any>component).child[k] = v.default;
    }
  }
  /* tslint:enable */

  const inputs = options.inputs ?
    Object.keys(options.inputs).map(k => {
      return { ...options.inputs[k], name: k };
    }) : [];

  const outputs = options.outputs ?
    Object.keys(options.outputs).map(k => {
      return { ...options.outputs[k], name: k };
    }) : [];

  return {
    name,
    component,
      // TODO: Mesh metadata inputs & context here too
    inputs,
    // TODO: Mesh metadata outputs here too
    outputs,
  };
}
