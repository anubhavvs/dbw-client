import {
  ADMIN_LOGS_FAIL,
  ADMIN_LOGS_REQUEST,
  ADMIN_LOGS_RESET,
  ADMIN_LOGS_SUCCESS,
} from '../constants/adminConstants';

export const logsReducer = (state = { logs: [] }, action) => {
  switch (action.type) {
    case ADMIN_LOGS_REQUEST:
      return { loading: true };
    case ADMIN_LOGS_SUCCESS:
      return { loading: false, logs: action.payload };
    case ADMIN_LOGS_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOGS_RESET:
      return { logs: [] };
    default:
      return state;
  }
};
