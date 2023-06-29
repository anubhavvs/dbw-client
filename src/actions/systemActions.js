import axios from 'axios';
import {
  SYSTEM_LIST_REQUEST,
  SYSTEM_LIST_SUCCESS,
  SYSTEM_LIST_FAIL,
  SYSTEM_CREATE_REQUEST,
  SYSTEM_CREATE_SUCCESS,
  SYSTEM_CREATE_FAIL,
  SYSTEM_UPDATE_REQUEST,
  SYSTEM_UPDATE_SUCCESS,
  SYSTEM_UPDATE_FAIL,
  SYSTEM_DELETE_REQUEST,
  SYSTEM_DELETE_SUCCESS,
  SYSTEM_DELETE_FAIL,
} from '../constants/systemConstants';
import { URL } from '../config';

export const listSystems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SYSTEM_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/system`, config);

    dispatch({
      type: SYSTEM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SYSTEM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSystems =
  (name, description, cellType, capacity, efficiency, warrantyYears) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SYSTEM_CREATE_REQUEST });

      const {
        companyLogin: { companyInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${companyInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${URL}/system`,
        { name, description, cellType, capacity, efficiency, warrantyYears },
        config
      );

      dispatch({
        type: SYSTEM_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SYSTEM_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateSystem =
  ({
    system_id,
    name,
    description,
    cellType,
    capacity,
    efficiency,
    warrantyYears,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SYSTEM_UPDATE_REQUEST });

      const {
        companyLogin: { companyInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${companyInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${URL}/system/${system_id}`,
        { name, description, cellType, capacity, efficiency, warrantyYears },
        config
      );

      dispatch({
        type: SYSTEM_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SYSTEM_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteSystem = (system_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SYSTEM_DELETE_REQUEST });

    const {
      companyLogin: { companyInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${companyInfo.token}`,
      },
    };

    const { data } = await axios.delete(`${URL}/system/${system_id}`, config);

    dispatch({
      type: SYSTEM_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SYSTEM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
