import axios from 'axios';
import {
  SYSTEM_LIST_REQUEST,
  SYSTEM_LIST_SUCCESS,
  SYSTEM_LIST_FAIL,
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
