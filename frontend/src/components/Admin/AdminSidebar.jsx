import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      <style>
        {`
          .admin-mobile-menu-btn {
            display: none;
          }

          .admin-sidebar-overlay {
            display: none;
          }

          .admin-sidebar-panel {
            width: 250px;
            min-height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;
            background: white;
            overflow-y: auto;
            transition: transform 0.3s ease;
          }

          @media (max-width: 767.98px) {
            .admin-mobile-menu-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              position: fixed;
              top: 12px;
              left: 12px;
              width: 44px;
              height: 44px;
              border: 1px solid #dee2e6;
              border-radius: 8px;
              background: white;
              color: #198754;
              font-size: 26px;
              cursor: pointer;
              z-index: 1102;
              box-shadow: 0 2px 6px rgba(0,0,0,0.12);
            }

            .admin-sidebar-panel {
              width: min(280px, 85vw);
              height: 100vh;
              min-height: 100vh;
              transform: translateX(-100%);
              z-index: 1101;
            }

            .admin-sidebar-panel.admin-sidebar-open {
              transform: translateX(0);
            }

            .admin-sidebar-overlay.admin-overlay-visible {
              display: block;
              position: fixed;
              inset: 0;
              background: rgba(0,0,0,0.45);
              z-index: 1100;
            }

            .admin-sidebar-close-btn {
              display: inline-flex !important;
            }
          }

          .admin-sidebar-close-btn {
            display: none;
          }
        `}
      </style>

      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        className="admin-mobile-menu-btn"
        aria-label="Open admin menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* MOBILE OVERLAY */}
      <div
        className={`admin-sidebar-overlay ${
          isOpen ? "admin-overlay-visible" : ""
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDEBAR */}
      <div
        className={`admin-sidebar-panel ${
          isOpen ? "admin-sidebar-open" : ""
        } border-end`}
      >
        {/* SIDEBAR HEADER */}
        <div className="px-4 py-4 border-bottom">
          <div className="d-flex justify-content-between align-items-start">
            <div
              className="fw-bold text-success fs-4"
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigate("/admin/dashboard")}
            >
              🐾 AnimalSale
            </div>

            <button
              type="button"
              className="admin-sidebar-close-btn btn btn-light btn-sm"
              aria-label="Close admin menu"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <small className="text-muted">Admin Panel</small>
        </div>

        {/* SIDEBAR MENU */}
        <div className="p-3">
          <button
            type="button"
            className="btn btn-light w-100 text-start mb-2"
            onClick={() => handleNavigate("/")}
          >
            🏠 Home
          </button>

          <button
            type="button"
            className="btn btn-light w-100 text-start mb-2"
            onClick={() => handleNavigate("/admin/animals")}
          >
            🐄 Animals
          </button>

          <button
            type="button"
            className="btn btn-light w-100 text-start mb-2"
            onClick={() => handleNavigate("/admin/sellers")}
          >
            👨‍🌾 Sellers
          </button>

          <button
            type="button"
            className="btn btn-light w-100 text-start mb-2"
            onClick={() => handleNavigate("/admin/categories")}
          >
            🗂️ Categories
          </button>

          <button
            type="button"
            className="btn btn-light w-100 text-start mb-2"
            onClick={() => handleNavigate("/admin/subscriptions")}
          >
            💳 Subscription Plans
          </button>

          <button
            type="button"
            className="btn btn-light w-100 text-start mb-2"
            onClick={() => handleNavigate("/admin/orders")}
          >
            📦 Orders
          </button>

          <button
            type="button"
            className="btn btn-light w-100 text-start mb-2"
            onClick={() => handleNavigate("/admin/payments")}
          >
            💰 Payments
          </button>

          <button
            type="button"
            className="btn btn-light w-100 text-start mb-2"
            onClick={() => handleNavigate("/admin/reports")}
          >
            📈 Reports
          </button>

          <button
            type="button"
            className="btn btn-light w-100 text-start mb-2"
            onClick={() => handleNavigate("/admin/notifications")}
          >
            🔔 Notifications
          </button>

          <button
            type="button"
            className="btn btn-light w-100 text-start mb-2"
            onClick={() => handleNavigate("/admin/settings")}
          >
            ⚙️ Settings
          </button>

          <hr />

          <button
            type="button"
            className="btn btn-outline-danger w-100 text-start"
            onClick={() => {
              localStorage.removeItem("adminId");
              localStorage.removeItem("adminLogin");
              setIsOpen(false);
              navigate("/login");
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
