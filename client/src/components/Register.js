import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const reRef = useRef();

  const handleRegister = async (e) => {
    e.preventDefault();
    const token = await reRef.current.executeAsync();
    reRef.current.reset();
    
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('token', token);  // reCAPTCHA token

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
          window.location.href = "/login";
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
    <Container fluid style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card style={{ width: "50%" }}>
            <Card.Img variant="top" src="/logotipBarvni.svg"></Card.Img>
            <Card.Body>
              <Card.Title>Register</Card.Title>

              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="User" value={username} onChange={(e) => {setUsername(e.target.value)}}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="" value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" name="submit">Register</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        size='invisible'
        ref={reRef}
      />
    </Container>
  );
}

export default Register;
