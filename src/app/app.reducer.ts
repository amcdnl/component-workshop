import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { ScenarioActions, ScenarioActionTypes } from './scenario.actions';

const initalState = { inputs: {}, context: {} };

export function scenariosReducer(state = initalState, action: ScenarioActions) {
  switch (action.type) {
    case ScenarioActionTypes.LOAD_COMPONENT:
      return state;
    case ScenarioActionTypes.UPDATE_COMPONENT:
      const inputs = {...state.inputs};
      Object.assign(inputs, action.payload);
      state.inputs = inputs;
      return state;
  }
}

export const reducers: ActionReducerMap<any> = {
  scenarios: scenariosReducer
};
