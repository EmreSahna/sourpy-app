import React from 'react';
import "../App.css";
import httpRequests from '../http/http-requests';
import GetProducts from './GetProducts';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
export default function Products() {
  const { id } = useParams();
  const [toggleState, setToggle] = useState(0);
  const [listedApis, setListedApis] = useState([]);
  const [current,setCurrent] = useState({});

  const toggleTab = (index,e) => {
    setToggle(index);
    setCurrent(e);
  };

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

  return (
    <div className="container20">
      <div className="bloc-tabs20">
      {listedApis.map((e,index) => {
            return (
              <button
                className={toggleState === index ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(index,e)}
              >
                {e.apiName} - {e.supplierId}
              </button>
            );
      })}
      </div>

      <div className="content-tabs">
         {listedApis.map((e,index) => {
            return (
              <div
                className={toggleState === index ? "content  active-content" : "content"}
              >
                <ul class="responsive-table">
                  <li class="table-header">
                    <div class="colH col-2">ÜRÜN İSMİ</div>
                    <div class="colH col-3">FİYATI</div>
                    <div class="colH col-4">İşlemler</div>
                  </li>
                  <GetProducts current={current} setCurrent={setCurrent}/>
                </ul>
              </div>
            );
         })}
      </div>
    </div>
  );
}
