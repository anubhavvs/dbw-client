import axios from 'axios';
import { URL } from '../config';
import {
  COMPANY_LOGIN_FAIL,
  COMPANY_LOGIN_REQUEST,
  COMPANY_LOGIN_SUCCESS,
  COMPANY_PROFILE_DELETE_FAIL,
  COMPANY_PROFILE_DELETE_REQUEST,
  COMPANY_PROFILE_DELETE_SUCCESS,
  COMPANY_PROFILE_FAIL,
  COMPANY_PROFILE_REQUEST,
  COMPANY_PROFILE_SUCCESS,
  COMPANY_PROFILE_UPDATE_FAIL,
  COMPANY_PROFILE_UPDATE_REQUEST,
  COMPANY_PROFILE_UPDATE_SUCCESS,
  COMPANY_REGISTER_FAIL,
  COMPANY_REGISTER_REQUEST,
  COMPANY_REGISTER_SUCCESS,
  COMPANY_SYSTEMS_FAIL,
  COMPANY_SYSTEMS_REQUEST,
  COMPANY_SYSTEMS_SUCCESS,
} from '../constants/companyConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: COMPANY_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${URL}/company/login`,
      { email, password },
      config
    );

    dispatch({
      type: COMPANY_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('companyInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: COMPANY_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (name, email, password, website, location, description) =>
  async (dispatch) => {
    try {
      dispatch({
        type: COMPANY_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${URL}/company/register`,
        { name, email, password, website, location, description },
        config
      );

      dispatch({
        type: COMPANY_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: COMPANY_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('companyInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: COMPANY_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCompanyProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_PROFILE_REQUEST,
    });

    const {
      companyLogin: { companyInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${companyInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/company/profile`, config);

    dispatch({
      type: COMPANY_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCompanySystems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_SYSTEMS_REQUEST });

    const {
      companyLogin: { companyInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${companyInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/company`, config);

    dispatch({
      type: COMPANY_SYSTEMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_SYSTEMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCompanyProfile = (company) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_PROFILE_UPDATE_REQUEST });

    const {
      companyLogin: { companyInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${companyInfo.token}`,
      },
    };

    const { data } = await axios.put(`${URL}/company/profile`, company, config);

    dispatch({
      type: COMPANY_PROFILE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCompanyProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_PROFILE_DELETE_REQUEST });

    const {
      companyLogin: { companyInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${companyInfo.token}`,
      },
    };

    const { data } = await axios.delete(`${URL}/company/profile`, config);

    dispatch({
      type: COMPANY_PROFILE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_PROFILE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
