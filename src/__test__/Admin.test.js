import React from 'react';
import { shallow, mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import Header from '../components/Header';
import SiteLogo from '../components/Header/SiteLogo';
import Admin from '../components/Admin';
import Pagination from '../components/Pagination';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

describe('test admin component', () => {
  const initialState = { admin: {} };
  const mockStore = configureStore([thunk]);
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(
      <Provider store={store}>
        <Admin />
      </Provider>,
    );
  });

  it('should render the Admin component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should check if the prop matches the initial state', () => {
    expect(wrapper.props().value.storeState.admin).toEqual(initialState.admin);
  });
});

// describe('Test header component redux connection', () => {
//   it('');
// });
