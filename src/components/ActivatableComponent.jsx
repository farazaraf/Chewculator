import React, { useState } from 'react';

const ActivatableComponent = () => {
  const [isActive, setIsActive] = useState(false);

  const handleActivation = () => {
    setIsActive(true);
  };

  const handleDeactivation = () => {
    setIsActive(false);
  };

  return (
    <div>
      <input
        type="text"
        onFocus={handleActivation}
        onBlur={handleDeactivation}
        placeholder="Click to activate"
      />
      <div
        onClick={handleDeactivation}
        style={{
          padding: '10px',
          backgroundColor: isActive ? 'green' : 'gray',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        {isActive ? 'Activated' : 'Click the text box to activate'}
      </div>
    </div>
  );
};

export default ActivatableComponent;
