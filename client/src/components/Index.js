import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const keyboard_container_style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: '50%',
  height: '200px',
  backgroundColor: 'gray',
}

function Index() {
  const [targetText, setTargetText] = useState("hello world");
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const inputElement = document.querySelector(".keyboard-input");
    inputElement.addEventListener("input", handleInput);
    return () => {
      inputElement.removeEventListener("input", handleInput);
    };
  }, []);

  const handleInput = (event) => {
    setTypedText(event.target.value);
  };

  const getColor = (index) => {
    if (index < typedText.length) {
      return typedText[index] === targetText[index] ? "green" : "red";
    }
    return "black";
  };

  return (
    <Container fluid style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <Row style={{ paddingBottom: "20px" }}>
        <Col className="text-center">
          <ButtonGroup>
            <Button variant="outline-dark">Test</Button>
            <Button variant="outline-dark">Practice</Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: '40%', height: '150px', textAlign: "center", whiteSpace: "pre" }} className="text-input-display">
            {targetText.split("").map((char, index) => (
              <span key={index} style={{ color: getColor(index) }}>
                {char}
              </span>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <div className="keyboard-container" style={keyboard_container_style}>
            <input className="keyboard-input"></input>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Index;