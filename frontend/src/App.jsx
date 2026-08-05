import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AnimalList from "./pages/AnimalList";

function App() {

  return (

    <Routes>

      {/* Home Page */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Login Page */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Register Page */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* Category Wise Animals */}
      <Route
        path="/animals/:category"
        element={<AnimalList />}
      />

    </Routes>

  );

}

export default App;