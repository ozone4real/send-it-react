import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import ParcelDeliveryHistory from './ParcelDeliveryHistory';
import Profile from './Profile';

const Dashboard = ({ user, userParcels }) => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="dashboard-nav">
          <NavLink
            className="nav-link"
            activeClassName="selected-dashboard-link"
            to="/dashboard/deliveryhistory"
          >
            My Delivery History
          </NavLink>
          <NavLink
            className="nav-link"
            activeClassName="selected-dashboard-link"
            to="/dashboard/profile"
          >
            My Profile
          </NavLink>
        </div>
        <Route
          path="/dashboard/profile"
          render={props => (
            <Profile {...props} userData={user.userData} user={user} userParcels={userParcels} />
          )}
        />
        <Route
          path="/dashboard/deliveryhistory"
          render={props => <ParcelDeliveryHistory {...props} userParcels={userParcels} />}
        />
      </div>
    </React.Fragment>
  );
};

export { Dashboard };

export default Dashboard;
