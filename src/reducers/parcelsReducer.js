import {
  FETCH_ALL_USER_PARCELS_FAILURE,
  FETCH_ALL_USER_PARCELS_SUCCESS,
  FETCH_ALL_USER_PARCELS_REQUEST,
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
  ADMIN_UPDATE_PARCEL_SUCCESS,
} from '../actions/types';

const initialState = {};

export const allUserParcelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USER_PARCELS_REQUEST:
      return { isRequesting: true };
    case FETCH_ALL_USER_PARCELS_FAILURE:
      return { errorMessage: action.error };
    case FETCH_ALL_USER_PARCELS_SUCCESS:
      return action.userParcels;
    case CHANGE_PARCEL_DESTINATION_SUCCESS: {
      const index = state.indexOf(
        state.find(parcel => parcel.parcelid === action.updatedParcel.parcelid),
      );
      state[index] = action.updatedParcel;
      return state;
    }
    case CANCEL_DELIVERY_SUCCESS: {
      const index = state.indexOf(
        state.find(parcel => parcel.parcelid === action.updatedParcel.parcelid),
      );
      state[index] = action.updatedParcel;
      return state;
    }
    default:
      return state;
  }
};

export const singleUserParcelReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PARCEL_DESTINATION_REQUEST:
      return { isRequesting: true };
    case CHANGE_PARCEL_DESTINATION_FAILURE:
      return { errorMessage: action.error };
    case CHANGE_PARCEL_DESTINATION_CONFIRM_NEWPRICE:
      return { data: action.updatedParcel };
    case CANCEL_DELIVERY_REQUEST:
      return { isRequesting: true };
    case CREATE_AN_ORDER_REQUEST:
      return { isRequesting: true };
    case CREATE_AN_ORDER_CONFIRMATION_FAILURE:
      return { errorMessage: action.error };
    case CREATE_AN_ORDER_CONFIRMATION_SUCCESS:
      return { data: action.parcelToBeCreated };
    case CREATE_AN_ORDER_FAILURE:
      return { errorMessage: action.error };
    case CREATE_AN_ORDER_SUCCESS:
      return { data: action.newlyCreatedParcel };
    default:
      return state;
  }
};

export const adminParcelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PARCELS_REQUEST:
      return { isRequesting: true };
    case FETCH_ALL_PARCELS_FAILURE:
      return { errorMessage: action.error };
    case FETCH_ALL_PARCELS_SUCCESS:
      return { allParcels: action.allParcels };
    case ADMIN_UPDATE_PARCEL_FAILURE:
      state.errorMessage = action.error;
      return state;
    case ADMIN_UPDATE_PARCEL_SUCCESS: {
      const { allParcels } = state;
      const index = allParcels.indexOf(
        allParcels.find(parcel => parcel.parcelid === action.updatedParcel.parcelid),
      );
      allParcels[index] = action.updatedParcel;
      return { allParcels };
    }
    default:
      return state;
  }
};

// export const updateOneParcelReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CHANGE_PARCEL_DESTINATION_REQUEST:
//       return { isRequesting: true };
//     case CHANGE_PARCEL_DESTINATION_FAILURE:
//       return { errorMessage: action.error };
//     case CHANGE_PARCEL_DESTINATION_CONFIRM_NEWPRICE:
//       return { parcelDataToBeConfirmed: action.updatedParcel };
//     case CANCEL_DELIVERY_REQUEST:
//       return { isRequesting: true };
//     case CREATE_AN_ORDER_REQUEST:
//       return { isRequesting: true };
//     case CREATE_AN_ORDER_CONFIRMATION_FAILURE:
//       return { errorMessage: action.error };
//     case CREATE_AN_ORDER_CONFIRMATION_SUCCESS:
//       return action.parcelToBeCreated;
//     case CREATE_AN_ORDER_FAILURE:
//       return { errorMessage: action.error };
//     case CREATE_AN_ORDER_SUCCESS:
//       return action.newlyCreatedParcel;
//     default:
//       return state;
//   }
// };

// export const createParcelOrderReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CREATE_AN_ORDER_REQUEST:
//       return { isRequesting: true };
//     case CREATE_AN_ORDER_CONFIRMATION_FAILURE:
//       return { errorMessage: action.error };
//     case CREATE_AN_ORDER_CONFIRMATION_SUCCESS:
//       return { parcelDataToBeConfirmed: action.parcelToBeCreated };
//     case CREATE_AN_ORDER_FAILURE:
//       return { errorMessage: action.error };
//     case CREATE_AN_ORDER_SUCCESS:
//       return action.newlyCreatedParcel;
//     default:
//       return state;
//   }
// };
