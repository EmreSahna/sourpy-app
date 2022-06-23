import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import httpRequests from "../http/http-requests";
import markets from "../constants/markets";
import "../css/profilescreen.scss";
import Popup from "../components/popup/Popup.jsx";
import Form from "../components/popup/Form.jsx";
const ProfileScreen = () => {
  const { id } = useParams();
  const [listedApis, setListedApis] = useState([]);
  const selectedMarket = { title: "", image: "" };
  const [marketValues, setMarketValues] = useState(selectedMarket);
  const [modal, setModal] = useState(false);
  const [sendingForm, setSendingForm] = useState({});

  const deleteApi = (username, id) => {
    httpRequests
      .deleteApiKey(username, id)
      .then((response) => {
        console.log(response + " deleted.");
      })
      .catch((e) => {
        console.log(e);
      });
    //window.location.reload(false);
  };

  const toggleUpdateApi = (apiName,id) => {
    setSendingForm({
      apiName: apiName,
      id: id
    })
    setModal(!modal);
  }

  useEffect(() => {
    httpRequests
      .getUser(id)
      .then((response) => {
        setListedApis(response.data.keys);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  /* Popup ın açılıp açılmadığını kontrol etmek için oluşturuldu.*/
  const [isMarketOpen, setMarketOpen] = useState(false);
  const changeIsOpen = () => {
    console.log(isMarketOpen);
    setMarketOpen(!isMarketOpen);
  };
  return (
    <div className="profileScreen">
      <div className="formBx">
        <div className="marketCards">
          {markets.map((e) => {
            return (
              <div
                key={e.id}
                className="marketCard"
                style={{ border: `1px solid ${e.color}` }}
                onClick={() => {
                  marketValues.title = e.title;
                  setMarketValues(marketValues);
                  changeIsOpen();
                  console.log(`selected is ${selectedMarket.title}`);
                }}
              >
                <div className="image">
                  <img src={e.image} height={60} />
                </div>
                <div className="settings" style={{ backgroundColor: e.color }}>
                  <p>Mağza Ekle</p>
                  <i className="fa-solid fa-circle-plus" style={{color:"white", background:"transparent",fontSize:"x-large",margin:"3px"}}></i>
                </div>
              </div>
            );
          })}
        </div>
        {
          isMarketOpen == true ? (
            <Popup
              market={marketValues.title}
              isOpen={isMarketOpen}
              setOpen={setMarketOpen}
            />
          ) : null
        }
      </div>
      <div className="container">
        <h2>Entegre Ettiğim Mağzalar</h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="colH col-2">API İsmi</div>
            <div className="colH col-3">API Anahtarı</div>
            <div className="colH col-4">İşlemler</div>
          </li>
          {listedApis.map((e) => {
            return (
              <li className="table-row" key={e.id}>
                <div className="col col-2" data-label="Api Name">
                  {e.apiName}
                </div>
                <div className="col col-3" data-label="Api Key">
                  {e.apiKey}
                </div>
                <div className="col col-4" data-label="Functions">
                  <button onClick={() => deleteApi(id,e._id)} style={{backgroundColor: "transparent",padding:"0",margin:"5px"}}><i className="fa-solid fa-trash-can" style={{ color: "red", fontSize:"x-large" }}></i></button>
                  <button onClick={() => toggleUpdateApi(e.apiName,e._id)} style={{backgroundColor: "transparent",padding:"0",margin:"5px"}}><i className="fa-solid fa-pen" style={{ color: "#42ba96", fontSize:"x-large" }}></i></button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {modal && (
        <Form info={sendingForm} setModal={setModal} modal={modal}/>
      )}
    </div>
  );
};

export default ProfileScreen;
