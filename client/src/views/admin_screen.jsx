import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../css/adminscreen.css";
import ProfileScreen from "./profile_screen";
import Products from "./products";
import { useEffect } from "react";
export default function AdminScreen() {
  let navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (state == id) {
      setLogged(true);
    } else {
      return navigate("/");
    }
  });

  const [selectedPage, setSelectedPage] = useState(["Profile"]);

  return (
    <div className="home">
      {logged ? (
        <>
          <Sidebar setSelectedPage={setSelectedPage} />
          <div className="homeContainer">
            <Navbar />
            <div className="selectedPage">
              {selectedPage == "Profile" ? (
                <ProfileScreen />
              ) : selectedPage == "Dashboard" ? (
                <h1>Dashboard</h1>
              ) : selectedPage == "Products" ? (
                <Products />
              ) : selectedPage == "Stats" ? (
                <h1>Stats</h1>
              ) : selectedPage == "Notifications" ? (
                <h1>Notifications</h1>
              ) : selectedPage == "Settings" ? (
                <h1>Settings</h1>
              ) : selectedPage == "Logout" ? (
                navigate("/")
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
