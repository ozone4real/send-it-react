import React from 'react';
import { shallow, mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { create } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import Header from '../components/Header';
import { Provider } from 'react-redux';
import UserAccountOptions from '../components/Header/UserAccountOptions';
import SiteLogo from '../components/Header/SiteLogo';
import HomePage from '../components/Home';
import App from '../App';

configure({ adapter: new Adapter() });

const props = { signOutUser: jest.fn() };

const setUp = () => {
  const props = { signOutUser: jest.fn() };
  const component = shallow(<Header {...props} />);
  return component;
};

describe('Header component test', () => {
  const initialState = {};
  const mockStore = configureStore([thunk]);
  let component, store;

  beforeEach(() => {
    store = mockStore(initialState);
    component = setUp();
  });

  it('should render the Header component', () => {
    expect(component.exists()).toBe(true);
  });

  it('should render sub-components', () => {
    expect(component.find('SiteLogo')).toHaveLength(1);
    expect(component.find('div.container')).toHaveLength(1);
    expect(component.find('UserAccountOptions')).toHaveLength;
  });
});

function userPage(args) {
  let defaultProps = {
    user: { detail: { name: '', role: '' } },
    parcels: [],
    loadParcel: () => {},
  };
  const props = { ...defaultProps, ...args };
  return shallow(<UserPage {...props} />);
}
