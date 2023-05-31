import React, { useState } from 'react';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
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
          window.location.href = "/";
        } else {
          console.log('Login failed');
          // Handle login failure (e.g., display an error message)
          console.log(process.env.REACT_APP_RECAPTCHA_SITE_KEY);
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        // Handle login error (e.g., display an error message)
      });
  };

  return (
    <Container fluid style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
    <Row>
      <Col className="d-flex justify-content-center">
        <Card style={{ width: "50%", backgroundColor: "lightgray", border: "5px solid black"}}>
          <Card.Img variant="top" src="/LogotipCrnoBeli.svg" style={{width: "75%", alignSelf: "center"}}></Card.Img>
          <Card.Body>
            <Card.Title>LOGIN</Card.Title>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="User" value={username} onChange={(e) => {setUsername(e.target.value)}}></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit" name="submit">Login</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </Container>
  );
}

export default Login;
