import React, { useState } from 'react';
import LoginPage from './LoginPage';
import Calculator from './components/Calculator';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
        <Calculator />
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;