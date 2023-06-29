import {
  COMPANY_LOGIN_FAIL,
  COMPANY_LOGIN_REQUEST,
  COMPANY_LOGIN_SUCCESS,
  COMPANY_LOGOUT,
  COMPANY_PROFILE_DELETE_FAIL,
  COMPANY_PROFILE_DELETE_REQUEST,
  COMPANY_PROFILE_DELETE_RESET,
  COMPANY_PROFILE_DELETE_SUCCESS,
  COMPANY_PROFILE_FAIL,
  COMPANY_PROFILE_REQUEST,
  COMPANY_PROFILE_RESET,
  COMPANY_PROFILE_SUCCESS,
  COMPANY_PROFILE_UPDATE_FAIL,
  COMPANY_PROFILE_UPDATE_REQUEST,
  COMPANY_PROFILE_UPDATE_RESET,
  COMPANY_PROFILE_UPDATE_SUCCESS,
  COMPANY_SYSTEMS_FAIL,
  COMPANY_SYSTEMS_REQUEST,
  COMPANY_SYSTEMS_RESET,
  COMPANY_SYSTEMS_SUCCESS,
} from '../constants/companyConstants';

export const companyLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_LOGIN_REQUEST:
      return { loading: true };
    case COMPANY_LOGIN_SUCCESS:
      return { loading: false, companyInfo: action.payload };
    case COMPANY_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const companyProfileReducer = (state = { company: {} }, action) => {
  switch (action.type) {
    case COMPANY_PROFILE_REQUEST:
      return { ...state, loading: true };
    case COMPANY_PROFILE_SUCCESS:
      return { loading: false, company: action.payload };
    case COMPANY_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_PROFILE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const companySystemsReducer = (state = { systems: [] }, action) => {
  switch (action.type) {
    case COMPANY_SYSTEMS_REQUEST:
      return { loading: true };
    case COMPANY_SYSTEMS_SUCCESS:
      return { loading: false, systems: action.payload, success: true };
    case COMPANY_SYSTEMS_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_SYSTEMS_RESET:
      return { customer: [] };
    default:
      return state;
  }
};

export const companyProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case COMPANY_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case COMPANY_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_PROFILE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const companyProfileDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_PROFILE_DELETE_REQUEST:
      return { loading: true };
    case COMPANY_PROFILE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_PROFILE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_PROFILE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
