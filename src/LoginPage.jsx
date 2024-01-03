// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import './LoginPage.css'; // Import the CSS file for styling

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // Notify the parent component about successful login
    } catch (error) {
      console.error('Login failed: ', error.message);
    }
  };

  return (
      <div class="background">
        
    <div className="login-container">
      <h1>Login Page</h1>
      <label>Email: </label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button> </div>

      <h5>Sample Email: user@react.com</h5>
      <br />
      <h5>Sample Pass: react1</h5>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
</div>

  );
};

export default LoginPage;
