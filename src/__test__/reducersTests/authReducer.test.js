import { authReducer } from '../../reducers/authReducer';
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
} from '../../actions/types';

const initialState = { isLoggedIn: false, isRequesting: false, userData: {} };

describe('Auth reducer test', () => {
  it('should return the initial state', () => {
    expect(initialState).toEqual(authReducer(undefined, {}));
  });

  it('should handle SIGN_UP_USER_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: SIGN_UP_USER_REQUEST,
      }),
    ).toEqual({ ...initialState, isRequesting: true });
  });

  it('should handle SIGN_UP_USER_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: SIGN_UP_USER_SUCCESS,
        user: { fullname: 'ezenwa' },
      }),
    ).toEqual({
      ...initialState,
      isRequesting: false,
      isLoggedIn: true,
      userData: { fullname: 'ezenwa' },
    });
  });

  it('should handle SIGN_UP_USER_FAILURE', () => {
    expect(
      authReducer(initialState, { type: SIGN_UP_USER_FAILURE, error: 'Email already taken' }),
    ).toEqual({ ...initialState, errorMessage: 'Email already taken' });
  });

  it('should handle SIGN_IN_USER_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: SIGN_IN_USER_REQUEST,
      }),
    ).toEqual({ ...initialState, isRequesting: true });
  });

  it('should handle SIGN_IN_USER_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: SIGN_IN_USER_SUCCESS,
        user: { fullname: 'ezenwa' },
      }),
    ).toEqual({
      ...initialState,
      isRequesting: false,
      isLoggedIn: true,
      userData: { fullname: 'ezenwa' },
    });
  });

  it('should handle SIGN_IN_USER_FAILURE', () => {
    expect(
      authReducer(initialState, {
        type: SIGN_IN_USER_FAILURE,
        error: 'Invalid username or password',
      }),
    ).toEqual({
      ...initialState,
      isLoggedIn: false,
      isRequesting: false,
      errorMessage: 'Invalid username or password',
    });
  });

  it('should handle AUTHENTICATION REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: AUTHENTICATION_REQUEST,
      }),
    ).toEqual({ ...initialState, isRequesting: true });
  });

  it('should handle AUTHENTICATION_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: AUTHENTICATION_SUCCESS,
        user: { fullname: 'ezenwa' },
      }),
    ).toEqual({
      ...initialState,
      isRequesting: false,
      isLoggedIn: true,
      userData: { fullname: 'ezenwa' },
    });
  });

  it('should handle AUTHENTICATION_FAILURE', () => {
    expect(
      authReducer(initialState, {
        type: AUTHENTICATION_FAILURE,
      }),
    ).toEqual({ ...initialState });
  });

  it('should handle SIGN_OUT_USER', () => {
    expect(authReducer(initialState, { type: SIGN_OUT_USER })).toEqual({ ...initialState });
  });

  it('should handle UPDATE_PHONE_NO_FAILURE', () => {
    expect(
      authReducer(initialState, { type: UPDATE_PHONE_NO_FAILURE, error: 'Invalid phone number' }),
    ).toEqual({ ...initialState, errorMessage: 'Invalid phone number' });
  });

  it('should handle UPDATE_PHONE_NO_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: UPDATE_PHONE_NO_SUCCESS,
        user: { fullname: 'ezenwa' },
      }),
    ).toEqual({
      ...initialState,
      userData: { fullname: 'ezenwa' },
    });
  });
});
