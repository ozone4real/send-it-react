import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Utils from '../utils';
import { Wave } from 'better-react-spinkit';
import { updatePhoneNo } from '../actions/authActions';
import { connect } from 'react-redux';

const { formatDate } = Utils;

class Profile extends Component {
  state = { phoneNo: '' };

  handleEditButtonClick = () => {
    this.setState({ displayInput: true, phoneNo: this.props.userData.phoneno });
  };

  handleChange = e => {
    const phoneNo = e.target.value;
    this.setState({ phoneNo });
  };

  submitPhoneNo = async e => {
    e.preventDefault();
    await this.props.updatePhoneNo({ phoneNo: this.state.phoneNo });
    this.setState({ displayInput: false });
  };

  render() {
    if (this.props.user.isRequesting) {
      return (
        <div className="div-spinner">
          <Wave size={100} color={'#0b0b61'} />
        </div>
      );
    }
    const {
      userData: { fullname, email, registered, phoneno },
      userParcels,
    } = this.props;
    const { displayInput } = this.state;
    return (
      <div className="profile">
        <ul>
          <li>
            <FontAwesomeIcon icon="user" size="5x" color="#0b0b61" />
          </li>
          <li>
            <h3>{fullname}</h3>
          </li>
          <li>
            <b>Phone: </b>{' '}
            {displayInput ? (
              <React.Fragment>
                <input
                  type="text"
                  placeholder="phone number"
                  name="phoneNo"
                  value={this.state.phoneNo}
                  onChange={this.handleChange}
                  style={{
                    borderWidth: '0 0 1px 0',
                    outline: 'none',
                    fontSize: '14px',
                    paddingLeft: '10px',
                  }}
                />{' '}
                <button onClick={this.submitPhoneNo}>submit</button>
              </React.Fragment>
            ) : (
              <span>
                {this.state.phoneNo || phoneno}
                <FontAwesomeIcon
                  icon="edit"
                  color="#0b0b61"
                  onClick={this.handleEditButtonClick}
                  style={{ marginLeft: '8px', cursor: 'pointer' }}
                />{' '}
              </span>
            )}
          </li>
          <li>
            <b>Email: </b>
            {email}
          </li>
          <li>
            <b>Date Registered: </b>
            {formatDate(registered)}
          </li>
          <li>
            <b>Total Parcels: </b> {userParcels.length || 0}
          </li>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updatePhoneNo: payload => dispatch(updatePhoneNo(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Profile);
