import { Component, Input, ViewContainerRef, Compiler, OnInit, ReflectiveInjector } from '@angular/core';
import { transposeContext } from '../../lib';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dynamic',
  template: `
    <ng-content></ng-content>
  `
})
export class DynamicComponent implements OnInit {

  @Input() scenario;
  @Input() group;

  private instance;

  constructor(
    private store: Store<any>,
    private vcRef: ViewContainerRef,
    private compiler: Compiler) {}

  ngOnInit() {
    this.loadScenario();
    this.store.select('scenarios').subscribe(state => {
      if (this.instance) {
        Object.assign(this.instance.instance, state.context);
        Object.assign(this.instance.instance.child, state.inputs);
      }
    });
  }

  loadScenario() {
    const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
    this.compiler.compileModuleAndAllComponentsAsync<any>(this.group.module).then((factory) => {
      const component = factory.componentFactories.find(c => c.componentType === this.scenario.component);
      this.instance = this.vcRef.createComponent(component, 0, injector);
      Object.assign(this.instance.instance, transposeContext(this.scenario.context));
    });
  }

}
