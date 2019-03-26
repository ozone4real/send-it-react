import React from 'react';
import { shallow } from 'enzyme';
import { ChangeDestinationForm } from '../components/ChangeDestinationForm';

const props = {
  changeParcelDestinationRequest: jest.fn(),
  parcel: { parcelid: 2, destination: '12 babudu close, Isashi, Lagos' },
};

describe('Change destination form test', () => {
  const wrapper = shallow(<ChangeDestinationForm {...props} />);
  it('should test that the component rendered correctly', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('should test for its functionalities', () => {
    wrapper.instance().doSubmit();
  });
});
