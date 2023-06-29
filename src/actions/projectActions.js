import axios from 'axios';
import {
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_DETAIL_REQUEST,
  PROJECT_DETAIL_SUCCESS,
  PROJECT_DETAIL_FAIL,
  PROJECT_REPORT_REQUEST,
  PROJECT_REPORT_SUCCESS,
  PROJECT_REPORT_FAIL,
} from '../constants/projectConstants';
import { URL } from '../config';

export const listProjects = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/project`, config);

    dispatch({
      type: PROJECT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProject =
  (name, description) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECT_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${URL}/project`,
        { name, description },
        config
      );

      dispatch({
        type: PROJECT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROJECT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${URL}/project/${project._id}`,
      project,
      config
    );

    dispatch({
      type: PROJECT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${URL}/project/${id}`, config);

    dispatch({
      type: PROJECT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProjectDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_DETAIL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/project/${id}`, config);

    dispatch({
      type: PROJECT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getprojectReport = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_REPORT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${URL}/project/${id}`, {}, config);

    dispatch({
      type: PROJECT_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_REPORT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
