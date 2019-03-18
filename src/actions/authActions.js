import {
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_SUCCESS,
  SIGN_OUT_USER,
  UPDATE_PHONE_NO_FAILURE,
  UPDATE_PHONE_NO_SUCCESS,
} from './types';
import Utils from '../utils';
import history from '../history';

const { sendHttpRequest } = Utils;

const signUpUser = data => async (dispatch) => {
  dispatch({ type: SIGN_UP_USER_REQUEST });
  try {
    const responseData = await sendHttpRequest('/auth/signup', 'POST', data);
    dispatch({
      type: SIGN_UP_USER_SUCCESS,
      user: responseData.user,
    });

    localStorage.setItem('token', responseData.token);
  } catch (error) {
    dispatch({ type: SIGN_UP_USER_FAILURE, error: error.response.data.message });
  }
};

const signInUser = data => async (dispatch) => {
  dispatch({ type: SIGN_IN_USER_REQUEST });
  try {
    const responseData = await sendHttpRequest('/auth/signin', 'POST', data);

    dispatch({
      type: SIGN_IN_USER_SUCCESS,
      user: responseData.user,
    });
    localStorage.setItem('token', responseData.token);
  } catch (error) {
    dispatch({ type: SIGN_IN_USER_FAILURE, error: error.response.data.message });
  }
};

const signOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  history.push('/');
  dispatch({ type: SIGN_OUT_USER });
};

const authenticateUser = token => async (dispatch) => {
  if (!token) {
    dispatch({ type: AUTHENTICATION_FAILURE });
    return;
  }
  dispatch({ type: AUTHENTICATION_REQUEST });
  try {
    const responseData = await sendHttpRequest('/user', 'GET');
    dispatch({
      type: AUTHENTICATION_SUCCESS,
      user: responseData,
    });
  } catch (error) {
    dispatch({ type: AUTHENTICATION_FAILURE });
  }
};

const updatePhoneNo = payload => async (dispatch) => {
  try {
    const responseData = await sendHttpRequest('/user/updatePhoneNo', 'PUT', payload);
    dispatch({ type: UPDATE_PHONE_NO_SUCCESS, user: responseData });
  } catch ({ response }) {
    dispatch({ type: UPDATE_PHONE_NO_FAILURE, error: response.data.message });
  }
};

export {
  signUpUser, signInUser, signOutUser, authenticateUser, updatePhoneNo,
};
