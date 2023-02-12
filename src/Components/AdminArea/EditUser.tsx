import { useState } from "react";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { UserModel } from "../../Models/UserModel";
import store from "../../Redux/store";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser } from "../../WebApi/AdminApi";
import notify, { SccMsg } from "../../Services/Notification";
import { userUpdateAction } from "../../Redux/AdminUserAppState";
import { Button, Form } from "react-bootstrap";

function EditUser(): JSX.Element {
  const navigate = useNavigate();

  const params = useParams();
  const id = +(params.id || "");

  const [user, setUser] = useState<UserModel>(
    store.getState().adminUserState.users.filter((user) => user.id === id)[0]
  );

  const schema = yup.object().shape({
    firstName: yup.string().required("firstName is required"),
    lastName: yup.string().required("lastName is required"),
    email: yup.string().required("email is required"),
    password: yup.string().min(4).max(15).required("password is required"),
  });

  let defaultValuesObj = {...user};

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<UserModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const {dirtyFields} = useFormState({control});

  const edit = async (user: UserModel) => {
    updateUser(id, user)
      .then((res) => {
        notify.success(SccMsg.UPDATE_USER);
        store.dispatch(userUpdateAction(res.data));
        navigate("/admin/user");
      })
      .catch((err) => {
        notify.error(err);
      });
  };

  return (
    <div className="addUser">
      <h2>Update User</h2>
      <Form onSubmit={handleSubmit(edit)}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            {...register("firstName")}
            type="text"
            placeholder="Enter First Name"
          />
          <span className="text-danger">{errors.firstName?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            {...register("lastName")}
            type="text"
            placeholder="Enter Last Name"
          />
          <span className="text-danger">{errors.lastName?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register("email")}
            type="text"
            placeholder="Enter email"
          />
          <span className="text-danger">{errors.email?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password")}
            type="text"
            placeholder="Enter password"
          />
          <span className="text-danger">{errors.password?.message}</span>
        </Form.Group>
        <Form.Group>
          <Button disabled={!isValid || !isDirty} variant="primary" type="submit">
            Update
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EditUser;
