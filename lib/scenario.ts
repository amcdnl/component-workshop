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
  context?: any; // {k: string, v: ContextOptions|string|number|object|Function};
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

function dashCase(name: string) {
  return name.toLowerCase().split(' ').join('-');
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
function transposeContext(context) {
  const isProp = context.hasOwnProperty('value');
  if (isProp) {
    return context.value;
  } else {
    return context;
  }
}

/**
 * Top level scenarios group.
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
    route: dashCase(name),
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
    selector: dashCase(name),
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

  const context = options.context ?
    Object.keys(options.context).map(k => {
      const prop = options.context[k];
      return { name: k, description: prop.description, value: transposeContext(prop) };
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

  const outputs = [];
  if (meta && meta.outputs) {
    for (const m in meta.outputs) {
      outputs.push({
        name: m,
        ...meta.outputs[m]
      });
    }
  }
  /* tslint:enable */

  return {
    name,
    route: dashCase(name),
    component,
    inputs,
    outputs,
    context
  };
}
