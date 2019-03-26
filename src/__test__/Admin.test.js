import React from 'react';
import { shallow } from 'enzyme';

import { Admin } from '../components/Admin';

const props = {
  admin: {
    allParcels: [
      { status: 'in transit', parcelid: 'h30-3h330-33hhsh', userid: '383j-ejej8-e3899e' },
      { status: 'pending', parcelid: 'h30-3h330-33h', userid: '383j-ejej8-e899e' },
    ],
  },
  fetchAllParcels: jest.fn(),
};

describe('test admin component', () => {
  const wrapper = shallow(<Admin {...props} />);

  it('should render the Admin component', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('should test for its functionalities', () => {
    wrapper.setState({ modalContent: undefined });
    wrapper.instance().componentDidMount();
    wrapper.instance().displaySuccessMessage();
    wrapper.instance().removeModal();
    wrapper.instance().handlePageClick(2);
    const item = wrapper.state().categories[3];
    wrapper.instance().handleCategorySelect(item);
    wrapper.instance().handleUpdateParcel(props.admin.allParcels[0]);
    console.log(wrapper.find('button').length);
    wrapper.setProps({ admin: {} });
  });
});
