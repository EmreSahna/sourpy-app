import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useLocation, useParams } from "react-router-dom";
import "../css/adminscreen.css";
import ProfileScreen from "./profile_screen";
import { useEffect } from "react";
export default function AdminScreen() {
  const {id} = useParams();
  const {state} = useLocation();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if(state == id){
      setLogged(true);
    }
  })

  const [selectedPage, setSelectedPage] = useState("Dashboard");
  console.log(selectedPage);
  return (
    <div className="home">
      <Sidebar setSelectedPage={setSelectedPage} />
      <div className="homeContainer">
        <Navbar />
        { logged ? (
        <div className="selectedPage">
          {selectedPage == "Profile" ? (
            <ProfileScreen />
          ) : selectedPage == "Dashboard" ? (
            <h1>Dashboard</h1>
          ) : selectedPage == "Products" ? (
            <h1>Products</h1>
          ) : selectedPage == "Stats" ? (
            <h1>Stats</h1>
          ) : selectedPage == "Notifications" ? (
            <h1>Notifications</h1>
          ) : selectedPage == "Settings" ? (
            <h1>Settings</h1>
          ) : null }
        </div> ) : (<div> <h1>Auth required.</h1> </div> )
        }
      </div>
    </div>
  );
}
