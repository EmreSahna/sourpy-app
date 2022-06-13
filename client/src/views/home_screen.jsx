import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./login_screen";
import SignupScreen from "./signup_screen";
export default function HomeScreen() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <header>
                <img className="logo" src="assets/leaflet.png" alt="" />
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
                  <a href="login" className="cta">
                    <button>Login</button>
                  </a>
                  <a href="signup" className="cta">
                    <button>Register</button>
                  </a>
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
                          Manage all platforms in a very easy and functional way
                          from a single panel.
                        </p>
                      </div>
                      <div className="two">
                        <strong>
                          We provide order, stock and product integration with
                          marketplaces
                        </strong>
                        <p>
                          Manage all platforms in a very easy and functional way
                          from a single panel.
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
                          Anywhere with the easiest-to-use marketplace
                          integration solution make a sale.
                        </p>
                      </li>
                      <li>
                        <span class="ListIcon">
                          <i class="fa-solid fa-cart-shopping"></i>
                        </span>
                        <strong>E-commerce Infrastructure Integrations</strong>
                        <p>
                          Your e-commerce site is integrated with all the
                          channels you sell. never mind.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          }
        ></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/signup" element={<SignupScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
