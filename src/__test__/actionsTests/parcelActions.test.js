import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchAllUserParcels,
  changeParcelDestinationRequest,
  changeParcelDestination,
  createParcelOrderRequest,
  createParcelOrder,
  cancelParcelDelivery,
  fetchAllParcels,
  adminEditParcel,
} from '../../actions/parcelsActions';
import {
  FETCH_ALL_USER_PARCELS_REQUEST,
  FETCH_ALL_USER_PARCELS_FAILURE,
  FETCH_ALL_USER_PARCELS_SUCCESS,
  CHANGE_PARCEL_DESTINATION_REQUEST,
  CHANGE_PARCEL_DESTINATION_FAILURE,
  CHANGE_PARCEL_DESTINATION_CONFIRM_NEWPRICE,
  CHANGE_PARCEL_DESTINATION_SUCCESS,
  CREATE_AN_ORDER_REQUEST,
  CREATE_AN_ORDER_CONFIRMATION_FAILURE,
  CREATE_AN_ORDER_CONFIRMATION_SUCCESS,
  CREATE_AN_ORDER_FAILURE,
  CREATE_AN_ORDER_SUCCESS,
  CANCEL_DELIVERY_REQUEST,
  CANCEL_DELIVERY_SUCCESS,
  FETCH_ALL_PARCELS_REQUEST,
  FETCH_ALL_PARCELS_FAILURE,
  FETCH_ALL_PARCELS_SUCCESS,
  ADMIN_UPDATE_PARCEL_FAILURE,
  ADMIN_UPDATE_PARCEL_REQUEST,
  ADMIN_UPDATE_PARCEL_SUCCESS,
} from '../../actions/types';

import {
  adminLoginData,
  getToken,
  mockAllParcelsData,
  mockParcelOrderRequestPayload,
  userLoginData,
} from '../mockData/index';

import { apiInstance } from '../../utils';

