import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from '../components/NavBar';

describe('NavBar test', () => {
  const wrapper = shallow(<NavBar />);
  it('should test that the component rendered correctly', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('.container')).toHaveLength(1);
    expect(wrapper.find('.nav-bar-button')).toHaveLength(1);
    expect(wrapper.find('#nav-contents')).toHaveLength(1);
  });

  it('should test for its functionalities', () => {
    wrapper.instance().componentDidMount();
  });
});
