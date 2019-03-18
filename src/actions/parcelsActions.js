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
} from './types';
import Utils from '../utils';

const { httpRequest, sendHttpRequest } = Utils;

const fetchAllUserParcels = token => async (dispatch) => {
  dispatch({ type: FETCH_ALL_USER_PARCELS_REQUEST });

  try {
    const responseData = await sendHttpRequest('/user/parcels', 'GET');
    dispatch({ type: FETCH_ALL_USER_PARCELS_SUCCESS, userParcels: responseData });
  } catch ({ response: { data, status } }) {
    if (status === 404) {
      dispatch({
        type: FETCH_ALL_USER_PARCELS_FAILURE,
        error: 'You have not made any parcel delivery order',
      });
      return;
    }

    dispatch({
      type: FETCH_ALL_USER_PARCELS_FAILURE,
      error: data.message,
    });
  }
};

const createParcelOrderRequest = (token, data) => async (dispatch) => {
  dispatch({ type: CREATE_AN_ORDER_REQUEST });
  try {
    const responseData = await sendHttpRequest('/parcels/confirm', 'POST', data);

    dispatch({
      type: CREATE_AN_ORDER_CONFIRMATION_SUCCESS,
      parcelToBeCreated: responseData,
    });
  } catch ({ response }) {
    dispatch({
      type: CREATE_AN_ORDER_CONFIRMATION_FAILURE,
      error: response.data.message,
    });
  }
};

const createParcelOrder = (token, data) => async (dispatch) => {
  dispatch({ type: CREATE_AN_ORDER_REQUEST });

  try {
    const responseData = await sendHttpRequest('/parcels', 'POST', data);

    dispatch({
      type: CREATE_AN_ORDER_SUCCESS,
      newlyCreatedParcel: responseData,
    });
  } catch ({ response }) {
    dispatch({
      type: CREATE_AN_ORDER_FAILURE,
      error: response.data.message,
    });
  }
};

const changeParcelDestinationRequest = (token, id, data) => async (dispatch) => {
  dispatch({ type: CHANGE_PARCEL_DESTINATION_REQUEST });
  try {
    const responseData = await sendHttpRequest(`/parcels/${id}/confirmUpdate`, 'PUT', data);

    dispatch({
      type: CHANGE_PARCEL_DESTINATION_CONFIRM_NEWPRICE,
      updatedParcel: responseData,
    });
  } catch ({ response }) {
    dispatch({
      type: CHANGE_PARCEL_DESTINATION_FAILURE,
      error: response.data.message,
    });
  }
};

const changeParcelDestination = (token, id, data) => async (dispatch) => {
  dispatch({ type: CHANGE_PARCEL_DESTINATION_REQUEST });
  try {
    const responseData = await sendHttpRequest(`/parcels/${id}/destination`, 'PUT', data);
    dispatch({
      type: CHANGE_PARCEL_DESTINATION_SUCCESS,
      updatedParcel: responseData,
    });
  } catch ({ response }) {
    dispatch({
      type: CHANGE_PARCEL_DESTINATION_FAILURE,
      error: response.data.message,
    });
  }
};

const cancelParcelDelivery = id => async (dispatch) => {
  dispatch({ type: CANCEL_DELIVERY_REQUEST });

  try {
    const responseData = await sendHttpRequest(`/parcels/${id}/cancel`, 'PUT');
    dispatch({ type: CANCEL_DELIVERY_SUCCESS, updatedParcel: responseData });
  } catch (error) {}
};

const fetchAllParcels = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_PARCELS_REQUEST });

  try {
    const responseData = await sendHttpRequest('/parcels', 'GET');
    dispatch({ type: FETCH_ALL_PARCELS_SUCCESS, allParcels: responseData });
  } catch ({ response }) {
    dispatch({ type: FETCH_ALL_PARCELS_FAILURE, error: response.data.message });
  }
};

const adminEditParcel = (token, url, payload) => async (dispatch) => {
  dispatch({ type: ADMIN_UPDATE_PARCEL_REQUEST });
  try {
    const responseData = await sendHttpRequest(url, 'PUT', payload);
    dispatch({ type: ADMIN_UPDATE_PARCEL_SUCCESS, updatedParcel: responseData });
  } catch ({ response }) {
    dispatch({ type: ADMIN_UPDATE_PARCEL_FAILURE, error: response.data.message });
  }
};

export {
  fetchAllUserParcels,
  changeParcelDestinationRequest,
  changeParcelDestination,
  createParcelOrderRequest,
  createParcelOrder,
  cancelParcelDelivery,
  fetchAllParcels,
  adminEditParcel,
};
