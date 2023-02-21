import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CredentialsModel } from "../../Models/CredentialsModel";
import { login } from "../../WebApi/AuthApi";
import notify, { SccMsg } from "../../Services/Notification";
import store from "../../Redux/store";
import { loginAction } from "../../Redux/AuthAppState ";
import { Button, Form } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().min(4).max(15).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CredentialsModel>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (credentials: CredentialsModel) => {
    await login(credentials)
      .then((res) => {
        notify.success(SccMsg.LOGIN_SUCCESS);
        store.dispatch(loginAction(res.data));
        if (res.data.username === "admin@admin.com") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      })
      .catch((err) => {
        notify.error(err);
        console.log(err.message);
      });
  };

  return (
    <div className="form-style">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit(onSubmit)} className="border border-default border-3 p-4 my-5">
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control {...register("email")} type="text" placeholder="Enter Email" />
          <span className="text-danger">{errors.email?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register("password")} type="text" placeholder="Enter Password" />
          <span className="text-danger">{errors.password?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Button disabled={!isValid || !isDirty} variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
