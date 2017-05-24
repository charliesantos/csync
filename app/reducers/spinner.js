import { TOGGLE_SPINNER } from '../actions/spinner';

const initialState = { isShowing: false };

const spinner = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SPINNER:
      return Object.assign({}, state, {
        isShowing: action.isShowing
      });
    default:
      return state;
  }
};

export default spinner;
