import { useState } from "react";
import { Button } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import { UserModel } from "../../Models/UserModel";
import { totalPortfolio, totalProfit } from "../SharedArea/Utils";
import DeleteUser from "./DeleteUser";
import UserDetail from "./UserDetail";

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
      <td>{props.user.email}</td>
      <td>{totalPortfolio(props.user.stocks)}</td>
      <td>{totalProfit(props.user.stocks)}</td>
      <td>
        <UserDetail user={props.user} />
      </td>
      <td>
        {props.user.email !== "admin@admin.com" && (
          <>
            <Button onClick={handleOpen} variant="secondary">
              <Trash3 />
            </Button>
            <DeleteUser
              id={props.user.id}
              show={show}
              handleClose={handleClose}
              setUsers={props.setUsers}
            />
          </>
        )}
      </td>
    </tr>
  );
}

export default User;
