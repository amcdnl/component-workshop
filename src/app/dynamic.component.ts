import { Component, Input, ViewContainerRef, Compiler, OnInit, ReflectiveInjector } from '@angular/core';
import { scenarios } from '../assets/scenarios';

@Component({
  selector: 'app-dynamic',
  template: `
    <ng-content></ng-content>
  `
})
export class DynamicComponent implements OnInit {

  @Input() group;
  @Input() scenario;

  constructor(
    private vcRef: ViewContainerRef,
    private compiler: Compiler) { }

  ngOnInit() {
    const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
    const group = scenarios.find(s => s.name === this.group);
    const scenario = group.scenarios.find(s => s.name === this.scenario);
    this.compiler.compileModuleAndAllComponentsAsync<any>(group.module).then((factory) => {
      const component = factory.componentFactories.find(c => c.componentType === scenario.component);
      const inst = this.vcRef.createComponent(component, 0, injector);
    });
  }

}
