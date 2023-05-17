import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const requestBody = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Set content type to plain text
      },
      body: requestBody
    })
      .then(response => {
        if (response.ok) {
          console.log('Login successful');
          // Handle successful login (e.g., redirect to a logged-in page)
        } else {
          console.log('Login failed');
          // Handle login failure (e.g., display an error message)
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        // Handle login error (e.g., display an error message)
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
