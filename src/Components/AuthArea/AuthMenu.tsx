import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthModel } from "../../Models/AuthModel";
import store from "../../Redux/store";
import CustomLink from "../SharedArea/CustomLink";

function AuthMenu(): JSX.Element {
  const [user, setUser] = useState<AuthModel>(store.getState().authState.user);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUser(store.getState().authState?.user || new AuthModel());
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {user?.jwt_token ? (
        <Nav>
          <Navbar.Text>Hello {user.username}</Navbar.Text>
          <Nav.Link>
            <CustomLink to="logout">Logout</CustomLink>
          </Nav.Link>
          <Nav.Link>
            <CustomLink to="admin">Admin</CustomLink>
          </Nav.Link>
          <Nav.Link>
            <CustomLink to="user">User</CustomLink>
          </Nav.Link>
        </Nav>
      ) : (
        <Nav>
          <Navbar.Text>Hello Guest</Navbar.Text>
          <Nav.Link>
            <CustomLink to="login">login</CustomLink>
          </Nav.Link>
        </Nav>
      )}
    </>
  );
}

export default AuthMenu;
