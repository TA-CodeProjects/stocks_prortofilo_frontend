import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthMenu from "../AuthArea/AuthMenu";

function Header(): JSX.Element {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <h2>Stocks</h2>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav.Link>
              <Link to="home">Home</Link>
            </Nav.Link>
            <AuthMenu />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
    
}

export default Header;