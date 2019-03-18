import Utils from '../../utils';

const { httpRequest } = Utils;

export const adminLoginData = {
  email: 'ezenwaogbonna1@gmail.com',
  password: 'ozone4real',
};
export const userLoginData = {
  email: 'ezenwaclement2@gmail.com',
  password: 'ozone4real',
};
export const getToken = async (data) => {
  const {
    responseData: { token },
  } = await httpRequest('http://sendit03.herokuapp.com/api/v1/auth/signin', 'POST', null, data);

  return token;
};
export const mockAllParcelsData = [
  {
    parcelid: 1,
    userid: '2wjwhhwjj',
    status: 'in transit',
    pickupaddress: '8. Ogun street',
    destination: '9.Ajanakun street',
  },
  {
    parcelid: 2,
    userid: '2wjwhhwjj',
    status: 'in transit',
    pickupaddress: '8. Ogun street',
    destination: '9.Ajanakun street',
  },
  {
    parcelid: 3,
    userid: 'wu7wjwhhwj',
    status: 'in transit',
    pickupaddress: '8. Ogun street',
    destination: '9.Ajanakun street',
  },
];
export const mockParcelOrderRequestPayload = {
  pickupAddress: '8. Ogun street',
  destination: '9.Ajanakun street',
  parcelWeight: '50kg - 100kg',
  parcelDescription: 'Bag of Garri',
};

export const mockParcelErrorMessage = {
  message: 'Parcel not found',
};
