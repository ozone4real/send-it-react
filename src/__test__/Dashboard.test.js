import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Dashboard } from '../components/Dashboard';

const props = { user: { userData: {} }, userParcels: {} };

describe('dashboard test', () => {
  const wrapper = shallow(<Dashboard {...props} />);
  it('should test that the component rendered correctly', () => {
    expect(wrapper.length).toEqual(1);
  });
});
