import React from 'react';
import httpRequests from '../../http/http-requests';
import { useState, useEffect } from 'react';
export default function Form({info, setModal, modal}) {
    const initialValues = {
        apiName: "",
        apiKey: "",
        apiUsername: "",
        supplierId: "",
    };
    const [formValues, setFormValues] = useState(initialValues);

    useEffect(() => {
        httpRequests
            .getKeyById(info.id)
            .then((response) => {
                setFormValues(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const updateApi = (id,data) => {
        httpRequests
          .updateKey(id, data)
          .then((response) => {
            console.log(response + " updated.");
          })
          .catch((e) => {
            console.log(e);
          });
        toggleModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const toggleModal = () => {
        setModal(!modal);
    }

    return (
    <div className="modal">
          <div className="modal-content">
            <h2>{info.apiName}</h2>
            {
                Object.entries(formValues).map((key) => {
                    if(key[0] != "_id" && key[0] != "__v" && key[1] != "" && key[0] != "apiName"){
                        return(
                            <div className="inputBx"><input type="text" id={key[0]} required className="apiKey" name={key[0]} value={key[1]} onChange={handleChange} /><label for="apiKey" className="input-label">
                                {key[0]}
                            </label></div>
                        )
                    }
                })
            }
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
            <button onClick={() => updateApi(info.id,formValues)}>Submit Update</button>
          </div>
    </div>
  )
}
