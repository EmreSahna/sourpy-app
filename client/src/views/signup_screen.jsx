import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/signupscreen.css";
import httpRequests from "../http/http-requests";
export default function SignupScreen() {
  const initialValues = { username: "", password: "", fullName: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Form submit yapıldığı zaman değerleri kontrol edilmesini sağlıyor.
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const registerUser = () => {
    httpRequests
      .createUser(formValues)
      .then((response) => {
        console.log(response.data);
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
      <div className="imgBx">
        <strong>Bulk Adding Product</strong>
        <img src="assets/bulkproduct.png" />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Register</h2>
          <form action="#" onSubmit={handleSubmit}>
            <div className="inputBx">
              <span>Full Name</span>
              <input
                type="text"
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>
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
            <div className="inputBx">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>

            <div className="inputBx">
              <input
                type="submit"
                value="Register"
                name=""
                onClick={registerUser}
              />
            </div>
            <div className="inputBx">
              <p>
                Already have an account? <Link to="/login"> Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
