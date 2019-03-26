import React from 'react';
import { shallow } from 'enzyme';
import { ListGroup } from '../components/ListGroup';

const props = {
  listItems: [{ id: 3, label: 'Ozone' }],
  onItemSelect: jest.fn(),
  selectedItem: { id: 3, label: 'Ozone' },
};

describe('List group test', () => {
  const wrapper = shallow(<ListGroup {...props} />);
  it('should test that the component rendered correctly', () => {
    expect(wrapper.length).toEqual(1);
    wrapper
      .find('li')
      .at(0)
      .simulate('click');
    wrapper.setProps({ selectedItem: props.listItems[0] });
  });
});
