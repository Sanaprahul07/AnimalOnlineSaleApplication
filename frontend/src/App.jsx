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
import SellerRegistrationSuccess from "./pages/seller/SellerRegistrationSuccess";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProfile from "./pages/seller/SellerProfile";
import MyAnimals from "./pages/seller/MyAnimals";
import SellerBids from "./pages/seller/SellerBids";
import SellerChat from "./pages/seller/SellerChat";
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

// =====================================================
// ADMIN ANIMAL DETAILS
// =====================================================

import AdminAnimalDetails from "./pages/admin/AdminAnimalDetails";
import ManageCategories from "./pages/admin/ManageCategories";
import AdminSubscriptionPlans from "./pages/admin/AdminSubscriptionPlans";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminReports from "./pages/admin/AdminReports";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";

// =====================================================
// BUYER LAYOUT
// =====================================================

import BuyerLayout from "./components/buyer/BuyerLayout";

// =====================================================
// BUYER PAGES
// =====================================================

import BuyerLogin from "./pages/buyer/BuyerLogin";
import BuyerRegister from "./pages/buyer/BuyerRegister";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BuyerOrder from "./pages/buyer/BuyerOrder";
import BuyerChat from "./pages/buyer/BuyerChat";

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

      {/* =================================================
                    ANIMAL DETAILS ROUTE

         BuyerLayout checks customerId.
         Guest -> normal public AnimalDetails
         Logged-in customer -> BuyerTopbar + AnimalDetails
         ================================================= */}

      <Route
        path="/animal/:id"
        element={
          <BuyerLayout>
            <AnimalDetails />
          </BuyerLayout>
        }
      />

      {/* =================================================
                         SELLER ROUTES
         ================================================= */}

      <Route path="/seller/login" element={<SellerLogin />} />

      <Route path="/seller/register" element={<SellerRegister />} />

      <Route
        path="/seller/registration-success"
        element={<SellerRegistrationSuccess />}
      />

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
        path="/seller/chat"
        element={
          <SellerLayout>
            <SellerChat />
          </SellerLayout>
        }
      />

      <Route
        path="/seller/animal-bids/:animalId"
        element={
          <SellerLayout>
            <SellerBids />
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

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin/register" element={<AdminRegister />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* =================================================
                    ADMIN SELLER MODULE
         ================================================= */}

      <Route path="/admin/sellers" element={<ManageSeller />} />

      <Route path="/admin/sellers/:id" element={<AdminSellerDetails />} />

      {/* =================================================
                    ADMIN OTHER MODULES
         ================================================= */}

      <Route path="/admin/buyers" element={<AdminBuyers />} />

      <Route path="/admin/animals" element={<AdminAnimals />} />

      <Route path="/admin/animals/:id" element={<AdminAnimalDetails />} />

      <Route path="/admin/categories" element={<ManageCategories />} />

      <Route path="/admin/subscriptions" element={<AdminSubscriptionPlans />} />

      <Route path="/admin/orders" element={<AdminOrders />} />

      <Route path="/admin/payments" element={<AdminPayments />} />

      <Route path="/admin/reports" element={<AdminReports />} />

      <Route path="/admin/notifications" element={<AdminNotifications />} />

      <Route path="/admin/settings" element={<AdminSettings />} />

      {/* =================================================
                         BUYER ROUTES
         ================================================= */}

      <Route path="/buyer/login" element={<BuyerLogin />} />

      <Route path="/buyer/register" element={<BuyerRegister />} />

      {/* BUYER DASHBOARD */}

      <Route
        path="/buyer/dashboard"
        element={
          <BuyerLayout>
            <BuyerDashboard />
          </BuyerLayout>
        }
      />

      {/* BUYER CHAT / NEGOTIATION */}

      <Route
        path="/buyer/chat"
        element={
          <BuyerLayout>
            <BuyerChat />
          </BuyerLayout>
        }
      />

      {/* EXISTING ORDER ROUTE - KEPT */}

      <Route
        path="/buyer/order/:id"
        element={
          <BuyerLayout>
            <BuyerOrder />
          </BuyerLayout>
        }
      />

      {/* TEMPORARY BIDS NAVIGATION */}

      <Route
        path="/buyer/bids"
        element={
          <BuyerLayout>
            <BuyerDashboard />
          </BuyerLayout>
        }
      />

      {/* TEMPORARY PROFILE NAVIGATION */}

      <Route
        path="/buyer/profile"
        element={
          <BuyerLayout>
            <BuyerDashboard />
          </BuyerLayout>
        }
      />
    </Routes>
  );
}

export default App;
