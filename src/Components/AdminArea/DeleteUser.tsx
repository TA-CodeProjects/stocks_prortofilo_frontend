import { Button, Modal } from "react-bootstrap";
import { UserModel } from "../../Models/UserModel";
import { userDeleteAction } from "../../Redux/AdminUserAppState";
import store from "../../Redux/store";
import notify, { SccMsg } from "../../Services/Notification";
import { deleteUser } from "../../WebApi/AdminApi";

interface DeleteUserProps {
  id: number;
  show: boolean;
  handleClose: any;
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>;
}

function DeleteUser(props: DeleteUserProps): JSX.Element {
  const yes = () => {
    deleteUser(props.id)
    .then(any => {
        notify.success(SccMsg.DELETE_USER);
        store.dispatch(userDeleteAction(props.id));
        props.handleClose();
    })
    .catch(err => notify.error(err));
    return store.subscribe(() => {
      props.setUsers(store.getState().adminUserState.users);
    });
  };

  const no = () => {
    props.handleClose();
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user #{props.id}?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={yes} variant="danger" className="mx-2">Yes</Button>
          <Button onClick={no} variant="secondary">No</Button>
      </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
