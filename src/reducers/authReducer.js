import {
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_FAILURE,
  SIGN_UP_USER_SUCCESS,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_SUCCESS,
  SIGN_OUT_USER,
  UPDATE_PHONE_NO_FAILURE,
  UPDATE_PHONE_NO_SUCCESS,
} from '../actions/types';

export const initialState = { isLoggedIn: false, isRequesting: false, userData: {} };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_USER_REQUEST:
      return { ...state, isRequesting: true };
    case SIGN_UP_USER_FAILURE:
      return { ...state, isRequesting: false, errorMessage: action.error };
    case SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isRequesting: false,
        userData: action.user,
      };
    case SIGN_IN_USER_REQUEST:
      return { ...state, isRequesting: true };
    case SIGN_IN_USER_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isRequesting: false,
        errorMessage: action.error,
      };
    case SIGN_IN_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isRequesting: false,
        userData: action.user,
      };
    case SIGN_OUT_USER:
      return { ...state, isLoggedIn: false };
    case AUTHENTICATION_REQUEST:
      return { ...state, isRequesting: true };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isRequesting: false,
        userData: action.user,
      };
    case AUTHENTICATION_FAILURE:
      return { ...state, isRequesting: false, isLoggedIn: false };
    case UPDATE_PHONE_NO_FAILURE:
      state.errorMessage = action.error;
      return state;
    case UPDATE_PHONE_NO_SUCCESS:
      state.userData = action.user;
      return state;
    default:
      return state;
  }
};
