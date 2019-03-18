import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import {
  allUserParcelsReducer,
  singleUserParcelReducer,
  adminParcelsReducer,
} from './parcelsReducer';

export default combineReducers({
  user: authReducer,
  parcelData: allUserParcelsReducer,
  singleParcel: singleUserParcelReducer,
  admin: adminParcelsReducer,
});
