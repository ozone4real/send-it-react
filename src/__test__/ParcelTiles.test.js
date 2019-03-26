import React from 'react';
import { shallow } from 'enzyme';
import ParcelTiles from '../components/ParcelTiles';

const props = {
  data: [
    {
      parcelid: 1,
      status: 'in transit',
      pickupaddress: 'djddj',
      destination: 'dhhhhd',
      presentlocation: 'kdkk933',
      price: 4000,
    },
    {
      parcelid: 2,
      status: 'pending',
      pickupaddress: 'djddj',
      destination: 'dhhhhd',
      presentlocation: 'kdkk933',
      price: 4000,
    },
  ],
  onChangeDestination: jest.fn(),
  onCancelButtonClick: jest.fn(),
};

describe('Parcel tiles test', () => {
  const wrapper = shallow(<ParcelTiles {...props} />);
  it('should test that the component rendered correctly', () => {
    expect(wrapper.length).toEqual(2);
  });

  it('should test for its functionalities', () => {
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
  });
});
