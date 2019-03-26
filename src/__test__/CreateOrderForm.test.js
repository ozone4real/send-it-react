import React from 'react';
import { shallow } from 'enzyme';
import { CreateOrderForm } from '../components/CreateOrderForm';

const props = {
  createParcelOrderRequest: jest.fn(),
  fetchAllUserParcels: jest.fn(),
  createParcelOrder: jest.fn(),
  history: { push: jest.fn() },
  singleParcel: { isRequesting: false, data: { status: 'pending' } },
};

const prevProps = { singleParcel: { status: 'in transit' } };

describe('create order form test', () => {
  const wrapper = shallow(<CreateOrderForm {...props} />);
  it('should test that the component rendered correctly', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should test for its functionalities', () => {
    wrapper.instance().componentDidUpdate(prevProps);
    wrapper.instance().doSubmit();
    wrapper.instance().submitConfirmedData();
    wrapper.instance().removeModal();
    props.singleParcel = {};
    wrapper.setProps({ ...props });
    wrapper.instance().componentDidUpdate(prevProps);
  });
});
