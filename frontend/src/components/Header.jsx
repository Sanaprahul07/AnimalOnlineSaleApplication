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
// TOP HEADER
// Brand · Location · Search · Wishlist · Login · Admin · Sell
// =====================================================

function Header() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showLoginMenu, setShowLoginMenu] = useState(false);

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
  // BUYER LOGIN
  // UPDATED ROUTE
  // =====================================================

  const handleBuyerLogin = () => {
    setShowLoginMenu(false);
    navigate("/buyer/login");
  };

  // =====================================================
  // BUYER REGISTER
  // NEW REQUIREMENT
  // =====================================================

  const handleBuyerRegister = () => {
    setShowLoginMenu(false);
    navigate("/buyer/register");
  };

  // =====================================================
  // SELLER LOGIN
  // EXISTING ROUTE
  // =====================================================

  const handleSellerLogin = () => {
    setShowLoginMenu(false);
    navigate("/seller/login");
  };

  return (
    <header className="as-header">
      <div className="container py-2">
        <div className="d-flex align-items-center gap-3">
          {/* BRAND */}

          <div className="as-brand" role="button" onClick={() => navigate("/")}>
            <PawIcon size={26} />

            <span>
              Animal
              <span className="as-text-green">Sale</span>
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

          {/* WISHLIST */}

          <button
            type="button"
            className="as-header-action d-none d-md-flex"
            onClick={() => navigate("/buyer/login")}
          >
            <HeartIcon size={20} />
            Wishlist
          </button>

          {/* LOGIN DROPDOWN */}

          <div className="position-relative d-none d-md-block">
            <button
              type="button"
              className="as-header-action"
              onClick={() => setShowLoginMenu(!showLoginMenu)}
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
                  right: "0",
                  width: "200px",
                  background: "#ffffff",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  padding: "6px",
                  zIndex: 2000,
                }}
              >
                {/* BUYER LOGIN */}

                <button
                  type="button"
                  onClick={handleBuyerLogin}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f7f5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  👤 Buyer Login
                </button>

                {/* BUYER REGISTER */}

                <button
                  type="button"
                  onClick={handleBuyerRegister}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f7f5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  📝 Buyer Register
                </button>

                {/* SELLER LOGIN */}

                <button
                  type="button"
                  onClick={handleSellerLogin}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f7f5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  🏪 Seller Login
                </button>
              </div>
            )}
          </div>

          {/* ADMIN BUTTON */}

          <button
            type="button"
            className="btn btn-outline-dark px-3 py-2 text-nowrap fw-semibold"
            onClick={() => navigate("/admin/login")}
          >
            Admin
          </button>

          {/* SELL ANIMAL BUTTON */}

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
        </div>
      </div>
    </header>
  );
}

export default Header;
