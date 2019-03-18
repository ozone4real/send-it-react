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
} from '../../actions/types';
import {
  singleUserParcelReducer,
  allUserParcelsReducer,
  adminParcelsReducer,
} from '../../reducers/parcelsReducer';
import { mockAllParcelsData, mockParcelErrorMessage } from '../mockData';

describe('single user parcel reducer test', () => {
  it('should return the initial state', () => {
    expect({}).toEqual(singleUserParcelReducer(undefined, {}));
  });

  it('should handle CHANGE_PARCEL_DESTINATION_REQUEST', () => {
    expect(singleUserParcelReducer({}, { type: CHANGE_PARCEL_DESTINATION_REQUEST })).toEqual({
      isRequesting: true,
    });
  });

  it('should handle CHANGE_PARCEL_DESTINATION_CONFIRM_NEWPRICE', () => {
    expect(
      singleUserParcelReducer(
        {},
        { type: CHANGE_PARCEL_DESTINATION_CONFIRM_NEWPRICE, updatedParcel: mockAllParcelsData[0] },
      ),
    ).toEqual({ data: mockAllParcelsData[0] });
  });

  it('should handle CHANGE_PARCEL_DESTINATION_FAILURE', () => {
    expect(
      singleUserParcelReducer(
        {},
        { type: CHANGE_PARCEL_DESTINATION_FAILURE, error: mockParcelErrorMessage.message },
      ),
    ).toEqual({ errorMessage: mockParcelErrorMessage.message });
  });

  it('should handle CANCEL_DELIVERY_REQUEST', () => {
    expect(singleUserParcelReducer({}, { type: CANCEL_DELIVERY_REQUEST })).toEqual({
      isRequesting: true,
    });
  });

  it('should handle CREATE_AN_ORDER_REQUEST', () => {
    expect(singleUserParcelReducer({}, { type: CREATE_AN_ORDER_REQUEST })).toEqual({
      isRequesting: true,
    });
  });

  it('should handle CREATE_AN_ORDER_CONFIRMATION_FAILURE', () => {
    expect(
      singleUserParcelReducer(
        {},
        { type: CREATE_AN_ORDER_CONFIRMATION_FAILURE, error: mockParcelErrorMessage.message },
      ),
    ).toEqual({
      errorMessage: mockParcelErrorMessage.message,
    });
  });

  it('should handle CREATE_AN_ORDER_CONFIRMATION_SUCCESS', () => {
    expect(
      singleUserParcelReducer(
        {},
        { type: CREATE_AN_ORDER_CONFIRMATION_SUCCESS, parcelToBeCreated: mockAllParcelsData[0] },
      ),
    ).toEqual({ data: mockAllParcelsData[0] });
  });

  it('should handle CREATE_AN_ORDER_SUCCESS', () => {
    expect(
      singleUserParcelReducer(
        {},
        { type: CREATE_AN_ORDER_SUCCESS, newlyCreatedParcel: mockAllParcelsData[0] },
      ),
    ).toEqual({ data: mockAllParcelsData[0] });
  });

  it('should handle CREATE_ORDER_FAILURE', () => {
    expect(
      singleUserParcelReducer(
        {},
        { type: CREATE_AN_ORDER_FAILURE, error: mockParcelErrorMessage.message },
      ),
    ).toEqual({
      errorMessage: mockParcelErrorMessage.message,
    });
  });
});

describe('admin parcels reducer test', () => {
  it('should return the initial state', () => {
    expect({}).toEqual(adminParcelsReducer(undefined, {}));
  });

  it('should handle FETCH_ALL_PARCELS_REQUEST', () => {
    expect(adminParcelsReducer({}, { type: FETCH_ALL_PARCELS_REQUEST })).toEqual({
      isRequesting: true,
    });
  });

  it('should handle FETCH_ALL_PARCELS_FAILURE', () => {
    expect(
      adminParcelsReducer(
        {},
        { type: FETCH_ALL_PARCELS_FAILURE, error: mockParcelErrorMessage.message },
      ),
    ).toEqual({ errorMessage: mockParcelErrorMessage.message });
  });

  it('should handle FETCH_ALL_PARCELS_SUCCESS', () => {
    expect(
      adminParcelsReducer({}, { type: FETCH_ALL_PARCELS_SUCCESS, allParcels: mockAllParcelsData }),
    ).toEqual({ allParcels: mockAllParcelsData });
  });

  it('should handle ADMIN_UPDATE_PARCEL_FAILURE', () => {
    expect(
      adminParcelsReducer(
        {},
        { type: ADMIN_UPDATE_PARCEL_FAILURE, error: mockParcelErrorMessage.message },
      ),
    ).toEqual({ errorMessage: mockParcelErrorMessage.message });
  });

  it('should handle ADMIN_UPDATE_PARCEL_SUCCESS', () => {
    expect(
      adminParcelsReducer(
        { allParcels: mockAllParcelsData },
        { type: ADMIN_UPDATE_PARCEL_SUCCESS, updatedParcel: mockAllParcelsData[0] },
      ),
    ).toEqual({ allParcels: mockAllParcelsData });
  });
});

describe('user parcels reducer test', () => {
  it('should return the initial state', () => {
    expect({}).toEqual(allUserParcelsReducer(undefined, {}));
  });

  it('should handle FETCH_ALL_USER_PARCELS_REQUEST', () => {
    expect(allUserParcelsReducer({}, { type: FETCH_ALL_USER_PARCELS_REQUEST })).toEqual({
      isRequesting: true,
    });
  });

  it('should handle FETCH_ALL_USER_PARCELS_FAILURE', () => {
    expect(
      allUserParcelsReducer(
        {},
        { type: FETCH_ALL_USER_PARCELS_FAILURE, error: mockParcelErrorMessage.message },
      ),
    ).toEqual({ errorMessage: mockParcelErrorMessage.message });
  });

  it('should handle FETCH_ALL_PARCELS_SUCCESS', () => {
    expect(
      allUserParcelsReducer(
        {},
        { type: FETCH_ALL_USER_PARCELS_SUCCESS, userParcels: mockAllParcelsData },
      ),
    ).toEqual(mockAllParcelsData);
  });

  it('should handle CHANGE_PARCEL_DESTINATION_SUCCESS', () => {
    expect(
      allUserParcelsReducer(mockAllParcelsData, {
        type: CHANGE_PARCEL_DESTINATION_SUCCESS,
        updatedParcel: mockAllParcelsData[0],
      }),
    ).toEqual(mockAllParcelsData);
  });

  it('should handle CANCEL_DELIVERY_SUCCESS', () => {
    expect(
      allUserParcelsReducer(mockAllParcelsData, {
        type: CANCEL_DELIVERY_SUCCESS,
        updatedParcel: mockAllParcelsData[0],
      }),
    ).toEqual(mockAllParcelsData);
  });
});
