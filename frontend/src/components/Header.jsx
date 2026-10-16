// frontend/src/components/Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  PawIcon,
  LocationIcon,
  ChevronDown,
  HeartIcon,
  UserIcon,
} from "./Icons";

// =====================================================
// GET CURRENT LOGGED-IN ROLE
// =====================================================

function getLoggedInRole() {
  const activeRole = localStorage.getItem("activeRole")?.toUpperCase();

  if (["ADMIN", "BUYER", "SELLER"].includes(activeRole)) {
    return activeRole;
  }

  // Support existing sessions.
  if (localStorage.getItem("adminLogin") === "true") {
    return "ADMIN";
  }

  if (localStorage.getItem("sellerLoggedIn") === "true") {
    return "SELLER";
  }

  if (localStorage.getItem("customerId")) {
    return "BUYER";
  }

  return null;
}

// =====================================================
// ROLE-SPECIFIC ACCOUNT CONFIGURATION
// Existing project routes are used.
// =====================================================

const roleConfig = {
  ADMIN: {
    label: "Admin",
    dashboard: "/admin/dashboard",
    buttonLabel: "Admin Account",
    logo: "🛡️",
    menu: [
      {
        label: "Admin Dashboard",
        icon: "📊",
        path: "/admin/dashboard",
      },
      {
        label: "Animals",
        icon: "🐄",
        path: "/admin/animals",
      },
      {
        label: "Sellers",
        icon: "👨‍🌾",
        path: "/admin/sellers",
      },
      {
        label: "Categories",
        icon: "🗂️",
        path: "/admin/categories",
      },
      {
        label: "Subscription Plans",
        icon: "💳",
        path: "/admin/subscriptions",
      },
      {
        label: "Orders",
        icon: "📦",
        path: "/admin/orders",
      },
      {
        label: "Payments",
        icon: "💰",
        path: "/admin/payments",
      },
      {
        label: "Reports",
        icon: "📈",
        path: "/admin/reports",
      },
      {
        label: "Notifications",
        icon: "🔔",
        path: "/admin/notifications",
      },
      {
        label: "Settings",
        icon: "⚙️",
        path: "/admin/settings",
      },
    ],
  },

  BUYER: {
    label: "Buyer",
    dashboard: "/buyer/dashboard",
    buttonLabel: "Buyer Account",
    logo: "🛒",
    menu: [
      {
        label: "Buyer Dashboard",
        icon: "📊",
        path: "/buyer/dashboard",
      },
      {
        label: "Wishlist",
        icon: "❤️",
        path: "/buyer/login",
      },
    ],
  },

  SELLER: {
    label: "Seller",
    dashboard: "/seller/dashboard",
    buttonLabel: "Seller Account",
    logo: "🐄",
    menu: [
      {
        label: "Seller Dashboard",
        icon: "📊",
        path: "/seller/dashboard",
      },
      {
        label: "Sell Animal",
        icon: "🐄",
        path: "/seller/register",
      },
    ],
  },
};

// =====================================================
// CLEAR LOGIN INFORMATION ON LOGOUT
// =====================================================

function clearLoginData() {
  const authKeys = [
    "activeRole",
    "adminId",
    "adminLogin",
    "adminEmail",
    "adminName",
    "adminRole",
    "customerId",
    "customerName",
    "customerEmail",
    "seller",
    "sellerId",
    "sellerEmail",
    "sellerLoggedIn",
  ];

  authKeys.forEach((key) => localStorage.removeItem(key));
}

// =====================================================
// HEADER
// =====================================================

