import React from 'react';
import Form from './common/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { changeParcelDestinationRequest } from '../actions/parcelsActions';
import { destinationFormSchema } from '../utils/validationSchemas';

class ChangeDestinationForm extends Form {
  state = { data: { streetAddress: '', city: '', state: '' }, errors: {} };

  componentDidMount() {
    const {
      parcel: { destination },
    } = this.props;
    const [streetAddress, city, state] = destination.split(', ');
    const data = { streetAddress, city, state };
    this.setState({ data });
  }

  schema = destinationFormSchema;

  doSubmit = () => {
    const token = localStorage.getItem('token');
    const { data } = this.state;
    const {
      submitData,
      parcel: { parcelid },
    } = this.props;
    const destination = Object.values(data).join(', ');
    this.setState({ isRequesting: true });
    submitData(token, parcelid, { destination });
  };

  render() {
    return (
      <div className="form update-form">
        <FontAwesomeIcon
          icon="window-close"
          style={{ cursor: 'pointer', color: '#0b0b61' }}
          onClick={this.props.onModalClose}
        />
        <div className="form-area">
          <h4>Destination</h4>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('streetAddress', 'Street Address')}
            {this.renderInput('city', 'City')}
            {this.renderInput('state', 'State')}
            {this.renderButton('Submit', this.state.isRequesting)}
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitData: (token, id, data) => dispatch(changeParcelDestinationRequest(token, id, data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ChangeDestinationForm);
