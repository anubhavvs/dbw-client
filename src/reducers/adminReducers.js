import {
  ADMIN_LOGS_FAIL,
  ADMIN_LOGS_REQUEST,
  ADMIN_LOGS_RESET,
  ADMIN_LOGS_SUCCESS,
  ALL_USERS_LIST_FAIL,
  ALL_USERS_LIST_REQUEST,
  ALL_USERS_LIST_RESET,
  ALL_USERS_LIST_SUCCESS,
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

export const listAllUsers = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_LIST_REQUEST:
      return { loading: true };
    case ALL_USERS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case ALL_USERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ALL_USERS_LIST_RESET:
      return { logs: [] };
    default:
      return state;
  }
};
