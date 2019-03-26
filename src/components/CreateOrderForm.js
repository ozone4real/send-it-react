import React from 'react';
import Form from './common/Form';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Circle } from 'better-react-spinkit';
import { createOrderFormSchema } from '../utils/validationSchemas';

import Modal from 'react-modal';
import {
  createParcelOrderRequest,
  createParcelOrder,
  fetchAllUserParcels,
} from '../actions/parcelsActions';

class CreateOrderForm extends Form {
  state = {
    data: {
      streetAddress1: '',
      city1: '',
      state1: '',
      streetAddress2: '',
      city2: '',
      state2: '',
      pickupTime: '',
      parcelDescription: '',
      parcelWeight: '',
    },
    errors: {},
  };

  schema = createOrderFormSchema;

  componentDidUpdate(prevProps) {
    if (prevProps.singleParcel === this.props.singleParcel) return;
    if (this.props.singleParcel.data) {
      const {
        data: { parcelDescription, pickupAddress, destination, distance, price, parcelWeight },
      } = this.props.singleParcel;
      const modalContent = (
        <div className="form update-form">
          <ul>
            <li>
              <h4>Confirm Your Order</h4>
            </li>
            <li>
              <b>Pickup Address: </b>
              {pickupAddress}
            </li>
            <li>
              <b>Destination: </b>
              {destination}
            </li>
            <li>
              <b>Parcel Weight: </b>
              {parcelWeight}
            </li>
            <li>
              <b>parcelDescription: </b>
              {parcelDescription}
            </li>
            <li>
              <b>Distance: </b>
              {distance}km
            </li>
            <li>
              <b>Price: </b> N{price}
            </li>
            <li>
              <button onClick={this.submitConfirmedData}>Confirm</button>{' '}
              <button onClick={this.removeModal}>Cancel</button>
            </li>
          </ul>
        </div>
      );
      this.setState({ modalContent });
    }
  }

  submitConfirmedData = async () => {
    const { data } = this.state;
    const { fetchAllUserParcels, createParcelOrder, history } = this.props;
    const token = localStorage.getItem('token');
    this.setState({
      modalContent: (
        <div className="div-spinner">
          <Circle size={100} color={'#0b0b61'} />
        </div>
      ),
    });
    await createParcelOrder(token, data);
    this.setState({
      modalContent: (
        <div className="successMessage">
          <h2>Order Successfully Placed </h2>
          <FontAwesomeIcon icon="check-circle" size="4x" />
        </div>
      ),
    });
    await fetchAllUserParcels(token);
    history.push('/dashboard/deliveryHistory');
  };

  doSubmit() {
    const { createParcelOrderRequest } = this.props;
    const {
      streetAddress1,
      city1,
      state1,
      streetAddress2,
      city2,
      state2,
      pickupTime,
      parcelDescription,
      parcelWeight,
    } = { ...this.state.data };
    const pickupAddress = `${streetAddress1}, ${city1}, ${state1}`;
    const destination = `${streetAddress2}, ${city2}, ${state2}`;
    const parcelData = {
      pickupAddress,
      destination,
      pickupTime,
      parcelDescription,
      parcelWeight,
    };

    this.setState({ data: parcelData });
    createParcelOrderRequest(localStorage.getItem('token'), parcelData);
  }

  removeModal = () => {
    this.setState({ modalContent: undefined });
  };

  render() {
    const options = [
      { id: 0, value: '', label: 'Parcel Weight' },
      { id: 1, value: '0kg - 5kg', label: '0kg - 5kg (N50/km)' },
      { id: 2, value: '5kg - 20kg', label: '5kg - 20kg (N70/km)' },
      { id: 3, value: '20kg - 50kg', label: '20kg - 50kg (N100/km)' },
      { id: 4, value: '50kg - 100kg', label: '50kg - 100kg (N150/km)' },
      { id: 5, value: '100kg above', label: '100kg above (N200/km)' },
    ];
    return (
      <div className="container">
        <div className="form">
          <div className="form-area">
            <h3>Need to deliver a parcel? Please fill the form below</h3>
            <form onSubmit={this.handleSubmit}>
              <h4>Pickup Address</h4>
              {this.renderInput('streetAddress1', 'Street Address')}
              {this.renderInput('city1', 'City')}
              {this.renderInput('state1', 'State')}
              <h4>Destination</h4>
              {this.renderInput('streetAddress2', 'Street Address')}
              {this.renderInput('city2', 'City')}
              {this.renderInput('state2', 'State')}
              <br />
              <h4>Pickup Time</h4>
              {this.renderInput('pickupTime', 'Pickup Time', 'datetime-local')}
              <h4>Parcel Description</h4>
              {this.renderInput('parcelDescription', 'Parcel Description')}
              {this.renderSelect(options, 'parcelWeight', 'Parcel Weight')}
              {this.renderButton('Create Order', this.props.singleParcel.isRequesting)}
            </form>
          </div>
        </div>
        <Modal
          isOpen={!!this.state.modalContent}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          {this.state.modalContent}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  singleParcel: state.singleParcel,
  user: state.user,
});

export { CreateOrderForm };

export default connect(
  mapStateToProps,
  { createParcelOrderRequest, createParcelOrder, fetchAllUserParcels },
)(CreateOrderForm);
