import { Container, Nav, Navbar } from "react-bootstrap";
import { BarChart } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";
import AuthMenu from "../AuthArea/AuthMenu";
import CustomLink from "../SharedArea/CustomLink";

function Header(): JSX.Element {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <h2>
              <BarChart size={24} /> Stocks
            </h2>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <CustomLink to="home">Home</CustomLink>
              </Nav.Link>
            </Nav>
            <AuthMenu />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
    
}

export default Header;