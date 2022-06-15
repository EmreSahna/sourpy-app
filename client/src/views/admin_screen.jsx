import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useParams } from "react-router-dom";
//CSS File
import "../css/adminscreen.css";
import ProfileScreen from "./profile_screen";
export default function AdminScreen() {
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  console.log(selectedPage);
  return (
    <div className="home">
      {/* Sidebarda  tıklanılan sayfayı güncelleyerek homeContainer divindeki ekranı değiştiriyoruz. */}
      <Sidebar setSelectedPage={setSelectedPage} />
      <div className="homeContainer">
        <Navbar />
        <div className="selectedPage">
          {/*id*/}
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
          ) : null}
        </div>
      </div>
    </div>
  );
}
