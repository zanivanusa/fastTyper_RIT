import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import CountdownTimer from "./CountdownTimer";
import Statistics from './Stats';
import './Style.css'

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
  margin: "10px", // Adjust the margin value as per your preference
  boxSizing: "border-box",
  border: "1px solid black",
  borderRadius: "2px",
  textAlign: "center"
}

function Index() {
  const [targetText, setTargetText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.');
  const [typedText, setTypedText] = useState('');
  const [keyboardLayout, setLayout] = useState("qwertyuiopasdfghjkl;zxcvbnm,.");
  const [playing, setPlaying] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (playing) {
      setShowScore(false);
      inputRef.current = document.querySelector(".keyboard-input");
      const inputElement = inputRef.current;
      inputElement.addEventListener("input", handleInput);
      inputElement.addEventListener("keydown", keyDown);
      inputElement.addEventListener("keyup", keyUp);
      inputElement.addEventListener("blur", outOfFocus);
      inputElement.addEventListener("focus", inFocus);
      focusInput();
    } else {
      const inputElement = inputRef.current;
      if (inputRef.current !== null) {
        inputElement.removeEventListener("input", handleInput);
        inputElement.removeEventListener("keydown", keyDown);
        inputElement.removeEventListener("keyup", keyUp);
        inputElement.removeEventListener("blur", outOfFocus);
        inputElement.removeEventListener("focus", inFocus);
      }
    }
  }, [playing]);

  useEffect(() => {
    if (playing && typedText.length >= targetText.length) {
      setPlaying(false);
      setShowScore(true);
    }
  }, [typedText]);

  useEffect(() => {
    if (showScore) {
      const numOfMatches = countSameCharacters(typedText, targetText);
      const accuracy = Math.round((numOfMatches / targetText.length) * 100);
      setAccuracy(accuracy);
      setTypedText('');
    }
  }, [showScore]);

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
    const el = document.querySelector(".text-input-display");
    if (el !== null) {
      el.style.filter = "blur(5px)";
    }
  };

  const inFocus = (event) => {
    const el = document.querySelector(".text-input-display");
    if (el !== null) {
      el.style.filter = "";
    }
  };

  const handleTimerEnd = () => {
    setPlaying(false);
    setShowScore(true);
  };

  const countSameCharacters = (str1, str2) => {
    const shortestLength = Math.min(str1.length, str2.length);
    let count = 0;
    for (let i = 0; i < shortestLength; i++) {
      if (str1[i] === str2[i]) {
        count++;
      }
    }
    return count;
  }

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
        <Col className="text-center">
          <Button onClick={() => { 
            setPlaying(prev => !prev); 
            setShowScore(true);
          }}>{playing ? 'Stop': 'Start'}</Button>
        </Col>
      </Row>

      {playing && <>
        <Row>
          <Col className="d-flex justify-content-center">
            <img alt="" src="/TimerIcon.png" width="30" height="30" className="d-inline-block align-top"></img>
            <CountdownTimer onTimerEnd={handleTimerEnd} />
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
        <Row>
        <Col className="d-flex justify-content-center">
          <Statistics />
        </Col>
      </Row>
        <div style={{ overflow: "hidden", width: "0px" }}>
          <input className="keyboard-input" style={{ display: "absolute", top: "100px" }} ref={inputRef}></input>
        </div>
      </>}
      {showScore &&
        <>
          <Row>
            <Col className="d-flex justify-content-center">
              <img alt="" src="/TargetIcon.png" width="30" height="30" className="d-inline-block align-top"></img>
              <h5> Accuracy: {accuracy}%</h5>
            </Col>
          </Row>
        </>}
    </Container>
  );
}

export default Index;