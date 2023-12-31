import {
  PROJECT_LIST_FAIL,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_REQUEST,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_LIST_RESET,
  PROJECT_CREATE_RESET,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_RESET,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_RESET,
  PROJECT_DETAIL_REQUEST,
  PROJECT_DETAIL_SUCCESS,
  PROJECT_DETAIL_FAIL,
  PROJECT_DETAIL_RESET,
  PROJECT_REPORT_REQUEST,
  PROJECT_REPORT_SUCCESS,
  PROJECT_REPORT_FAIL,
  PROJECT_REPORT_RESET,
} from '../constants/projectConstants';

export const projectListReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true };
    case PROJECT_LIST_SUCCESS:
      return { loading: false, projects: action.payload, success: true };
    case PROJECT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_LIST_RESET:
      return { customer: [] };
    default:
      return state;
  }
};

export const projectCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_CREATE_REQUEST:
      return { loading: true };
    case PROJECT_CREATE_SUCCESS:
      return { loading: false, project: action.payload, success: true };
    case PROJECT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_CREATE_RESET:
      return { project: {} };
    default:
      return state;
  }
};

export const projectUpdateReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQUEST:
      return { loading: true };
    case PROJECT_UPDATE_SUCCESS:
      return { loading: false, project: action.payload, success: true };
    case PROJECT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_UPDATE_RESET:
      return { project: {} };
    default:
      return state;
  }
};

export const projectDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_DELETE_REQUEST:
      return { loading: true };
    case PROJECT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_DELETE_RESET:
      return { project: {} };
    default:
      return state;
  }
};

export const projectDetailReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_DETAIL_REQUEST:
      return { ...state, loading: true };
    case PROJECT_DETAIL_SUCCESS:
      return { loading: false, project: action.payload };
    case PROJECT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_DETAIL_RESET:
      return { project: {} };
    default:
      return state;
  }
};

export const projectReportReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_REPORT_REQUEST:
      return { ...state, loading: true };
    case PROJECT_REPORT_SUCCESS:
      return { loading: false, url: action.payload, success: true };
    case PROJECT_REPORT_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_REPORT_RESET:
      return { project: {} };
    default:
      return state;
  }
};
