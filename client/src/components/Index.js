import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const keyboard_container_style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "420px",
  flexWrap: "wrap",
}

const key_container_style = {
  height: "40px", 
  width: "40px", 
  margin: "1px",
  boxSizing: "border-box", 
  border: "1px solid black", 
  borderRadius: "2px", 
  textAlign: "center"
}

function Index() {
  const [targetText, setTargetText] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.");
  const [typedText, setTypedText] = useState('');
  const [keyboardLayout, setLayout] = useState("qwertyuiopasdfghjkl;zxcvbnm,.");

  const inputElement = document.querySelector(".keyboard-input");

  useEffect(() => {
    const inputElement = document.querySelector(".keyboard-input");
    inputElement.addEventListener("input", handleInput);
    inputElement.addEventListener("keydown", keyDown);
    inputElement.addEventListener("keyup", keyUp);
    inputElement.addEventListener("blur", outOfFocus);
    inputElement.addEventListener("focus", inFocus);
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

  const focusInput = () => {
    document.querySelector(".keyboard-input").focus();
  };

  const keyDown = (event) => {
    if (keyboardLayout.includes(event.key)) {
      const pressedKey = document.querySelector("#key-" + event.key.charCodeAt(0))
      pressedKey.style.backgroundColor = "black";
      pressedKey.style.color = "white";
    }
  };

  const keyUp = (event) => {
    if (keyboardLayout.includes(event.key)) {
      console.log(event.key.charCodeAt(0))
      const pressedKey = document.querySelector("#key-" + event.key.charCodeAt(0))
      pressedKey.style.backgroundColor = "white";
      pressedKey.style.color = "black";
    }
  };

  const outOfFocus = (event) => {
    document.querySelector(".text-input-display").style.filter = "blur(5px)";
  };

  const inFocus = (event) => {
    document.querySelector(".text-input-display").style.filter = "";
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
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", width: '40%', height: '150px', textAlign: "center", whiteSpace: "pre", filter: "blur(5px)" }} className="text-input-display" onClick={focusInput}>
            {targetText.split("").map((char, index) => (
              <span key={index} style={{ color: getColor(index), fontSize: "20px" }}>
                {char}
              </span>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <div className="keyboard-container" style={keyboard_container_style}>
            {keyboardLayout.split("").map((char, index) => (
              <div key={index} id={"key-" + char.charCodeAt(0)} style={key_container_style}> {char} </div>
            ))}
          </div>
        </Col>
      </Row>
      <div style={{ overflow: "hidden", width: "0px" }}>
          <input className="keyboard-input" style={{ display: "absolute", top: "100px" }}></input>
      </div>
    </Container>
  );
}

export default Index;