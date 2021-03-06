import * as types from '../actions/actionTypes';
import initialState from './initialState';

// Perils of having a nested tree strucutre in the Redux State XD XD XD 
export default function oracleReducer(state = initialState.oracle, action) {
  switch (action.type) {
    case types.TOGGLE_LOADER:
      return Object.assign({}, state, { loaderState: !state.loaderState })
    case types.TOGGLE_FILTER_LOADER:
      return Object.assign({}, state, { filterLoaderState: !state.filterLoaderState })
    default:
      return state;
  }
}
