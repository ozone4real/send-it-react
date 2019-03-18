import React from 'react';
import SiteLogo from './SiteLogo';
import UserAccountOptions from './UserAccountOptions';

const Header = ({ signOutUser }) => {
  return (
    <header>
      <div className="container">
        <SiteLogo />
        <UserAccountOptions signOutUser={signOutUser} />
      </div>
    </header>
  );
};

export default Header;
