import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Song App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/songs">Songs</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
