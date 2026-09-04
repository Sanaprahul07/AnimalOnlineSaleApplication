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

// =====================================================
// ADMIN SELLER
// =====================================================

import ManageSeller from "./pages/admin/ManageSeller";
import AdminSellerDetails from "./pages/admin/AdminSellerDetails";

// =====================================================
// ADMIN OTHER MODULES
// =====================================================

import AdminBuyers from "./pages/admin/AdminBuyers";
import AdminAnimals from "./pages/admin/AdminAnimals";
import ManageCategories from "./pages/admin/ManageCategories";
import AdminSubscriptionPlans from "./pages/admin/AdminSubscriptionPlans";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminReports from "./pages/admin/AdminReports";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";

function App() {
  return (
    <Routes>
      {/* =================================================
                          PUBLIC ROUTES
      ================================================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/animals/:category" element={<AnimalList />} />

      <Route path="/animal/:id" element={<AnimalDetails />} />

      {/* =================================================
                          SELLER ROUTES
      ================================================= */}

      <Route path="/seller/login" element={<SellerLogin />} />

      <Route path="/seller/register" element={<SellerRegister />} />

      {/* =================================================
                    SELLER FORGOT PASSWORD
      ================================================= */}

      <Route path="/seller/forgot-password" element={<ForgotPassword />} />

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

      {/* ADMIN LOGIN */}

      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN REGISTER */}

      <Route path="/admin/register" element={<AdminRegister />} />

      {/* ADMIN DASHBOARD */}

      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* =================================================
                       ADMIN SELLER MODULE
      ================================================= */}

      {/* ALL SELLERS LIST */}

      <Route path="/admin/sellers" element={<ManageSeller />} />

      {/* PARTICULAR SELLER DETAILS */}

      <Route path="/admin/sellers/:id" element={<AdminSellerDetails />} />

      {/* =================================================
                       ADMIN OTHER MODULES
      ================================================= */}

      {/* BUYERS */}

      <Route path="/admin/buyers" element={<AdminBuyers />} />

      {/* ANIMALS */}

      <Route path="/admin/animals" element={<AdminAnimals />} />

      {/* CATEGORIES */}

      <Route path="/admin/categories" element={<ManageCategories />} />

      {/* SUBSCRIPTION PLANS */}

      <Route path="/admin/subscriptions" element={<AdminSubscriptionPlans />} />

      {/* ORDERS */}

      <Route path="/admin/orders" element={<AdminOrders />} />

      {/* PAYMENTS */}

      <Route path="/admin/payments" element={<AdminPayments />} />

      {/* REPORTS */}

      <Route path="/admin/reports" element={<AdminReports />} />

      {/* NOTIFICATIONS */}

      <Route path="/admin/notifications" element={<AdminNotifications />} />

      {/* SETTINGS */}

      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  );
}

export default App;