function Header() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState(getLoggedInRole);

  const currentRole = loggedInRole ? roleConfig[loggedInRole] : null;

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    e.preventDefault();

    const term = query.trim();

    if (term) {
      navigate(`/animals/${encodeURIComponent(term)}`);
    }
  };

  // =====================================================
  // LOGIN NAVIGATION
  // =====================================================

  const handleBuyerLogin = () => {
    setShowLoginMenu(false);
    navigate("/buyer/login");
  };

  const handleBuyerRegister = () => {
    setShowLoginMenu(false);
    navigate("/buyer/register");
  };

  const handleSellerLogin = () => {
    setShowLoginMenu(false);
    navigate("/seller/login");
  };

  // =====================================================
  // ROLE-SPECIFIC ACCOUNT MENU NAVIGATION
  // =====================================================

  const handleAccountNavigation = (path) => {
    setShowAccountMenu(false);
    navigate(path);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    clearLoginData();

    setLoggedInRole(null);
    setShowLoginMenu(false);
    setShowAccountMenu(false);

    navigate("/", { replace: true });
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <header className="as-header">
      <div className="container py-2">
        <div className="d-flex align-items-center gap-3">
          {/* BRAND / ROLE-SPECIFIC LOGO */}

          <div
            className="as-brand"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate("/");
              }
            }}
          >
            {currentRole ? (
              <span
                style={{
                  fontSize: "26px",
                  lineHeight: 1,
                }}
              >
                {currentRole.logo}
              </span>
            ) : (
              <PawIcon size={26} />
            )}

            <span>
              Animal
              <span className="as-text-green">Sale</span>
              {currentRole && (
                <small
                  className="d-block text-success fw-semibold"
                  style={{
                    fontSize: "10px",
                    lineHeight: 1.2,
                  }}
                >
                  {currentRole.label} Account
                </small>
              )}
            </span>
          </div>

          {/* LOCATION */}

          <div className="as-location d-none d-lg-flex">
            <LocationIcon size={16} />
            All India
            <ChevronDown size={14} />
          </div>

          {/* SEARCH */}

          <form className="as-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search animals, breeds, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button type="submit" className="as-search-btn">
              Search
            </button>
          </form>

          {/* EXISTING WISHLIST BUTTON */}

          <button
            type="button"
            className="as-header-action d-none d-md-flex"
            onClick={() => navigate("/buyer/login")}
          >
            <HeartIcon size={20} />
            Wishlist
          </button>

          {/* =================================================
              GUEST BUTTONS
          ================================================= */}

          {!loggedInRole && (
            <>
              {/* LOGIN DROPDOWN */}

              <div className="position-relative d-none d-md-block">
                <button
                  type="button"
                  className="as-header-action"
                  onClick={() => {
                    setShowLoginMenu((previous) => !previous);
                    setShowAccountMenu(false);
                  }}
                  style={{
                    border: "none",
                    background: "transparent",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                >
                  <UserIcon size={20} />
                  Login
                  <ChevronDown size={14} />
                </button>

                {showLoginMenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      width: "200px",
                      background: "#ffffff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                      padding: "6px",
                      zIndex: 2000,
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleBuyerLogin}
                      className="w-100 text-start border-0"
                      style={menuButtonStyle}
                    >
                      👤 Buyer Login
                    </button>

                    <button
                      type="button"
                      onClick={handleBuyerRegister}
                      className="w-100 text-start border-0"
                      style={menuButtonStyle}
                    >
                      📝 Buyer Register
                    </button>

                    <button
                      type="button"
                      onClick={handleSellerLogin}
                      className="w-100 text-start border-0"
                      style={menuButtonStyle}
                    >
                      🏪 Seller Login
                    </button>
                  </div>
                )}
              </div>

              {/* ADMIN LOGIN */}

              <button
                type="button"
                className="btn btn-outline-dark px-3 py-2 text-nowrap fw-semibold"
                onClick={() => navigate("/admin/login")}
              >
                Admin
              </button>

              {/* SELL ANIMAL */}

              <button
                type="button"
                className="btn px-4 py-2 text-nowrap fw-bold"
                style={{
                  backgroundColor: "#198754",
                  color: "#ffffff",
                  border: "1px solid #198754",
                  borderRadius: "8px",
                  minHeight: "42px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  boxShadow: "none",
                }}
                onClick={() => navigate("/seller/register")}
              >
                + Sell Animal
              </button>
            </>
          )}

          {/* =================================================
              LOGGED-IN ROLE-SPECIFIC ACCOUNT DROPDOWN
          ================================================= */}

          {loggedInRole && currentRole && (
            <div className="position-relative">
              {/* ACCOUNT DROPDOWN BUTTON */}

              <button
                type="button"
                className="btn btn-success px-3 py-2 text-nowrap fw-semibold"
                onClick={() => {
                  setShowAccountMenu((previous) => !previous);
                  setShowLoginMenu(false);
                }}
                aria-expanded={showAccountMenu}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                }}
              >
                <span>{currentRole.logo}</span>
                {currentRole.buttonLabel}
                <ChevronDown size={14} />
              </button>

              {/* ROLE-SPECIFIC DROPDOWN ITEMS */}

              {showAccountMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "100px",
                    right: "0",
                    width: "260px",
                    maxWidth: "85vw",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    background: "#ffffff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "20px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
                    padding: "8px",
                    zIndex: 99999,
                  }}
                >
                  {/* ACCOUNT HEADING */}

                  <div
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #eeeeee",
                      marginBottom: "5px",
                    }}
                  >
                    <div className="fw-bold">
                      {currentRole.logo} {currentRole.label} Account
                    </div>

                    <small className="text-muted">AnimalSale</small>
                  </div>

                  {/* ROLE-SPECIFIC MENU ITEMS */}

                  {currentRole.menu.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleAccountNavigation(item.path)}
                      className="w-100 text-start border-0"
                      style={menuButtonStyle}
                    >
                      <span style={{ marginRight: "10px" }}>{item.icon}</span>

                      {item.label}
                    </button>
                  ))}

                  {/* HOME */}

                  <button
                    type="button"
                    onClick={() => handleAccountNavigation("/")}
                    className="w-100 text-start border-0"
                    style={menuButtonStyle}
                  >
                    🏠 Home
                  </button>

                  {/* LOGOUT */}

                  <div
                    style={{
                      borderTop: "1px solid #eeeeee",
                      marginTop: "6px",
                      paddingTop: "6px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-100 text-start border-0"
                      style={{
                        ...menuButtonStyle,
                        color: "#dc3545",
                      }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// =====================================================
// SHARED DROPDOWN BUTTON STYLE
// =====================================================

const menuButtonStyle = {
  background: "transparent",
  padding: "11px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 500,
  color: "#333333",
  fontSize: "14px",
};

export default Header;
