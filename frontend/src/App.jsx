import { Routes, Route } from "react-router-dom";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AnimalList from "./pages/AnimalList";
import AnimalDetails from "./pages/AnimalDetails";

// =====================================================
// SELLER LAYOUT
// =====================================================

import SellerLayout from "./components/seller/SellerLayout";

// =====================================================
// SELLER PAGES
// =====================================================

import SellerLogin from "./pages/seller/SellerLogin";
import SellerRegister from "./pages/seller/SellerRegister";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProfile from "./pages/seller/SellerProfile";
import MyAnimals from "./pages/seller/MyAnimals";
import AddAnimal from "./pages/seller/AddAnimal";
import EditAnimal from "./pages/seller/EditAnimal";

// =====================================================
// FORGOT PASSWORD
// =====================================================

import ForgotPassword from "./pages/seller/ForgotPassword";

// =====================================================
// ADMIN PAGES
// =====================================================

import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Routes>

      {/* =================================================
                    PUBLIC ROUTES
      ================================================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/animals/:category"
        element={<AnimalList />}
      />

      <Route
        path="/animal/:id"
        element={<AnimalDetails />}
      />

      {/* =================================================
                    SELLER ROUTES
      ================================================= */}

      <Route
        path="/seller/login"
        element={<SellerLogin />}
      />

      <Route
        path="/seller/register"
        element={<SellerRegister />}
      />

      {/* =================================================
                    SELLER FORGOT PASSWORD
      ================================================= */}

      <Route
        path="/seller/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/seller/dashboard"
        element={
          <SellerLayout>
            <SellerDashboard />
          </SellerLayout>
        }
      />

      <Route
        path="/seller/profile"
        element={
          <SellerLayout>
            <SellerProfile />
          </SellerLayout>
        }
      />

      <Route
        path="/seller/animals"
        element={
          <SellerLayout>
            <MyAnimals />
          </SellerLayout>
        }
      />

      <Route
        path="/seller/add-animal"
        element={
          <SellerLayout>
            <AddAnimal />
          </SellerLayout>
        }
      />

      <Route
        path="/seller/edit-animal/:id"
        element={
          <SellerLayout>
            <EditAnimal />
          </SellerLayout>
        }
      />

      {/* =================================================
                    ADMIN ROUTES
      ================================================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/register"
        element={<AdminRegister />}
      />

      {/* ADMIN DASHBOARD - ADDED */}
      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

    </Routes>
  );
}

export default App;