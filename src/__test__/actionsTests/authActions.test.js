import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {
  signInUser,
  authenticateUser,
  signOutUser,
  updatePhoneNo,
  signUpUser,
} from '../../actions/authActions';
import Utils, { apiInstance } from '../../utils';
import {
  SIGN_UP_USER_FAILURE,
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  UPDATE_PHONE_NO_FAILURE,
  UPDATE_PHONE_NO_SUCCESS,
  SIGN_OUT_USER,
} from '../../actions/types';

const mock = new MockAdapter(apiInstance);

const mockStore = configureMockStore([thunk]);
const store = mockStore();
const { httpRequest } = Utils;

const validLoginData = {
  email: 'ezenwaclement2@gmail.com',
  password: 'ozone4real',
};

const invalidLoginData = {
  email: 'ajanakun@gmail.com',
  password: 'ozone4real',
};

const validSignupData = {
  email: 'ezenwaclement2@gmail.com',
  password: 'ozone4real',
  phoneno: '08140064376',
  fullname: 'Ezenwa Clement',
};

const invalidSignupData = {
  email: 'ezenwaogbonna1@gmail.com',
  password: 'ozone4real',
  phoneno: '08140064376',
  fullname: 'Ezenwa Ogbonna',
};

const mockUserPayload = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMGZjMTBhMS0xMTU4LTRmMzgtOTlhYi0zODQzNjU0ZmU3YjEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NTE4MjQyNzh9.H-n-M-hijWKLrBzE-mzkLpcu1uTMA21CcnpkML9EZeU',
  user: {
    isadmin: true,
    fullname: 'Ezenwa Clement',
    email: 'ezenwaclems@gmail.com',
  },
};

const getToken = async () => {
  const {
    responseData: { token },
  } = await httpRequest(
    'http://sendit03.herokuapp.com/api/v1/auth/signin',
    'POST',
    null,
    validLoginData,
  );

  return token;
};

describe('Auth actions test', () => {
  let token;
  beforeAll(async () => {
    token = await getToken();
  });

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('creates SIGN_UP_USER_SUCCESS if the sign up was successful', async () => {
    mock.onPost('/auth/signup').reply(201, mockUserPayload);

    const expectedActions = [
      { type: SIGN_UP_USER_REQUEST },
      {
        type: SIGN_UP_USER_SUCCESS,
        user: mockUserPayload.user,
      },
    ];

    await store.dispatch(signUpUser(validSignupData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates SIGN_UP_USER_FAILURE if the sign up was successful', async () => {
    const mockErrorPayload = {
      message: 'Email already taken',
    };

    mock.onPost('/auth/signup').reply(409, mockErrorPayload);

    const expectedActions = [
      { type: SIGN_UP_USER_REQUEST },
      {
        type: SIGN_UP_USER_FAILURE,
        error: mockErrorPayload.message,
      },
    ];

    await store.dispatch(signUpUser(invalidSignupData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates SIGN_IN_USER_SUCCESS if the signin was successful', async () => {
    mock.onPost('/auth/signin').reply(200, mockUserPayload);
    const expectedActions = [
      { type: SIGN_IN_USER_REQUEST },
      {
        type: SIGN_IN_USER_SUCCESS,
        user: mockUserPayload.user,
      },
    ];

    await store.dispatch(signInUser(validLoginData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates SIGN_IN_USER_FAILURE if the signup failed', async () => {
    const mockErrorPayload = { message: 'Invalid username/password' };
    mock.onPost('/auth/signin').reply(401, mockErrorPayload);
    const expectedActions = [
      { type: SIGN_IN_USER_REQUEST },
      {
        type: SIGN_IN_USER_FAILURE,
        error: mockErrorPayload.message,
      },
    ];

    await store.dispatch(signInUser(invalidLoginData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates AUTHENTICATION_SUCCESS if user authentication was successful', async () => {
    mock.onGet('/user', { 'x-auth-token': token }).reply(200, mockUserPayload.user);
    const expectedActions = [
      { type: AUTHENTICATION_REQUEST },
      {
        type: AUTHENTICATION_SUCCESS,
        user: mockUserPayload.user,
      },
    ];

    await store.dispatch(authenticateUser(token));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates AUTHENTICATION_FAILURE if the user fails authentication', () => {
    store.dispatch(authenticateUser());
    expect(store.getActions()).toEqual([{ type: AUTHENTICATION_FAILURE }]);
  });

  it('creates AUTHENTICATION_FAILURE if the user fails authentication', async () => {
    const mockErrorPayload = { message: 'Access denied, Invalid token supplied' };
    mock.onGet('/user', { 'x-auth-token': 'shsjsjsj' }).reply(401, mockErrorPayload.message);
    const expectedActions = [
      { type: AUTHENTICATION_REQUEST },
      {
        type: AUTHENTICATION_FAILURE,
        error: { message: mockErrorPayload.message },
      },
    ];

    await store.dispatch(authenticateUser('sjdjdjdjdjdj'));
    expect(store.getActions().map(action => action.type)).toEqual(
      expectedActions.map(action => action.type),
    );
  });

  it('creates SIGN_OUT when the user signs out', () => {
    const expectedActions = [{ type: SIGN_OUT_USER }];
    store.dispatch(signOutUser());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates UPDATE_PHONE_NO_SUCCESS if the user's phone number was successsfully updated", async () => {
    mock.onPut('/user/updatePhoneNo').reply(200, mockUserPayload.user);

    const expectedActions = [{ type: UPDATE_PHONE_NO_SUCCESS, user: mockUserPayload.user }];
    await store.dispatch(updatePhoneNo({ phoneNo: '08037861567' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates UPDATE_PHONE_NO_FAILURE if the user's phone number was not successsfully updated", async () => {
    const mockErrorPayload = { message: 'Invalid phone number' };
    mock.onPut('/user/updatePhoneNo').reply(400, mockErrorPayload);
    const expectedActions = [{ type: UPDATE_PHONE_NO_FAILURE, error: mockErrorPayload.message }];
    await store.dispatch(updatePhoneNo({ phone: '08' }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
