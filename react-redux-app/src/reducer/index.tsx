import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootRucer = combineReducers({
  counter,
  todos,
});

export default rootRucer;

export type RootState = ReturnType<typeof rootRucer>;
