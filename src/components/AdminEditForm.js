import React from 'react';
import { connect } from 'react-redux';
import Form from './common/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { adminEditParcel } from '../actions/parcelsActions';
import { adminFormSchema } from '../utils/validationSchemas';

class AdminEditForm extends Form {
  state = {
    data: { presentLocation: '', status: '', receivedAt: '', receivedBy: '' },
    errors: {},
  };

  schema = adminFormSchema;

  doSubmit = async () => {
    this.setState({ isRequesting: true });
    const token = localStorage.getItem('token');
    const { data } = this.state;
    const {
      updateParcel,
      parcel,
      admin: { error },
      displaySuccessMessage,
      onModalClose,
    } = this.props;
    const endpoint =
      parcel.presentlocation && data.status === 'in transit' ? 'presentLocation' : 'status';
    const url = `http://sendit03.herokuapp.com/api/v1/parcels/${parcel.parcelid}/${endpoint}`;
    await updateParcel(token, url, data);
    displaySuccessMessage();
    setTimeout(() => onModalClose(), 1000);
  };

  componentDidMount() {
    const {
      parcel: { presentlocation, status },
    } = this.props;
    const data = { ...this.state.data };
    data.presentLocation = presentlocation ? presentlocation : '';
    data.status = status;
    this.setState({ data });
  }

  render() {
    const statusOptions = [
      { id: 0, value: '', label: 'Change Status' },
      { id: 1, value: 'in transit', label: 'In Transit' },
      { id: 2, value: 'delivered', label: 'Delivered' },
    ];

    const { onModalClose } = this.props;
    const {
      data: { status },
      isRequesting,
    } = this.state;
    return (
      <div className="form update-form">
        <FontAwesomeIcon
          icon="window-close"
          style={{ cursor: 'pointer', color: '#0b0b61' }}
          onClick={onModalClose}
        />
        <div className="form-area">
          <h4>Edit Parcel</h4>
          <form onSubmit={this.handleSubmit}>
            {this.renderSelect(statusOptions, 'status')}
            {status === 'in transit' &&
              this.renderInput('presentLocation', 'Present Location (city, state)')}
            {status === 'delivered' &&
              this.renderInput('receivedAt', 'Time delivered', 'datetime-local')}
            {status === 'delivered' && this.renderInput('receivedBy', 'Receiver')}
            {this.renderButton('Submit', isRequesting, !!this.state.errors.presentLocation)}
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateParcel: (token, url, payload) => dispatch(adminEditParcel(token, url, payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AdminEditForm);
