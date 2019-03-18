import React from 'react';
import { shallow } from 'enzyme';
import About from '../components/About';
import SiteLogo from '../components/Header/SiteLogo';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import Services from '../components/Services';
import InfoTiles from '../components/Home/InfoTiles';
import SuccessMessage from '../components/common/SuccessMessage';
import Input from '../components/common/input';

describe('About test', () => {
  const wrapper = shallow(<About />);
  it('should render the "about" component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('section')).toHaveLength(1);
  });
});

describe('Site Logo test', () => {
  const wrapper = shallow(<SiteLogo />);
  it('should render the "site logo" component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('How it works test', () => {
  const wrapper = shallow(<HowItWorks />);
  it('should render the "how it works" component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('Footer test', () => {
  const wrapper = shallow(<Footer />);
  it('should render the footer component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('Services test', () => {
  const wrapper = shallow(<Services />);
  it('should render the "services" component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('Info tiles test', () => {
  const wrapper = shallow(<InfoTiles />);
  it('should render the "info tiles" component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('Success message test', () => {
  const wrapper = shallow(<SuccessMessage />);
  it('should render the "success message" component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('input test', () => {
  const wrapper = shallow(<Input />);
  it('should render the "input" component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
