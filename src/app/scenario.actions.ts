import { Action } from '@ngrx/store';

export const enum ScenarioActionTypes {
  LOAD_COMPONENT = '[Scenario] Load Component',
  UPDATE_COMPONENT = '[Scenario] Update Inputs'
}

export class LoadComponent implements Action {
  readonly type: ScenarioActionTypes.LOAD_COMPONENT = ScenarioActionTypes.LOAD_COMPONENT;
}

export class UpdateComponent implements Action {
  readonly type: ScenarioActionTypes.UPDATE_COMPONENT = ScenarioActionTypes.UPDATE_COMPONENT;
  constructor(public payload: any) { }
}

export type ScenarioActions =
  LoadComponent | UpdateComponent;
