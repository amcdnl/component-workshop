import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { AppActions, AppActionTypes } from './app.actions';

const initalState = { inputs: [] };
export function appReducer(state = initalState, action: AppActions) {
  switch (action.type) {
    case AppActionTypes.LOAD_COMPONENT:
      return state;
    case AppActionTypes.UPDATE_COMPONENT:
      state.inputs = { ...action.payload };
      return state;
  }
}

export const reducers: ActionReducerMap<any> = {
  app: appReducer
};
