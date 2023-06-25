import {
  SYSTEM_LIST_SUCCESS,
  SYSTEM_LIST_REQUEST,
  SYSTEM_LIST_FAIL,
  SYSTEM_LIST_RESET,
} from '../constants/systemConstants';

export const allSystemListReducer = (state = { systems: [] }, action) => {
  switch (action.type) {
    case SYSTEM_LIST_REQUEST:
      return { loading: true };
    case SYSTEM_LIST_SUCCESS:
      return { loading: false, systems: action.payload };
    case SYSTEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    case SYSTEM_LIST_RESET:
      return { systems: [] };
    default:
      return state;
  }
};
