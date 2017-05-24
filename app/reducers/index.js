import { combineReducers } from 'redux';
import user from './user';
import spinner from './spinner';

const reducers = combineReducers({
  user,
  spinner,
});

export default reducers;
