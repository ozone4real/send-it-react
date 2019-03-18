import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SiteLogo = () => {
  return (
    <div className="site-logo">
      <NavLink to="/">
        <span>
          <h1>SeNd It</h1>....
          <FontAwesomeIcon icon="shipping-fast" size="2x" />
        </span>
      </NavLink>
      <i className="logo-foot-note" style={{ color: 'white' }}>
        fast, reliable, efficient
      </i>
    </div>
  );
};

export default SiteLogo;
