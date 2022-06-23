import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/loginscreen.css";
import httpRequests from "../http/http-requests";
export default function LoginScreen() {
  const navigate = useNavigate();
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [authCode, setAuthCode] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isObscure, setIsObscure] = useState(true);
  const changeObscure = () => {
    setIsObscure(!isObscure);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const loginUser = () => {
    httpRequests
      .getUser(formValues.username)
      .then((response) => {
        if (response.data.password == formValues.password) {
          navigate(`/panel/${formValues.username}`, {
            state: response.data.username,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "password is required!";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters.";
    }
    return errors;
  };
  return (
    <section>
      <div className="imgBox">
        <img src="assets/bg.jpg" />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Login</h2>
          <form action="#" onSubmit={handleSubmit}>
            <div className="inputBx">
              <span>Username</span>
              <input
                type="text"
                name="username"
                value={formValues.username}
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div className="inputBx" id="passwordField">
              <span>Password</span>
              <input
                type={isObscure ? "password" : "text"}
                name="password"
                className="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="* * * * * * *"
              />
              <div onClick={changeObscure}>
                {isObscure ? (
                  <i className="fa-solid fa-eye obscure" />
                ) : (
                  <i class="fa-solid fa-eye-slash"></i>
                )}
              </div>
            </div>
            <div className="remember">
              <label htmlFor="">
                <input type="checkbox" />
                Remember me
              </label>
            </div>
            <div className="inputBx">
              <input
                type="submit"
                value="Sign in"
                name=""
                onClick={loginUser}
              />
            </div>
            <div className="inputBx">
              <p>
                Don't have an account? <Link to="/signup"> Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
