import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { UserModel } from "../../Models/UserModel";
import { usersDownloadedAction } from "../../Redux/AdminUserAppState";
import store from "../../Redux/store";
import { useToken } from "../../Services/LoginHook";
import notify, { SccMsg } from "../../Services/Notification";
import { getUsers } from "../../WebApi/AdminApi";
import CustomLink from "../SharedArea/CustomLink";
import User from "./User";

function UserList(): JSX.Element {
  const [users, setUsers] = useState<UserModel[]>(
    store.getState().adminUserState.users
  );

  useToken();

  useEffect(() => {
    if (users.length === 0) {
      getUsers()
        .then((res) => {
          notify.success(SccMsg.GOT_USERS);
          setUsers(res.data);
          store.dispatch(usersDownloadedAction(res.data));
        })
        .catch((err) => notify.error(err.message));
    }
  }, [users]);

  return (
    <div className="UserList">
      <h2>Users</h2>
      <ButtonGroup>
        <Button variant="secondary">
          <CustomLink to="/admin">Back</CustomLink>
        </Button>
        <Button variant="primary">
          <CustomLink to="/admin/user/add">Add User</CustomLink>
        </Button>
      </ButtonGroup>
      {users.length > 0 ? (
        <div className="pt-2">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User key={user.id} user={user} setUsers={setUsers} />
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <h3 className="mt-4 text-muted">No users found!</h3>
      )}
    </div>
  );
}

export default UserList;
