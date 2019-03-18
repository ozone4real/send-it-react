import React, { Component } from 'react';
import Utils from '../../utils';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class UserAccountOptions extends Component {
  renderAccountMenu = () => {
    const { isLoggedIn, userData } = this.props.user;
    if (!isLoggedIn)
      return (
        <ul id="account-menu">
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <hr />
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      );
    return (
      <ul id="account-menu">
        <li>
          <Link to="/dashboard/profile">My Profile</Link>
        </li>
        <hr />
        {userData.isadmin && (
          <React.Fragment>
            <li>
              <Link to="/admin">Manage Parcels</Link>
            </li>
            <hr />
          </React.Fragment>
        )}
        <li>
          <Link to="/dashboard/deliveryhistory">My Parcels</Link>
        </li>
        <hr />
        <li onClick={this.props.signOutUser}>Logout</li>
      </ul>
    );
  };

  render() {
    return (
      <div className="account">
        <div className="user">
          <span className="user-icon">
            <FontAwesomeIcon icon="user-circle" size="2x" />
          </span>
          <span className="tip" />
          {this.renderAccountMenu()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserAccountOptions);
