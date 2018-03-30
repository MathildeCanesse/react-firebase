import assign from 'lodash/assign';

import { combineReducers } from 'redux';

import usersReducer from './users';
import chatReducer from './chat';

const allReducers = combineReducers(
  assign(usersReducer, chatReducer)
);

export default allReducers;