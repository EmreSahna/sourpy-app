import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./views/login_screen";
import SignupScreen from "./views/signup_screen";
import HomeScreen from "./views/home_screen";
import "./css/homescreen.css";
import AdminScreen from "./views/admin_screen";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* */}
        <Route path="/">
          <Route index element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
        </Route>

        <Route path="/panel/:id" element={<AdminScreen />} />
        <Route
          path="*"
          element={
            <div>
              <h1>Page Not Found</h1>
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