const mock = new MockAdapter(apiInstance);

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('admin parcel actions test', () => {
  let adminToken;
  beforeAll(async () => {
    adminToken = await getToken(adminLoginData);
  });

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should create FETCH_ALL_PARCELS_SUCCESS if all parcels were successfully fetched', async () => {
    mock.onGet('/parcels').reply(200, mockAllParcelsData);
    const expectedActions = [
      { type: FETCH_ALL_PARCELS_REQUEST },
      { type: FETCH_ALL_PARCELS_SUCCESS, allParcels: mockAllParcelsData },
    ];

    await store.dispatch(fetchAllParcels(adminToken));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create FETCH_ALL_PARCELS_FAILURE if the parcels fetch failed', async () => {
    const mockErrorPayLoad = { message: 'Access denied, invalid token supplied' };
    mock.onGet('/parcels').reply(401, mockErrorPayLoad);

    const expectedActions = [
      { type: FETCH_ALL_PARCELS_REQUEST },
      { type: FETCH_ALL_PARCELS_FAILURE, error: mockErrorPayLoad.message },
    ];

    await store.dispatch(fetchAllParcels('shsjjsjs'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create ADMIN_UPDATE_PARCEL_SUCCESS if a parcel update was successful', async () => {
    mock.onPut('parcels/1/presentLoction').reply(200, mockAllParcelsData[1]);
    const expectedActions = [
      { type: ADMIN_UPDATE_PARCEL_REQUEST },
      { type: ADMIN_UPDATE_PARCEL_SUCCESS, updatedParcel: mockAllParcelsData[1] },
    ];

    await store.dispatch(
      adminEditParcel(adminToken, 'parcels/1/presentLoction', {
        presentlocation: 'Ikeja, Lagos',
      }),
    );

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create ADMIN_UPDATE_PARCEL_FAILURE if a parcel update failed', async () => {
    const mockErrorPayLoad = {
      message: 'Parcel not found',
    };
    mock.onPut('/parcels/7000/presentLocation').reply(404, mockErrorPayLoad);
    const expectedActions = [
      { type: ADMIN_UPDATE_PARCEL_REQUEST },
      { type: ADMIN_UPDATE_PARCEL_FAILURE, error: mockErrorPayLoad.message },
    ];
    await store.dispatch(
      adminEditParcel(adminToken, '/parcels/7000/presentLocation', {
        presentlocation: 'Ikeja, Lagos',
      }),
    );
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('user parcel actions test', () => {
  let userToken;

  beforeAll(async () => {
    userToken = await getToken(userLoginData);
  });

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it("should create FETCH_ALL_USER_PARCELS_SUCCESS if all the user's parcels were successfully fetched", async () => {
    mock.onGet('/user/parcels').reply(200, mockAllParcelsData);

    const expectedActions = [
      { type: FETCH_ALL_USER_PARCELS_REQUEST },
      { type: FETCH_ALL_USER_PARCELS_SUCCESS, userParcels: mockAllParcelsData },
    ];

    await store.dispatch(fetchAllUserParcels(userToken));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should create FETCH_ALL_USER_PARCELS_FAILURE if all the user's parcels were not successfully fetched", async () => {
    const mockErrorPayLoad = { message: 'Access denied, invalid token supplied' };
    mock.onGet('/user/parcels').reply(401, mockErrorPayLoad);

    const expectedActions = [
      { type: FETCH_ALL_USER_PARCELS_REQUEST },
      { type: FETCH_ALL_USER_PARCELS_FAILURE, error: mockErrorPayLoad.message },
    ];

    await store.dispatch(fetchAllUserParcels('hhgfffff'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create FETCH_ALL_USER_PARCELS_FAILURE if no parcel order was found for the user', async () => {
    const mockErrorPayLoad = { message: 'You have not made any parcel delivery order' };
    mock.onGet('/user/parcels').reply(404, mockErrorPayLoad);

    const expectedActions = [
      { type: FETCH_ALL_USER_PARCELS_REQUEST },
      { type: FETCH_ALL_USER_PARCELS_FAILURE, error: mockErrorPayLoad.message },
    ];

    await store.dispatch(fetchAllUserParcels(userToken));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create CREATE_AN_ORDER_CONFIRMATION_FAILURE if a parcel order request failed', async () => {
    const mockErrorPayLoad = { message: 'Access denied, invalid token supplied' };
    mock.onPost('/parcels/confirm').reply(401, mockErrorPayLoad);
    const expectedActions = [
      { type: CREATE_AN_ORDER_REQUEST },
      { type: CREATE_AN_ORDER_CONFIRMATION_FAILURE, error: mockErrorPayLoad.message },
    ];

    await store.dispatch(createParcelOrderRequest(userToken, mockParcelOrderRequestPayload));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create CREATE_AN_ORDER_CONFIRMATION_SUCCESS if a parcel order request was successful', async () => {
    mock.onPost('/parcels/confirm').reply(200, mockAllParcelsData[0]);
    const expectedActions = [
      { type: CREATE_AN_ORDER_REQUEST },
      { type: CREATE_AN_ORDER_CONFIRMATION_SUCCESS, parcelToBeCreated: mockAllParcelsData[0] },
    ];

    await store.dispatch(createParcelOrderRequest(userToken, mockParcelOrderRequestPayload));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create CREATE_AN_ORDER_SUCCESS if a parcel order was created', async () => {
    mock.onPost('/parcels').reply(201, mockAllParcelsData[0]);
    const expectedActions = [
      { type: CREATE_AN_ORDER_REQUEST },
      { type: CREATE_AN_ORDER_SUCCESS, newlyCreatedParcel: mockAllParcelsData[0] },
    ];

    await store.dispatch(createParcelOrder(userToken, mockParcelOrderRequestPayload));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create CREATE_AN_ORDER_FAILURE if a parcel order was not successfully created', async () => {
    const mockErrorPayLoad = { message: 'Invalid data supplied' };
    mock.onPost('/parcels').reply(400, mockErrorPayLoad);
    const expectedActions = [
      { type: CREATE_AN_ORDER_REQUEST },
      { type: CREATE_AN_ORDER_FAILURE, error: mockErrorPayLoad.message },
    ];

    await store.dispatch(createParcelOrder(userToken, {}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create CHANGE_PARCEL_DESTINATION_CONFIRM_NEWPRICE if the reqest was successful', async () => {
    mock.onPut('/parcels/1/confirmUpdate').reply(200, mockAllParcelsData[0]);
    const expectedActions = [
      { type: CHANGE_PARCEL_DESTINATION_REQUEST },
      { type: CHANGE_PARCEL_DESTINATION_CONFIRM_NEWPRICE, updatedParcel: mockAllParcelsData[0] },
    ];

    await store.dispatch(
      changeParcelDestinationRequest(userToken, '1', { destination: '8. Babudu close, Isashi' }),
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create CHANGE_PARCEL_DESTINATION_FAILURE if the request was not successful', async () => {
    const mockErrorPayLoad = { message: 'Invalid data supplied' };
    mock.onPut('/parcels/1/confirmUpdate').reply(400, mockErrorPayLoad);
    const expectedActions = [
      { type: CHANGE_PARCEL_DESTINATION_REQUEST },
      { type: CHANGE_PARCEL_DESTINATION_FAILURE, error: mockErrorPayLoad.message },
    ];

    await store.dispatch(changeParcelDestinationRequest(userToken, '1', {}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create CHANGE_PARCEL_DESTINATION_SUCCESS', async () => {
    mock.onPut('/parcels/1/destination').reply(200, mockAllParcelsData[0]);
    const expectedActions = [
      { type: CHANGE_PARCEL_DESTINATION_REQUEST },
      { type: CHANGE_PARCEL_DESTINATION_SUCCESS, updatedParcel: mockAllParcelsData[0] },
    ];
    await store.dispatch(
      changeParcelDestination(userToken, '1', { destination: '8. Babudu close, Isashi' }),
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create CHANGE_PARCEL_DESTINATION_FAILURE', async () => {
    const mockErrorPayLoad = { message: 'Parcel not found' };

    mock.onPut('/parcels/2000/destination').reply(404, mockErrorPayLoad);
    const expectedActions = [
      { type: CHANGE_PARCEL_DESTINATION_REQUEST },
      { type: CHANGE_PARCEL_DESTINATION_FAILURE, error: mockErrorPayLoad.message },
    ];

    await store.dispatch(
      changeParcelDestination(userToken, '2000', { destination: '8. Babudu close, Isashi' }),
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create CANCEL_DELIVERY_SUCCESS', async () => {
    mock.onPut('/parcels/2/cancel').reply(200, mockAllParcelsData[0]);
    const expectedActions = [
      { type: CANCEL_DELIVERY_REQUEST },
      { type: CANCEL_DELIVERY_SUCCESS, updatedParcel: mockAllParcelsData[0] },
    ];

    await store.dispatch(cancelParcelDelivery(2));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
