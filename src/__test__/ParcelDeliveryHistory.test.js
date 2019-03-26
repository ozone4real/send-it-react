import React from 'react';
import { shallow } from 'enzyme';
import { ParcelDeliveryHistory } from '../components/ParcelDeliveryHistory';

const props = {
  singleParcel: {
    data: { status: 'in transit', parcelId: 3, destination: 'djjjejej', price: 800 },
  },
  userParcels: [{ status: 'in transit', parcelId: 3 }],
  changeParcelDestination: jest.fn(),
  cancelParcelDelivery: jest.fn(),
};

const prevProps = {
  singleParcel: { data: { status: 'pending', parcelId: 5, destination: 'djjjejej', price: 800 } },
};

describe('Parcel delivery history test', () => {
  const wrapper = shallow(<ParcelDeliveryHistory {...props} />);
  it('should test that the component rendered correctly', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should test for its functionalities', () => {
    wrapper.instance().componentDidUpdate(prevProps);
    wrapper.instance().componentDidMount();
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    wrapper.instance().handleCategorySelect({ parcelId: 5 });
    wrapper.instance().removeModal();
    wrapper.instance().handleChangeDestination(props.singleParcel.data);
    wrapper.instance().handleCancelDelivery();
    wrapper.instance().handleCancelButtonClick(props.singleParcel.data);
    wrapper.instance().handlePageClick(2);
    wrapper.instance().handleSubmitUpdatedDestination('ejkeek');
    wrapper.setProps({ userParcels: [] });
    wrapper.setProps({ userParcels: { errorMessage: 'You have no parcel delivery orders' } });
    wrapper.setProps({
      singleParcel: {},
    });
    wrapper.instance().componentDidUpdate(prevProps);
  });
});
