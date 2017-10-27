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
  route: string;
  scenarios: ScenarioResults[];
  add: (name: string, options: ScenarioOptions) => ScenariosResults;
}

export interface ScenarioResults {
  component: any;
  name: string;
  inputs: any[];
  outputs: any[];
  context: any;
  route: string;
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
  value?: any;
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
 * Maps and tranposes values to the context object
 */
export function transposeContext(context) {
  const newContext = {};
  /* tslint:disable */
  if (context) {
    for (const k in context) {
      const v = context[k];
      const isProp = v.hasOwnProperty('type') &&
                     v.hasOwnProperty('value');

      if (isProp) {
        newContext[k] = v.value;
      } else {
        newContext[k] = context[k];
      }
    }
  }
  /* tslint:enable */
  return newContext;
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
    route: name.toLowerCase().split(' ').join('-'),
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

  /* tslint:disable */
  // transpose inputs to component
  if (options.inputs) {
    for (const k in options.inputs) {
      const v = options.inputs[k];
      (<any>component).child[k] = v.value;
    }
  }

  const inputs = options.inputs ?
    Object.keys(options.inputs).map(k => {
      return { ...options.inputs[k], name: k };
    }) : [];

  const outputs = options.outputs ?
    Object.keys(options.outputs).map(k => {
      return { ...options.outputs[k], name: k };
    }) : [];

  const meta = metadata.find(m => m.component === options.component.name);
  if (meta && meta.inputs) {
    for (const m in meta.inputs) {
      inputs.push({
        name: m,
        ...meta.inputs[m]
      });
    }
  }
  /* tslint:enable */

  return {
    name,
    route: name.toLowerCase().split(' ').join('-'),
    component,
    inputs,
    outputs,
    context: options.context
  };
}
