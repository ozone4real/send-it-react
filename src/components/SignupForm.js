import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from './common/Form';
import { signUpUser } from '../actions/authActions';
import { fetchAllUserParcels } from '../actions/parcelsActions';
import { signupFormSchema } from '../utils/validationSchemas';

class SignupForm extends Form {
  state = {
    data: { firstName: '', lastName: '', phoneNo: '', email: '', password: '' },
    errors: {},
  };

  schema = signupFormSchema;

  componentDidUpdate(prevProps) {
    if (prevProps.user === this.props.user) return;
    if (this.props.user.errorMessage) {
      const errors = { email: this.props.user.errorMessage };
      this.setState({ errors });
    }
    if (this.props.user.isLoggedIn) {
      fetchAllUserParcels(localStorage.getItem('token'));
      location.replace('/createOrder');
      return;
    }
  }

  doSubmit() {
    const { signUpUser } = this.props;
    const data = { ...this.state.data };
    data.fullname = `${data.firstName} ${data.lastName}`;
    delete data.firstName;
    delete data.lastName;
    signUpUser(data);
  }

  render() {
    return (
      <div className="container">
        <div className="form">
          <div className="form-area">
            <h3>Sign Up</h3>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput('firstName', 'First Name')}
              {this.renderInput('lastName', 'Last Name')}
              {this.renderInput('phoneNo', 'Phone Number', 'number')}
              {this.renderInput('email', 'Email', 'email')}
              {this.renderInput('password', 'Password', 'password')}
              {this.renderButton('Sign Up', this.props.user.isRequesting)}
              <p>
                Already have an account? <Link to={'/signin'}>Sign In</Link>
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
  signUpUser: data => dispatch(signUpUser(data)),
  fetchAllUserParcels: token => dispatch(fetchAllUserParcels(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupForm);
