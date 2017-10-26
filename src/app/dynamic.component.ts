import { Component, Input, ViewContainerRef, Compiler, OnInit, ReflectiveInjector } from '@angular/core';
import { scenarios } from '../assets/scenarios';
import { transposeContext } from '../../lib';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dynamic',
  template: `
    <ng-content></ng-content>
  `
})
export class DynamicComponent implements OnInit {

  @Input() groupName;
  @Input() scenarioName;

  private instance;

  constructor(
    private store: Store<any>,
    private vcRef: ViewContainerRef,
    private compiler: Compiler) {

    this.store.select('app').subscribe(state => {
      if (this.instance) {
        Object.assign(this.instance.instance, state.inputs);
      }
    });
  }

  ngOnInit() {
    const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
    const group = scenarios.find(s => s.name === this.groupName);
    const scenario = group.scenarios.find(s => s.name === this.scenarioName);
    this.compiler.compileModuleAndAllComponentsAsync<any>(group.module).then((factory) => {
      const component = factory.componentFactories.find(c => c.componentType === scenario.component);
      this.instance = this.vcRef.createComponent(component, 0, injector);
      Object.assign(this.instance.instance, transposeContext(scenario));
    });
  }

}
