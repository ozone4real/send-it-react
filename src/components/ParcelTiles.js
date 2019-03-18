import React from 'react';
import Utils from '../utils';
import Modal from 'react-modal';
const { formatDate } = Utils;

const ParcelTiles = ({ data, onChangeDestination, onCancelButtonClick }) => {
  return data.map(parcel => (
    <ul key={parcel.parcelid} className="parcelInfo">
      <li>
        <b>Parcel ID: </b>
        {parcel.parcelid}
      </li>
      <li>
        <b>Pick up Time: </b>
        {formatDate(parcel.pickuptime)}
      </li>
      <li>
        <b>Pickup Address: </b>
        {parcel.pickupaddress}
      </li>
      <li>
        <b>Destination: </b>
        {parcel.destination}
      </li>
      {parcel.status === 'in transit' && (
        <li>
          <b>Present Location: </b>
          {parcel.presentlocation}
        </li>
      )}
      <li>
        <b>Parcel Description: </b>
        {parcel.parceldescription}
      </li>
      <li>
        <b>Parcel Weight: </b>
        {parcel.parcelweight}
      </li>
      <li>
        <b>Price: </b>N{parcel.price}
      </li>
      <li>
        <b>Status: </b>
        {parcel.status}
      </li>
      {parcel.status === 'delivered' && (
        <React.Fragment>
          <li>
            <b>Time Delivered: </b>
            {parcel.receivedat}
          </li>
          <li>
            <b>Receiver: </b>
            {parcel.receivedby}
          </li>
        </React.Fragment>
      )}
      {parcel.status === 'in transit' ? (
        <li>
          <button>Track</button>{' '}
          <button onClick={() => onChangeDestination(parcel)}>Change Destination</button>
          <button onClick={() => onCancelButtonClick(parcel)}>Cancel</button>
        </li>
      ) : parcel.status === 'pending' ? (
        <li>
          <button onClick={() => onChangeDestination(parcel)}>Change Destination</button>
          <button onClick={() => onCancelButtonClick(parcel)}>Cancel</button>
        </li>
      ) : (
        ''
      )}
    </ul>
  ));
};

export default ParcelTiles;
