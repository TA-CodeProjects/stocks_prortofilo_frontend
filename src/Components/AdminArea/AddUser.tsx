import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserModel } from "../../Models/UserModel";
import { userAddedAction } from "../../Redux/AdminUserAppState";
import store from "../../Redux/store";
import notify, { SccMsg } from "../../Services/Notification";
import { addUser } from "../../WebApi/AdminApi";

function AddUser(): JSX.Element {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup.string().required("firstName is required"),
    lastName: yup.string().required("lastName is required"),
    email: yup.string().required("email is required"),
    password: yup.string().min(4).max(15).required("password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<UserModel>({ mode: "all", resolver: yupResolver(schema) });

  const add = async (user: UserModel) => {
    addUser(user).then((res) => {
      notify.success(SccMsg.ADDED_USER);
      store.dispatch(userAddedAction(res.data));
      navigate("/admin/user");
    }).catch((err) => {
        notify.error(err);
  });
}

return (
  <div className="form-style">
    <h2>Add User</h2>
    <Form onSubmit={handleSubmit(add)} className="border border-default border-3 p-4 my-5">
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control {...register("firstName")} type="text" placeholder="Enter First Name" />
        <span className="text-danger">{errors.firstName?.message}</span>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control {...register("lastName")} type="text" placeholder="Enter Last Name" />
        <span className="text-danger">{errors.lastName?.message}</span>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control {...register("email")} type="text" placeholder="Enter email" />
        <span className="text-danger">{errors.email?.message}</span>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register("password")} type="text" placeholder="Enter password" />
        <span className="text-danger">{errors.password?.message}</span>
      </Form.Group>
      <Form.Group>
        <Button disabled={!isValid} variant="primary" type="submit">
          Add
        </Button>
      </Form.Group>
    </Form>
  </div>
);
}

export default AddUser;