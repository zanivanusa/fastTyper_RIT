import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
  
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString(),
      //redirect: 'follow', // Allow fetch to follow redirects

    })
      .then(response => {
        if (response.ok) {
          console.log('Registration successful');
          // Handle successful registration (e.g., redirect to a success page)
        } else {
          console.log('Registration failed');
          // Handle registration failure (e.g., display an error message)
        }
      })
      .catch(error => {
        console.error('Error during registration:', error);
        // Handle registration error (e.g., display an error message)
      });
  };
  

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
