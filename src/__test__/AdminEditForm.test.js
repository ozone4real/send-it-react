import React from 'react';
import { shallow } from 'enzyme';
import { AdminEditForm } from '../components/AdminEditForm';

const props = {
  onModalClose: jest.fn(),
  updateParcel: jest.fn(),
  displaySuccessMessage: jest.fn(),
  adminEditParcel: jest.fn(),
  parcel: { status: 'in transit', presentlocation: 'jensssnsn' },
};

describe('Admin form test', () => {
  const wrapper = shallow(<AdminEditForm {...props} />);
  it('should test that the component rendered correctly', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('should test for its functionalities', () => {
    wrapper.instance().doSubmit();
    wrapper.setState({ data: { presentlocation: 'msmsmsm', status: 'in transit' } });
    wrapper.setProps({ parcel: { status: 'pending' } });
    wrapper.instance().componentDidMount();
    wrapper.setState({ data: { status: 'delivered' } });
  });
});
