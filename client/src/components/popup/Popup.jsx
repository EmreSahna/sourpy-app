import React from "react";
import "./Popup.css";
import Trendyol from "./trendyol/Trendyol";
import { useState } from "react";
export default function Popup({ market, isOpen, setOpen }) {
  const [modal, setModal] = useState(true);

  const toggleModal = () => {
    setOpen(!isOpen);
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            {market == "Trendyol" ? <Trendyol market={market} /> : <h1>!</h1>}
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
