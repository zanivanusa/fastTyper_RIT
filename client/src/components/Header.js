import { Link } from "react-router-dom";
import { Navbar, Container } from 'react-bootstrap';

function Header() {
    return(
        <header>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container style={{ disply:'flex', justifyContent:'left' }}>
                <Navbar.Brand as={Link} to="/">
                    <img alt="" src="/logo192.png" width="32" height="32" className="d-inline-block align-top"></img>
                    {' '}FastTyper
                </Navbar.Brand>
                </Container>
                <Container style={{ disply:'flex', justifyContent:'right' }}>
                    <Navbar.Brand as={Link} to="/login">Login</Navbar.Brand>
                    <Navbar.Brand as={Link} to="/register">Register</Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;