import React from 'react';
import Form from './common/Form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInUser } from '../actions/authActions';
import { fetchAllUserParcels } from '../actions/parcelsActions';
import { signinFormSchema } from '../utils/validationSchemas';

class SigninForm extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
  };

  schema = signinFormSchema;

  componentDidUpdate(prevProps) {
    if (prevProps.user === this.props.user) return;
    const { user, fetchAllUserParcels, history } = this.props;
    if (user.errorMessage) {
      const errors = { email: user.errorMessage };
      this.setState({ errors });
    }
    if (user.isLoggedIn) {
      fetchAllUserParcels(localStorage.getItem('token'));
      history.push('/createOrder');
      return;
    }
  }

  doSubmit = () => {
    const { signInUser } = this.props;
    signInUser(this.state.data);
  };

  render() {
    return (
      <div className="container">
        <div className="form">
          <div className="form-area">
            <h3>Sign In</h3>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput('email', 'Email', 'email')}
              {this.renderInput('password', 'Password', 'password')}
              {this.renderButton('Sign In', this.props.user.isRequesting)}
              <p>
                Don't have an account? <Link to={'/signup'}>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signInUser: data => dispatch(signInUser(data)),
  fetchAllUserParcels: token => dispatch(fetchAllUserParcels(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SigninForm);
