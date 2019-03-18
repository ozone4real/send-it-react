import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SuccessMessage = ({ message }) => {
  return (
    <div className="successMessage">
      <h3>{message}</h3>
      <FontAwesomeIcon icon="check-circle" size="3x" />
    </div>
  );
};

export default SuccessMessage;
