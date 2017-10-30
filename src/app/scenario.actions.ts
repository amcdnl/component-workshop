import { Action } from '@ngrx/store';

export const enum ScenarioActionTypes {
  LOAD_COMPONENT = '[Scenario] Load Component',
  UPDATE_COMPONENT = '[Scenario] Update Inputs',
  UPDATE_CONTEXT = '[Scenario] Update Context',
  OUTPUT_EMITTED = '[Scenario] Output Emitted'
}

export class LoadComponent implements Action {
  readonly type: ScenarioActionTypes.LOAD_COMPONENT = ScenarioActionTypes.LOAD_COMPONENT;
}

export class UpdateComponent implements Action {
  readonly type: ScenarioActionTypes.UPDATE_COMPONENT = ScenarioActionTypes.UPDATE_COMPONENT;
  constructor(public payload: any) { }
}

export class UpdateContext implements Action {
  readonly type: ScenarioActionTypes.UPDATE_CONTEXT = ScenarioActionTypes.UPDATE_CONTEXT;
  constructor(public payload: any) { }
}

export class OutputEmitted implements Action {
  readonly type: ScenarioActionTypes.OUTPUT_EMITTED = ScenarioActionTypes.OUTPUT_EMITTED;
  constructor(public payload: any) { }
}

export type ScenarioActions =
  LoadComponent | UpdateComponent | UpdateContext | OutputEmitted;
