import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";

const keyboard_container_style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '50%',
    height: '200px',
    backgroundColor: 'gray',
}

function Index() {
    return(
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
                    <div style={{ display:"flex", justifyContent: "center", alignItems: "center", width: '40%', height: '150px', textAlign: "center"}} className="text-input-display">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</div>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <div className="keyboard-container" style={keyboard_container_style}>
                        <div className="tmp-text" style={{  }}>Keyboard goes here</div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Index;