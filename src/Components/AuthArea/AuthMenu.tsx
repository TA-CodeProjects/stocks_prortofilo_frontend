import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthModel } from "../../Models/AuthModel";
import store from "../../Redux/store";

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
            <Link to="logout">Logout</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="admin">Admin</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="user">User</Link>
          </Nav.Link>
        </Nav>
      ) : (
        <Nav>
          <Navbar.Text>Hello Guest</Navbar.Text>
          <Nav.Link>
            <Link to="login">login</Link>
          </Nav.Link>
        </Nav>
      )}
    </>
  );
}

export default AuthMenu;
