import assign from 'lodash/assign';

import { combineReducers } from 'redux';

import usersReducer from './UsersReducer';
import chatReducer from './ChatReducer';

const allReducers = combineReducers(
  assign(usersReducer, chatReducer)
);

export default allReducers;