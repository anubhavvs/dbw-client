import axios from 'axios';
import { URL } from '../config';
import {
  ADMIN_LOGS_FAIL,
  ADMIN_LOGS_REQUEST,
  ADMIN_LOGS_SUCCESS,
  ALL_USERS_LIST_FAIL,
  ALL_USERS_LIST_REQUEST,
  ALL_USERS_LIST_SUCCESS,
} from '../constants/adminConstants';

export const getLogs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LOGS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/admin/logs`, config);

    dispatch({
      type: ADMIN_LOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_USERS_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/admin/allUsers`, config);

    dispatch({
      type: ALL_USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
