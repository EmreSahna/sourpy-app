import React from "react";
import { Link } from "react-router-dom";
import "../css/homescreen.css";
export default function HomeScreen() {
  return (
    <div>
      <header>
        <img className="logo" src="assets/leaflet.png" height={50} />
        <nav>
          <ul className="nav_links">
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>

            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
          </ul>
        </nav>
        <div className="buttons">
          <Link to="login" className="cta">
            <button>Login</button>
          </Link>
          <Link to="signup" className="cta">
            <button>Register</button>
          </Link>
        </div>
      </header>
      <div className="body">
        <div className="content3">
          <img src="assets/content_img1.webp" />
          <div className="text">
            <h1>Sell Everywhere</h1>
            <div className="row">
              <div className="one">
                <strong>
                  We provide order, stock and product integration with
                  marketplaces
                </strong>
                <p>
                  Manage all platforms in a very easy and functional way from a
                  single panel.
                </p>
              </div>
              <div className="two">
                <strong>
                  We provide order, stock and product integration with
                  marketplaces
                </strong>
                <p>
                  Manage all platforms in a very easy and functional way from a
                  single panel.
                </p>
              </div>
            </div>
            <ul class="list">
              <li>
                <span class="ListIcon">
                  <i class="fa-solid fa-store"></i>
                </span>
                <strong>Marketplace Integrations</strong>
                <p>
                  Anywhere with the easiest-to-use marketplace integration
                  solution make a sale.
                </p>
              </li>
              <li>
                <span class="ListIcon">
                  <i class="fa-solid fa-cart-shopping"></i>
                </span>
                <strong>E-commerce Infrastructure Integrations</strong>
                <p>
                  Your e-commerce site is integrated with all the channels you
                  sell. never mind.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
