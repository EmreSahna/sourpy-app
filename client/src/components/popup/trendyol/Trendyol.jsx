import React from "react";
import { useState } from "react";
import markets from "../../../constants/markets";
import httpRequests from "../../../http/http-requests";
import { useParams } from "react-router";
import "../../../css/profilescreen.scss";
export default function Trendyol({ market }) {
  const initialValues = {
    apiName: "Trendyol",
    apiKey: "",
    apiUsername: "",
    supplierId: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.apiKey) {
      errors.username = "APIKEY is required!";
    }
    return errors;
  };
  const submitKey = (e) => {
    httpRequests
      .addApiKey(formValues, id)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    //window.location.reload(false);
  };
  return (
    <div>
      <h2>{market}</h2>
      <h2>Add API</h2>
      <form
        className="addApi"
        action="#"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="inputBx">
          <input
            type="text"
            id="apiKey"
            required
            className="apiKey"
            name="apiUsername"
            value={formValues.apiUsername}
            onChange={handleChange}
          />
          <label for="apiKey" className="input-label">
            API KEY
          </label>
        </div>
        <div className="inputBx">
          <input
            type="text"
            id="apiPassword"
            required
            className="apiKey"
            name="apiKey"
            value={formValues.apiKey}
            onChange={handleChange}
          />
          <label for="apiKey" className="input-label">
            API PASSWORD
          </label>
        </div>
        <div className="inputBx">
          <input
            type="text"
            id="supplierId"
            required
            className="apiKey"
            name="supplierId"
            value={formValues.supplierId}
            onChange={handleChange}
          />
          <label for="apiKey" className="input-label">
            SUPPLIER ID
          </label>
        </div>
        <div className="inputBx">
          <input
            type="submit"
            value="Submit Api Key"
            name=""
            onClick={submitKey}
          />
        </div>
      </form>
    </div>
  );
}
