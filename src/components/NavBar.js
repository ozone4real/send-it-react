import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NavBar extends Component {
  state = {};

  componentDidMount() {
    const navLinks = document.getElementById('nav-links');
    const navContents = document.getElementById('nav-contents');
    const userIcon = document.querySelector('.user-icon');
    const accountMenu = document.getElementById('account-menu');
    const accountMenuTip = document.querySelector('.tip');
    const removeNavBarClasses = () => {
      navLinks.classList.remove('responsive-nav');
      navContents.classList.remove('responsive-nav');
      document.body.classList.remove('preventScroll');
    };

    document.addEventListener('click', e => {
      if (e.target.closest('.nav-bar-button')) {
        navLinks.classList.toggle('responsive-nav');
        navContents.classList.toggle('responsive-nav');
        document.body.classList.toggle('preventScroll');
        return;
      }

      if (e.target.closest('.user-icon')) {
        accountMenu.classList.toggle('display-menu');
        accountMenuTip.classList.toggle('display-tip');
        const userIconPos = userIcon.getBoundingClientRect();
        const accountMenuPos = accountMenu.getBoundingClientRect();
        const centerHorizontally = elem => {
          elem.style.left = `${userIconPos.left - (elem.offsetWidth - userIcon.offsetWidth) / 2}px`;
        };

        centerHorizontally(accountMenu);
        centerHorizontally(accountMenuTip);

        accountMenuTip.style.top = `${accountMenuPos.top - accountMenuTip.offsetHeight}px`;
        return;
      }

      accountMenu.classList.remove('display-menu');
      accountMenuTip.classList.remove('display-tip');
      removeNavBarClasses();
    });
  }

  render() {
    return (
      <nav>
        <div className="container">
          <span className="nav-bar-button">
            <FontAwesomeIcon icon="bars" />
          </span>
          <div id="nav-contents">
            <div id="nav-links">
              <NavLink to="/" exact activeClassName="selected-link">
                <FontAwesomeIcon icon="home" />
                Home
              </NavLink>
              <NavLink to="/about" activeClassName="selected-link">
                <FontAwesomeIcon icon="info-circle" /> About us
              </NavLink>
              <NavLink to="/services" activeClassName="selected-link">
                <FontAwesomeIcon icon="building" /> Services
              </NavLink>
              <NavHashLink smooth="true" to="/#how-it-works" activeClassName="selected-link">
                <FontAwesomeIcon icon="cogs" /> How it works
              </NavHashLink>
              <NavHashLink smooth="true" to="#contacts" activeClassName="selected-link">
                <FontAwesomeIcon icon="phone" /> Contacts
              </NavHashLink>
            </div>
          </div>
          <div id="book">
            <NavLink to="/dashboard/deliveryhistory">Track</NavLink>
            <NavLink to="/createOrder" activeClassName="selected-link">
              Create an order
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export { NavBar };
export default NavBar;
