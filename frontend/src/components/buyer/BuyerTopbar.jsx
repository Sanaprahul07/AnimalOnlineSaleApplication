import { useNavigate, useLocation } from "react-router-dom";

function BuyerTopbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("customerId");
    localStorage.removeItem("customerName");
    localStorage.removeItem("customerEmail");
    localStorage.removeItem("pendingAnimalId");
    localStorage.removeItem("pendingBidAmount");
    localStorage.removeItem("lastChatAnimalId");
    localStorage.removeItem("lastChatSellerId");

    navigate("/buyer/login");
  };

  const handleChatClick = () => {
    const animalId = localStorage.getItem("lastChatAnimalId");

    const sellerId = localStorage.getItem("lastChatSellerId");

    const customerId = localStorage.getItem("customerId");

    // =====================================================
    // CUSTOMER LOGIN CHECK
    // =====================================================
    if (!customerId) {
      navigate("/buyer/login");
      return;
    }

    // =====================================================
    // CHAT CONTEXT CHECK
    // =====================================================
    if (!animalId || !sellerId) {
      alert("Please open Chat / Negotiate from an animal details page first.");

      navigate("/buyer/dashboard");
      return;
    }

    // =====================================================
    // OPEN LAST ACTIVE CHAT
    // =====================================================
    navigate(`/buyer/chat?animalId=${animalId}&sellerId=${sellerId}`);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className="bg-white border-bottom shadow-sm"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid px-4">
        <div
          className="d-flex align-items-center justify-content-between"
          style={{
            minHeight: "70px",
          }}
        >
          {/* =================================================
              LOGO
              ================================================= */}
          <button
            type="button"
            className="btn btn-link text-decoration-none p-0"
            onClick={() => navigate("/buyer/dashboard")}
          >
            <span className="fw-bold fs-4 text-dark">
              Animal
              <span className="text-success">Sale</span>
            </span>
          </button>

          {/* =================================================
              NAVIGATION
              ================================================= */}
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className={`btn ${
                isActive("/buyer/bids") ? "btn-success" : "btn-outline-success"
              }`}
              onClick={() => navigate("/buyer/bids")}
            >
              Bids
            </button>

            {/* =================================================
                CHAT
                ================================================= */}
            <button
              type="button"
              className={`btn ${
                isActive("/buyer/chat") ? "btn-success" : "btn-outline-success"
              }`}
              onClick={handleChatClick}
            >
              Chat
            </button>

            {/* =================================================
                PROFILE
                ================================================= */}
            <button
              type="button"
              className={`btn ${
                isActive("/buyer/profile")
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() => navigate("/buyer/profile")}
            >
              Your Profile
            </button>

            {/* =================================================
                LOGOUT
                ================================================= */}
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default BuyerTopbar;
