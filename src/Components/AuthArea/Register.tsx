import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserModel } from "../../Models/UserModel";
import notify, { SccMsg } from "../../Services/Notification";
import { userRegister } from "../../WebApi/AuthApi";

function Register(): JSX.Element {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(3, "at least 3 characters required")
      .max(8, "at most 8 characters required")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserModel>({ mode: "all", resolver: yupResolver(schema) });

  const registerUser = async (user: UserModel) => {
    userRegister(user)
      .then((res) => {
        notify.success(SccMsg.USER_REGISTER);
        navigate("/login");
      })
      .catch((err) => {
        notify.error(err);
      });
  };

  return (
    <div className="form-style">
      <h2>Register</h2>
      <Form
        onSubmit={handleSubmit(registerUser)}
        className="border border-default border-3 p-4 my-5"
      >
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control {...register("firstName")} type="text" placeholder="Enter first name" />
          <span className="text-danger">{errors.firstName?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control {...register("lastName")} type="text" placeholder="Enter last name" />
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
            Register
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Register;
