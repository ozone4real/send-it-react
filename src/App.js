import React, { Component } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import Home from './components/Home';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  faShippingFast,
  faUserCircle,
  faSpinner,
  faBars,
  faHome,
  faInfoCircle,
  faCogs,
  faPhone,
  faBuilding,
  faUser,
  faEdit,
  faWindowClose,
  faCheckCircle,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { signOutUser, authenticateUser } from './actions/authActions';
import { fetchAllUserParcels } from './actions/parcelsActions';
import Header from './components/Header';
import NavBar from './components/NavBar';
import './App.css';
import About from './components/About';
import Services from './components/Services';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';
import CreateOrderForm from './components/CreateOrderForm';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';

library.add(
  faShippingFast,
  faUserCircle,
  faSpinner,
  faBars,
  faHome,
  faInfoCircle,
  faCogs,
  faPhone,
  faBuilding,
  faUser,
  faEdit,
  faWindowClose,
  faCheckCircle,
  faEllipsisH,
);

class App extends Component {
  state = {};
  async componentDidMount() {
    const { onLoad, fetchAllUserParcels } = this.props;
    const token = localStorage.getItem('token');
    await onLoad(token);
    fetchAllUserParcels(token);
  }

  componentDidUpdate() {
    if (
      !this.props.user.isLoggedIn &&
      !this.props.user.isRequesting &&
      (this.props.location.pathname === '/createOrder' ||
        this.props.location.pathname.match('/dashboard'))
    )
      this.props.history.replace('/signin');
  }

  render() {
    const { signOutUser, user, parcelData: userParcels } = this.props;
    return (
      <div>
        <Header signOutUser={signOutUser} />
        <NavBar />
        <main className="main">
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/signin" component={SigninForm} />
            <Route path="/createOrder" component={CreateOrderForm} />
            <Route path="/admin" component={Admin} />
            <Route
              path="/dashboard"
              render={props => <Dashboard {...props} user={user} userParcels={userParcels} />}
            />
            <Route path="/" component={Home} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  parcelData: state.parcelData,
});

const mapDispatchToProps = dispatch => ({
  onLoad: token => dispatch(authenticateUser(token)),
  signOutUser: () => dispatch(signOutUser()),
  fetchAllUserParcels: token => dispatch(fetchAllUserParcels(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
