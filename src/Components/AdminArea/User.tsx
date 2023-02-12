import { useState } from "react";
import { Button } from "react-bootstrap";
import { PencilSquare, Trash3 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { UserModel } from "../../Models/UserModel";
import DeleteUser from "./DeleteUser";

interface UserProps {
  user: UserModel;
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>;
}

function User(props: UserProps): JSX.Element {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <tr>
      <td>{props.user.id}</td>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.email}</td>
      <td>{props.user.password}</td>
      <td>
        <Button variant="default">
          <Link to={"/admin/user/edit/" + props.user.id}>
            <PencilSquare />
          </Link>
        </Button>
      </td>
      <td>
        <Button onClick={handleOpen} variant="default">
          <Trash3 />
        </Button>
        <DeleteUser
          id={props.user.id}
          show={show}
          handleClose={handleClose}
          setUsers={props.setUsers}
        />
      </td>
    </tr>
  );
}

export default User;
