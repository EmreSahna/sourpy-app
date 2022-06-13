import React from "react";
import { useState, useEffect } from "react";
import httpRequests from "../http-requests";

export default function LoginScreen() {
  const initialValues = { username: "", password: "" };
  const initialApiKey = { apiName: "", apiKey: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formApiKey, setFormApiKey] = useState(initialApiKey); 
  const [listedApis, setListedApis] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleApi = (e) => {
    const { name, value} = e.target;
    setFormApiKey({ ...formApiKey, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const loginUser = () => {
    httpRequests.getUser(formValues.username)
    .then(response => {
      if(response.data.password == formValues.password){
        console.log("Giriş yapıldı!")
      }
    })
    .catch(e => {
      console.log(e);
    })
  }
 
  const postApiKey = () => {
    httpRequests.addApiKey(formApiKey, formValues.username)
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    })
  }

  const getApiKey = () => {
    httpRequests.listApiKey(formValues.username)
    .then(response => {
      console.log(response.data.keys);
      setListedApis(response.data.keys);
    })
    .catch(e => {
      console.log(e);
    })
  }

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
            <div className="inputBx">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="* * * * * * *"
              />
            </div>
            <div className="inputBx">
              <span>Api Name</span>
              <input
                type="text"
                name="apiName"
                value={formApiKey.apiName}
                placeholder="Api Name"
                onChange={handleApi}
              />
            </div>
            <div className="inputBx">
              <span>Api Key</span>
              <input
                type="text"
                name="apiKey"
                value={formApiKey.apiKey}
                placeholder="Api Key"
                onChange={handleApi}
              />
            </div>
            <div className="remember">
              <label htmlFor="">
                <input type="checkbox" />
                Remember me
              </label>
            </div>
            <div className="inputBx">
              <button onClick={loginUser}>
                Sign In
              </button>
              <button onClick={postApiKey}>
                Send Api
              </button>
              <button onClick={getApiKey}>
                Get Keys
              </button>
            </div>
            <div className="inputBx">
              <p>
                Don't have an account? <a> Sign up</a>
              </p>
            </div>
            <div>
              {
                listedApis.map((e) => {
                  return (
                  <p>{e.apiName} = {e.apiKey}</p>
                  );
                })
              }
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
