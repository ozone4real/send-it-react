import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../components/Pagination';

const props = { pageSize: 8, currentPage: 1, itemsCount: 7, onPageClick: jest.fn() };

describe('Pagination test', () => {
  const wrapper = shallow(<Pagination {...props} />);
  it('should test that the component rendered correctly', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should test for its functionalities', () => {
    wrapper.setProps({ itemsCount: 9 });
    wrapper
      .find('li')
      .at(0)
      .simulate('click');
  });
});
