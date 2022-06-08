import React from "react";

import { useState, useEffect } from "react";
import { Button, Row, Col, Container, Form } from "react-bootstrap";
export default function Signup() {
  const initialValues = { username: "", password: "", passwordAgain: "" };
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
    if (values.password != values.passwordAgain) {
      errors.passwordAgain = "Passwords doesn't match";
    }

    return errors;
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Logo Area
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                SSS
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Container className="mt-5">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="">Signed in Successfully </div>
        ) : (
          <div></div>
        )}
        <pre>{JSON.stringify(formValues, undefined, 1)}</pre>
        <Row>
          <Col lg={5} md={6} sm={12} className="text-center mt-5 p-3">
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
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <p>{formErrors.password}</p>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password again"
                  name="passwordAgain"
                  value={formValues.passwordAgain}
                  onChange={handleChange}
                />
              </Form.Group>
              <p>{formErrors.passwordAgain}</p>

              <Button variant="primary btn-block mt-3" type="submit">
                Sign up
              </Button>
              <Row className="mt-2">
                <p>
                  <a href="#">
                    Already have an account? <span> Sign in</span>
                  </a>
                </p>
              </Row>
            </Form>
          </Col>
          <Col lg={7} md={5} sm={12}>
            <div className="imageArea"></div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
