import React from "react";
import { useState, useEffect } from "react";
import { Button, Row, Col, Container, Form } from "react-bootstrap";
import "./App.css";

export default function Login() {
  const initialValues = { username: "", password: "" };
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
    <>
      <Container className="justify-content-md-center align-items-center vh-100 d-flex">
        {/*Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="">Signed in Successfully </div>
        ) : (
          <div></div>
        )*/}

        <Row>
          <Col className=" text-center mt-5 p-3 col-8">
            <h1>Welcome to Sourpy</h1>
            <h4 className="text-muted ">
              Lorem ipsum dolor sit amet consectetur.
            </h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </Form.Group>
              <p>{formErrors.username}</p>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="* * * * * * * *"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <p>{formErrors.password}</p>
              <div class="row">
                <div class="form-check col ">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Remember me
                  </label>
                </div>
                <div className="col-md-8 ">
                  <a href="#" className="forgot">
                    Forgot password
                  </a>
                </div>
              </div>
              <Button variant="primary btn-block mt-3" type="submit">
                Sign in
              </Button>
              <Row className="mt-2">
                <p>
                  <a href="#">
                    Don't have an account? <span> Sign up</span>
                  </a>
                </p>
              </Row>
            </Form>
          </Col>
          <Col className="col-4">
            <div className="imageArea"></div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
