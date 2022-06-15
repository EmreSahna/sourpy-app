import React from "react";
import { useState, useEffect } from "react";
import "../css/profilescreen.css";
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
  const initialValues = { apiName: "",apiKey: "" };
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
    /*setValue(e.target.value);
    console.log(e.target.value);
    console.log(value);
    setFormValues.apiName(e.target.value);
    */
   setValue(e.target.value);
   formValues.apiName = e.target.value;
   setFormValues({...formValues});
  };

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

  const submitKey = () => {
    httpRequests.addApiKey(formValues, id)
    .then(response => {
      console.log(response);
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

  useEffect(() => {
    httpRequests.listApiKey(id)
    .then(response => {
      setListedApis(response.data.keys);
    })
    .catch(e => {
      console.log(e);
    })
  })

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
        <form action="#" onSubmit={handleSubmit}>
          <div className="inputBx">
            <span>API KEY</span>
            <input
              type="text"
              name="apiKey"
              value={formValues.apiKey}
              placeholder="API KEY"
              onChange={handleChange}
            />
          </div>
          <select value={value} onChange={handleChangeDropDown}>
            {markets.map((e) => (
              <option value={e.title}>{e.title}</option>
            ))}
          </select>
          <div className="inputBx">
              <input type="submit" value="Submit Api Key" name="" onClick={submitKey} />
            </div>
        </form>
      </div>
      <div className="ornektablo">
            <h1>Apilerin Bulunduğu Tablo</h1>
            <table>
              <tbody>
                  {
                    listedApis.map((e) => {
                      return (
                        <tr>
                           <td>{e.apiName}</td>
                           <td>{e.apiKey}</td>
                        </tr>
                     )
                    })
                  }
              </tbody>
            </table>
      </div>
    </div>
  );
};

export default ProfileScreen;
