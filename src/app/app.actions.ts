import { Action } from '@ngrx/store';

export const enum AppActionTypes {
  LOAD_COMPONENT = '[App] Load Component',
  UPDATE_COMPONENT = '[App] Update Inputs'
}

export class LoadComponent implements Action {
  readonly type: AppActionTypes.LOAD_COMPONENT = AppActionTypes.LOAD_COMPONENT;
}

export class UpdateComponent implements Action {
  readonly type: AppActionTypes.UPDATE_COMPONENT = AppActionTypes.UPDATE_COMPONENT;
  constructor(public payload: any) { }
}

export type AppActions =
  LoadComponent | UpdateComponent;
