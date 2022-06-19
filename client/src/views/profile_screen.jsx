import React from "react";
import { useState, useEffect } from "react";
import "../css/profilescreen.scss";
import { useParams } from "react-router-dom";
import httpRequests from "../http/http-requests";

const ProfileScreen = () => {
  const { id } = useParams();
  const markets = [
    {
      id: 1,
      title: "Hepsiburada",
      image: "https://www.uzmanpazaryeri.com/img/hepsiburada_entegrasyonu.png",
    },
    {
      id: 2,
      title: "Trendyol",
      image:
        "https://telegramturkiye.com/wp-content/uploads/2021/04/trendeyool.png",
    },
    {
      id: 3,
      title: "Amazon",
      image:
        "https://image.similarpng.com/very-thumbnail/2020/11/Amazon-icon-in-flat-design-on-transparent-background-PNG.png",
    },
  ];
  const initialValues = { apiName: "", apiKey: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [listedApis, setListedApis] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const getInitialState = () => {
    const value = "Hepsiburada";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChangeDropDown = (e) => {
    setValue(e.target.value);
    formValues.apiName = e.target.value;
    setFormValues({ ...formValues });
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

  const deleteApi = (username,id) => {
    httpRequests.deleteApiKey(username,id)
      .then(response => {
        console.log(response + " deleted.");
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const updateApi = (id) => {
    const data = {
      apiName: "updated",
      apiKey: "key"
    }
    httpRequests.updateKey(id,data)
      .then(response => {
        console.log(response + " updated.");
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const submitKey = () => {
    httpRequests
      .addApiKey(formValues, id)
      .then((response) => {
        console.log(response);
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

  useEffect(() => {
    httpRequests
      .getUser(id)
      .then((response) => {
        setListedApis(response.data.keys);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const validate = (values) => {
    const errors = {};
    if (!values.apiKey) {
      errors.username = "APIKEY is required!";
    }
    return errors;
  };
  return (
    <div className="profileScreen">
      <div className="formBx">
        <h2>Add API</h2>
        <form className="addApi" action="#" onSubmit={handleSubmit}>
          <div className="inputBx">
            <input
              type="text"
              id="apiKey"
              required
              className="apiKey"
              name="apiKey"
              value={formValues.apiKey}
              onChange={handleChange}
            />
            <label for="apiKey" className="input-label">
              API KEY
            </label>
          </div>

          <select
            className="dropdown"
            value={value}
            onChange={handleChangeDropDown}
          >
            {markets.map((e) => (
              <option key={e.key} value={e.title}>
                {e.title}
              </option>
            ))}
          </select>
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
      <div class="container">
        <h2>All APIs</h2>
        <ul class="responsive-table">
          <li class="table-header">
            <div class="colH col-1">Image</div>
            <div class="colH col-2">API Name</div>
            <div class="colH col-3">API Key</div>
            <div class="colH col-4">Functions</div>
          </li>
          {listedApis.map((e) => {
            return (
              <li class="table-row">
                <div class="col col-1" data-label="Image">
                  {e.apiName}
                </div>
                <div class="col col-2" data-label="Api Name">
                  {e.apiName}
                </div>
                <div class="col col-3" data-label="Api Key">
                  {e.apiKey}
                </div>

                <div class="col col-4" data-label="Functions">
                  <input type="button" value="Delete" className="delete" onClick={() => deleteApi(id,e._id)}/>
                  <input type="button" value="Update" className="update" onClick={() => updateApi(e._id)}/>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProfileScreen;
