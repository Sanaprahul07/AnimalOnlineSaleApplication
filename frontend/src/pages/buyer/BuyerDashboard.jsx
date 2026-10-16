import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllAnimals, getAnimalById } from "../../services/AnimalService";
import { getOrdersByBuyer } from "../../services/OrderService";
import { apiUrl } from "../../config/api";

import "./BuyerDashboard.css";

function BuyerDashboard() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [purchasedAnimals, setPurchasedAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasedLoading, setPurchasedLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [purchasedError, setPurchasedError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const customerId = localStorage.getItem("customerId");
  const customerName = localStorage.getItem("customerName") || "Buyer";

  // =====================================================
  // LOAD AVAILABLE ANIMALS
  // =====================================================

  const loadAnimals = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await getAllAnimals();
      const data = Array.isArray(response.data) ? response.data : [];

      setAnimals(
        data.filter(
          (animal) =>
            animal.available === true &&
            animal.approvalStatus === "APPROVED" &&
            animal.sellerId,
        ),
      );
    } catch (error) {
      console.error("Buyer Animals Loading Error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to load animals. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD CUSTOMER ORDERS
  // =====================================================

  const loadPurchasedAnimals = async () => {
    try {
      setPurchasedLoading(true);
      setPurchasedError("");

      if (!customerId) {
        setPurchasedAnimals([]);
        setPurchasedError("Please login to view your orders.");
        return;
      }

      const response = await getOrdersByBuyer(Number(customerId));
      const orders = Array.isArray(response.data) ? response.data : [];

      const results = await Promise.all(
        orders.map(async (order) => {
          try {
            if (!order.animalId) {
              return { order, animal: null };
            }

            const animalResponse = await getAnimalById(order.animalId);

            return {
              order,
              animal: animalResponse.data || null,
            };
          } catch (error) {
            console.error("Animal details loading error:", error);
            return { order, animal: null };
          }
        }),
      );

      setPurchasedAnimals(results);
    } catch (error) {
      console.error("Buyer Orders Loading Error:", error);

      setPurchasedError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to load your orders.",
      );

      setPurchasedAnimals([]);
    } finally {
      setPurchasedLoading(false);
    }
  };

  // =====================================================
  // INITIAL DASHBOARD LOAD
  // =====================================================

  useEffect(() => {
    loadAnimals();
    loadPurchasedAnimals();

    // Initial dashboard load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =====================================================
  // ANIMAL IMAGE URL
  // =====================================================

  const getImageUrl = (animal) => {
    const image =
      animal?.frontImageUrl ||
      animal?.imageUrl ||
      animal?.sideImageUrl ||
      animal?.backImageUrl;

    if (!image) return "/images/default-animal.jpg";

    if (/^https?:\/\//i.test(image)) return image;

    return apiUrl(image.startsWith("/") ? image : `/${image}`);
  };

  // =====================================================
  // CATEGORY FILTER
  // =====================================================

  const categories = useMemo(
    () => [
      "All",
      ...new Set(animals.map((animal) => animal.category).filter(Boolean)),
    ],
    [animals],
  );

  const filteredAnimals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return animals.filter((animal) => {
      const matchesCategory =
        category === "All" || animal.category === category;

      const searchableText = [
        animal.animalName,
        animal.category,
        animal.breed,
        animal.location,
        animal.sellerName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [animals, category, search]);

  // =====================================================
  // ORDER STATUS
  // =====================================================

  const orderStatus = (order) =>
    String(order?.status || "")
      .trim()
      .toUpperCase();

  const pendingOrders = purchasedAnimals.filter(({ order }) =>
    ["PENDING", "PROCESSING", "CONFIRMED"].includes(orderStatus(order)),
  ).length;

  const completedOrders = purchasedAnimals.filter(({ order }) =>
    ["COMPLETED", "DELIVERED"].includes(orderStatus(order)),
  ).length;

  // =====================================================
  // SIDEBAR NAVIGATION
  // =====================================================

  const handleSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);

    // HOME: Open the main landing page.
    if (section === "home") {
      navigate("/");
      return;
    }

    if (section === "bids") {
      navigate("/buyer/bids");
      return;
    }

    if (section === "profile") {
      navigate("/buyer/profile");
      return;
    }

    if (section === "chat") {
      const animalId = localStorage.getItem("lastChatAnimalId");
      const sellerId = localStorage.getItem("lastChatSellerId");

      if (!customerId) {
        navigate("/buyer/login");
      } else if (animalId && sellerId) {
        navigate(
          `/buyer/chat?animalId=${encodeURIComponent(animalId)}&sellerId=${encodeURIComponent(sellerId)}`,
        );
      } else {
        navigate("/buyer/chat");
      }

      return;
    }

    const sectionId =
      section === "orders"
        ? "buyer-orders"
        : section === "animals"
          ? "available-animals"
          : "buyer-overview";

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // =====================================================
  // CHAT WITH PURCHASED ANIMAL SELLER
  // =====================================================

  const handlePurchasedAnimalChat = (animalId, sellerId) => {
    if (!customerId) {
      navigate("/buyer/login");
      return;
    }

    if (!animalId || !sellerId) {
      window.alert("Animal or seller information is missing.");
      return;
    }

    localStorage.setItem("lastChatAnimalId", String(animalId));
    localStorage.setItem("lastChatSellerId", String(sellerId));

    navigate(
      `/buyer/chat?animalId=${encodeURIComponent(animalId)}&sellerId=${encodeURIComponent(sellerId)}`,
    );
  };

  // =====================================================
  // SIDEBAR MENU ITEMS
  // =====================================================

  const menuItems = [
    { id: "home", icon: "⌂", label: "Home" },
    { id: "overview", icon: "◫", label: "Overview" },
    { id: "animals", icon: "♧", label: "Browse Animals" },
    { id: "orders", icon: "▤", label: "My Orders" },
    { id: "bids", icon: "⇄", label: "My Bids" },
    { id: "chat", icon: "▤", label: "Messages" },
    { id: "profile", icon: "♙", label: "My Profile" },
  ];

  return (
    <div
      className={`buyer-dashboard ${
        mobileMenuOpen ? "buyer-mobile-menu-open" : ""
      }`}
    >
      {/* =================================================
          MOBILE RESPONSIVE STYLES
          Keeps the existing BuyerDashboard.css unchanged.
      ================================================= */}
      <style>{`
  .buyer-mobile-menu-toggle {
    display: none !important;
  }

  .buyer-mobile-overlay {
    display: none;
  }

  .buyer-header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 768px) {
    .buyer-dashboard {
      display: block !important;
      width: 100% !important;
      min-height: 100vh;
      overflow-x: clip;
    }

    .buyer-sidebar {
      position: fixed !important;
      top: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      width: min(290px, 86vw) !important;
      max-width: 86vw !important;
      height: 100vh !important;
      height: 100dvh !important;
      max-height: 100dvh !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      z-index: 1001 !important;
      transform: translateX(-105%);
      transition: transform 220ms ease;
      box-shadow: 6px 0 25px rgba(0, 0, 0, 0.12);
      box-sizing: border-box;
    }

    .buyer-dashboard.buyer-mobile-menu-open .buyer-sidebar {
      transform: translateX(0);
    }

    .buyer-mobile-overlay {
      display: none;
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: 0;
      background: rgba(16, 31, 22, 0.45);
      z-index: 1000;
      cursor: pointer;
    }

    .buyer-dashboard.buyer-mobile-menu-open .buyer-mobile-overlay {
      display: block;
    }

    .buyer-main {
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 20px 14px 28px !important;
      box-sizing: border-box;
    }

    .buyer-mobile-menu-toggle {
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      gap: 7px;
      min-height: 42px;
      padding: 9px 13px;
      border: 1px solid #dce5df;
      border-radius: 10px;
      background: #ffffff;
      color: #244632;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }

    .buyer-header-actions {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      gap: 9px;
    }

    .buyer-header-actions > button {
      flex: 1 1 auto;
    }

    .buyer-page-header {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 15px !important;
    }

    .buyer-page-header h1 {
      font-size: clamp(23px, 6vw, 30px) !important;
      line-height: 1.25;
      overflow-wrap: anywhere;
    }

    .buyer-page-header p {
      font-size: 13px;
      line-height: 1.6;
    }

    .buyer-welcome-panel {
      padding: 20px !important;
      min-width: 0;
      box-sizing: border-box;
      overflow: hidden;
    }

    .buyer-welcome-panel h2 {
      font-size: clamp(21px, 5.5vw, 28px) !important;
      line-height: 1.3;
      overflow-wrap: anywhere;
    }

    .buyer-welcome-panel p {
      font-size: 13px;
      line-height: 1.65;
    }

    .buyer-welcome-decoration {
      display: none !important;
    }

    .buyer-stats-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 12px !important;
    }

    .buyer-stat-card {
      min-width: 0;
      padding: 15px !important;
      box-sizing: border-box;
    }

    .buyer-stat-card strong {
      font-size: 25px;
      overflow-wrap: anywhere;
    }

    .buyer-stat-top {
      gap: 7px;
      font-size: 12px;
      line-height: 1.5;
    }

    .buyer-stat-icon {
      flex-shrink: 0;
    }

    .buyer-content-section {
      min-width: 0;
      margin-top: 28px !important;
    }

    .buyer-section-header {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 9px !important;
    }

    .buyer-section-header h2 {
      font-size: 21px !important;
      line-height: 1.35;
    }

    .buyer-section-header p {
      font-size: 13px;
      line-height: 1.6;
    }

    .buyer-filter-bar {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 10px !important;
    }

    .buyer-search-box,
    .buyer-category-select {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
      box-sizing: border-box;
    }

    .buyer-animal-grid,
    .buyer-purchased-grid {
      grid-template-columns: minmax(0, 1fr) !important;
      width: 100%;
      gap: 17px !important;
    }

    .buyer-animal-card,
    .buyer-purchased-card {
      min-width: 0 !important;
      width: 100%;
      box-sizing: border-box;
    }

    .buyer-animal-image-wrap {
      min-width: 0;
      overflow: hidden;
    }

    .buyer-animal-image,
    .buyer-image-placeholder {
      max-width: 100%;
      box-sizing: border-box;
      object-fit: cover;
    }

    .buyer-animal-card-body,
    .buyer-purchased-body {
      min-width: 0;
      padding: 15px !important;
      box-sizing: border-box;
    }

    .buyer-card-title-row {
      align-items: flex-start !important;
      flex-wrap: wrap;
      gap: 8px;
    }

    .buyer-card-title-row h3 {
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .buyer-order-details {
      grid-template-columns: minmax(70px, auto) minmax(0, 1fr) !important;
      gap: 8px 12px;
      overflow-wrap: anywhere;
    }

    .buyer-purchased-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    .buyer-card-actions {
      display: flex !important;
      flex-direction: column !important;
      width: 100%;
      gap: 9px !important;
    }

    .buyer-card-actions button {
      width: 100%;
      min-height: 42px;
      box-sizing: border-box;
    }

    .buyer-animal-card-footer {
      gap: 12px;
      flex-wrap: wrap;
    }

    .buyer-animal-card-footer > button {
      max-width: 100%;
      white-space: normal;
    }

    .buyer-state-box {
      max-width: 100%;
      box-sizing: border-box;
      overflow-wrap: anywhere;
    }

    .buyer-dashboard-footer {
      display: flex !important;
      flex-direction: column !important;
      gap: 7px;
      text-align: center;
      line-height: 1.6;
    }
  }

  @media (max-width: 380px) {
    .buyer-stats-grid {
      grid-template-columns: minmax(0, 1fr) !important;
    }

    .buyer-main {
      padding-right: 11px !important;
      padding-left: 11px !important;
    }

    .buyer-welcome-panel {
      padding: 16px !important;
    }

    .buyer-mobile-menu-toggle {
      padding: 9px 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .buyer-sidebar {
      transition: none !important;
    }
  }

  /* =====================================================
     MOBILE SIDEBAR IMPROVEMENTS
     Keep all navigation options visible and well aligned.
  ===================================================== */

  @media (max-width: 768px) {
    .buyer-sidebar {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;

      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      bottom: 0 !important;

      width: min(290px, 86vw) !important;
      max-width: 86vw !important;
      height: 100vh !important;
      height: 100dvh !important;
      max-height: 100dvh !important;

      padding: 18px 14px !important;
      box-sizing: border-box !important;

      overflow-x: hidden !important;
      overflow-y: auto !important;
      overscroll-behavior: contain;

      background: #ffffff !important;
      z-index: 1001 !important;
      box-shadow: 6px 0 25px rgba(0, 0, 0, 0.12);

      transition: transform 220ms ease;
    }

    .buyer-dashboard:not(.buyer-mobile-menu-open) .buyer-sidebar {
      transform: translateX(-105%) !important;
    }

    .buyer-dashboard.buyer-mobile-menu-open .buyer-sidebar {
      transform: translateX(0) !important;
    }

    .buyer-sidebar .buyer-brand {
      display: flex !important;
      align-items: center !important;
      width: 100% !important;
      flex-shrink: 0;
      box-sizing: border-box;
      margin-bottom: 20px;
    }

    .buyer-menu-heading {
      flex-shrink: 0;
      margin: 8px 0 12px !important;
    }

    .buyer-sidebar-nav {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 6px !important;
      width: 100% !important;
      flex-shrink: 0;
    }

    .buyer-sidebar-nav .buyer-menu-item {
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      gap: 12px !important;

      width: 100% !important;
      min-height: 46px;
      flex-shrink: 0;

      box-sizing: border-box !important;
      padding: 11px 13px !important;
      text-align: left !important;
      white-space: normal !important;
    }

    .buyer-menu-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 26px;
      min-width: 26px;
    }

    .buyer-sidebar-help {
      display: block !important;
      width: 100% !important;
      flex-shrink: 0;
      box-sizing: border-box !important;
      margin-top: 24px !important;
    }

    .buyer-sidebar-footer {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;

      width: 100% !important;
      flex-shrink: 0;

      box-sizing: border-box !important;
      margin-top: auto !important;
      padding-top: 18px !important;
      padding-bottom: max(12px, env(safe-area-inset-bottom)) !important;
    }

    .buyer-user-info {
      flex: 1;
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .buyer-user-info strong {
      overflow-wrap: anywhere;
    }

    .buyer-mobile-menu-toggle {
      align-self: flex-start !important;
    }

    .buyer-mobile-overlay {
      position: fixed !important;
      inset: 0 !important;
      z-index: 1000 !important;
    }
  }
`}</style>

      {/* =================================================
          DESKTOP / MOBILE SIDEBAR
      ================================================= */}

      <aside className="buyer-sidebar">
        <button
          className="buyer-brand"
          onClick={() => handleSection("overview")}
          type="button"
        >
          <span className="buyer-brand-icon">A</span>
          <span>
            <strong>AnimalSale</strong>
            <small>BUYER PORTAL</small>
          </span>
        </button>

        <div className="buyer-menu-heading">WORKSPACE</div>

        <nav className="buyer-sidebar-nav" aria-label="Buyer navigation">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`buyer-menu-item ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => handleSection(item.id)}
            >
              <span className="buyer-menu-icon">{item.icon}</span>
              <span>{item.label}</span>

              {item.id === "orders" && purchasedAnimals.length > 0 && (
                <span className="buyer-menu-count">
                  {purchasedAnimals.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="buyer-sidebar-help">
          <div className="buyer-help-icon">?</div>
          <strong>Need assistance?</strong>
          <p>Explore animals or contact your seller for more information.</p>
          <button type="button" onClick={() => handleSection("animals")}>
            Explore animals →
          </button>
        </div>

        <div className="buyer-sidebar-footer">
          <span className="buyer-avatar">
            {customerName.charAt(0).toUpperCase()}
          </span>

          <span className="buyer-user-info">
            <strong>{customerName}</strong>
            <small>Buyer account</small>
          </span>
        </div>
      </aside>

      {/* Overlay closes the sidebar on mobile. */}
      <button
        type="button"
        className="buyer-mobile-overlay"
        aria-label="Close navigation menu"
        aria-hidden={!mobileMenuOpen}
        tabIndex={mobileMenuOpen ? 0 : -1}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* =================================================
          MAIN DASHBOARD
      ================================================= */}

      <main className="buyer-main">
        <header className="buyer-page-header">
          <div>
            <div className="buyer-breadcrumb">Workspace / Overview</div>
            <h1>Buyer Dashboard</h1>
            <p>Manage your orders and discover quality animals.</p>
          </div>

          <div className="buyer-header-actions">
            {/* Mobile menu button. Hidden on desktop. */}
            <button
              type="button"
              className="buyer-mobile-menu-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((previous) => !previous)}
            >
              <span aria-hidden="true">{mobileMenuOpen ? "✕" : "☰"}</span>
              <span>Menu</span>
            </button>

            <button
              className="buyer-primary-button"
              type="button"
              onClick={() => handleSection("animals")}
            >
              <span>＋</span> Browse Animals
            </button>
          </div>
        </header>

        {!customerId && (
          <div className="buyer-notice">
            You are browsing as a guest.{" "}
            <button onClick={() => navigate("/buyer/login")} type="button">
              Login to view your orders
            </button>
          </div>
        )}

        {/* =================================================
            WELCOME
        ================================================= */}

        <section id="buyer-overview" className="buyer-welcome-panel">
          <div className="buyer-welcome-content">
            <span className="buyer-eyebrow">YOUR BUYING SPACE</span>

            <h2>Welcome back, {customerName}!</h2>

            <p>
              Find your next animal, track your orders and stay connected with
              sellers — all in one place.
            </p>

            <button
              type="button"
              onClick={() => handleSection("animals")}
              className="buyer-welcome-button"
            >
              Discover Animals <span>→</span>
            </button>
          </div>

          <div className="buyer-welcome-decoration" aria-hidden="true">
            <span>✳</span>
            <div className="buyer-welcome-circle">A</div>
          </div>
        </section>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <section className="buyer-stats-grid" aria-label="Buyer summary">
          <article className="buyer-stat-card">
            <div className="buyer-stat-top">
              <span>Available Animals</span>
              <span className="buyer-stat-icon blue">♧</span>
            </div>
            <strong>{loading ? "—" : animals.length}</strong>
            <small>Approved listings available</small>
          </article>

          <article className="buyer-stat-card">
            <div className="buyer-stat-top">
              <span>My Orders</span>
              <span className="buyer-stat-icon purple">▤</span>
            </div>
            <strong>{purchasedLoading ? "—" : purchasedAnimals.length}</strong>
            <small>Orders in your account</small>
          </article>

          <article className="buyer-stat-card">
            <div className="buyer-stat-top">
              <span>Pending Orders</span>
              <span className="buyer-stat-icon orange">◷</span>
            </div>
            <strong>{purchasedLoading ? "—" : pendingOrders}</strong>
            <small>Awaiting completion</small>
          </article>

          <article className="buyer-stat-card">
            <div className="buyer-stat-top">
              <span>Completed Orders</span>
              <span className="buyer-stat-icon green">✓</span>
            </div>
            <strong>{purchasedLoading ? "—" : completedOrders}</strong>
            <small>Completed or delivered</small>
          </article>
        </section>

        {/* =================================================
            PURCHASED ANIMALS / ORDERS
        ================================================= */}

        <section className="buyer-content-section" id="buyer-orders">
          <div className="buyer-section-header">
            <div>
              <span className="buyer-section-kicker">YOUR ACTIVITY</span>
              <h2>My Purchased Animals</h2>
              <p>Review your orders and connect with their sellers.</p>
            </div>

            <span className="buyer-section-total">
              {purchasedLoading
                ? "Loading…"
                : `${purchasedAnimals.length} orders`}
            </span>
          </div>

          {purchasedLoading ? (
            <div className="buyer-state-box">
              <div className="buyer-spinner" />
              Loading your orders...
            </div>
          ) : purchasedError ? (
            <div className="buyer-state-box buyer-state-warning">
              {purchasedError}
            </div>
          ) : purchasedAnimals.length === 0 ? (
            <div className="buyer-state-box">
              <span className="buyer-empty-icon">▤</span>
              <strong>No orders yet</strong>
              <p>Your purchased animals and order details will appear here.</p>

              <button
                className="buyer-primary-button"
                type="button"
                onClick={() => handleSection("animals")}
              >
                Browse Animals
              </button>
            </div>
          ) : (
            <div className="buyer-purchased-grid">
              {purchasedAnimals.map(({ order, animal }) => {
                const animalId = animal?.id || order.animalId;
                const sellerId = order.sellerId || animal?.sellerId;
                const status = orderStatus(order);

                return (
                  <article
                    className="buyer-purchased-card"
                    key={order.id || `${animalId}-${sellerId}`}
                  >
                    {animal ? (
                      <img
                        className="buyer-animal-image"
                        src={getImageUrl(animal)}
                        alt={animal.animalName || "Purchased animal"}
                        onError={(event) => {
                          if (event.currentTarget.dataset.fallbackApplied) {
                            return;
                          }

                          event.currentTarget.dataset.fallbackApplied = "true";
                          event.currentTarget.src =
                            "/images/default-animal.jpg";
                        }}
                      />
                    ) : (
                      <div className="buyer-image-placeholder">
                        Animal image unavailable
                      </div>
                    )}

                    <div className="buyer-purchased-body">
                      <div className="buyer-card-title-row">
                        <h3>
                          {animal?.animalName || order.animalName || "Animal"}
                        </h3>

                        <span
                          className={`buyer-status ${
                            ["COMPLETED", "DELIVERED"].includes(status)
                              ? "success"
                              : ["CANCELLED", "REJECTED"].includes(status)
                                ? "danger"
                                : "pending"
                          }`}
                        >
                          {order.status || "Unknown"}
                        </span>
                      </div>

                      <p className="buyer-animal-meta">
                        {animal?.category || "Animal"} ·{" "}
                        {animal?.breed || "Breed not specified"}
                      </p>

                      <div className="buyer-order-details">
                        <span>Order ID</span>
                        <strong>{order.orderNumber || order.id || "—"}</strong>

                        <span>Seller</span>
                        <strong>
                          {order.sellerName || animal?.sellerName || "—"}
                        </strong>
                      </div>

                      <div className="buyer-purchased-bottom">
                        <strong className="buyer-price">
                          ₹{" "}
                          {order.totalAmount ??
                            order.amount ??
                            animal?.price ??
                            "—"}
                        </strong>

                        <button
                          type="button"
                          className="buyer-text-button"
                          onClick={() => navigate(`/buyer/order/${order.id}`)}
                          disabled={!order.id}
                        >
                          Order details →
                        </button>
                      </div>

                      <div className="buyer-card-actions">
                        {animalId && (
                          <button
                            type="button"
                            className="buyer-secondary-button"
                            onClick={() => navigate(`/animal/${animalId}`)}
                          >
                            View Animal
                          </button>
                        )}

                        <button
                          type="button"
                          className="buyer-chat-button"
                          disabled={!animalId || !sellerId}
                          onClick={() =>
                            handlePurchasedAnimalChat(animalId, sellerId)
                          }
                        >
                          Chat with Seller
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* =================================================
            AVAILABLE ANIMALS
        ================================================= */}

        <section className="buyer-content-section" id="available-animals">
          <div className="buyer-section-header buyer-animals-heading">
            <div>
              <span className="buyer-section-kicker">EXPLORE MARKETPLACE</span>
              <h2>Available Animals</h2>
              <p>Discover listings from approved sellers.</p>
            </div>

            <span className="buyer-section-total">
              {loading ? "Loading…" : `${filteredAnimals.length} available`}
            </span>
          </div>

          {/* SEARCH AND CATEGORY FILTER */}

          <div className="buyer-filter-bar">
            <label className="buyer-search-box">
              <span>⌕</span>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, breed, location..."
                aria-label="Search available animals"
              />

              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                >
                  ×
                </button>
              )}
            </label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
              className="buyer-category-select"
            >
              {categories.map((item) => (
                <option value={item} key={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="buyer-state-box">
              <div className="buyer-spinner" />
              Loading available animals...
            </div>
          ) : errorMessage ? (
            <div className="buyer-state-box buyer-state-warning">
              {errorMessage}

              <button
                type="button"
                className="buyer-secondary-button"
                onClick={loadAnimals}
              >
                Try Again
              </button>
            </div>
          ) : filteredAnimals.length === 0 ? (
            <div className="buyer-state-box">
              <strong>No matching animals found</strong>
              <p>Try a different search or category.</p>

              <button
                type="button"
                className="buyer-secondary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="buyer-animal-grid">
              {filteredAnimals.map((animal) => (
                <article className="buyer-animal-card" key={animal.id}>
                  <div className="buyer-animal-image-wrap">
                    <img
                      src={getImageUrl(animal)}
                      alt={animal.animalName || "Available animal"}
                      className="buyer-animal-image"
                      onError={(event) => {
                        if (event.currentTarget.dataset.fallbackApplied) {
                          return;
                        }

                        event.currentTarget.dataset.fallbackApplied = "true";
                        event.currentTarget.src = "/images/default-animal.jpg";
                      }}
                    />

                    <span className="buyer-available-badge">Available</span>
                  </div>

                  <div className="buyer-animal-card-body">
                    <div className="buyer-animal-card-category">
                      {animal.category || "Animal"}
                    </div>

                    <h3>{animal.animalName || "Unnamed Animal"}</h3>

                    <p className="buyer-animal-meta">
                      {animal.breed || "Breed not specified"}
                    </p>

                    <div className="buyer-animal-facts">
                      <span>Age: {animal.age ?? "—"}</span>
                      <span>Gender: {animal.gender || "—"}</span>
                    </div>

                    <div className="buyer-animal-location">
                      <span>⌖</span>{" "}
                      {animal.location || "Location not specified"}
                    </div>

                    <div className="buyer-animal-card-footer">
                      <div>
                        <small>Listed price</small>
                        <strong>₹ {animal.price ?? "—"}</strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate(`/animal/${animal.id}`)}
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="buyer-dashboard-footer">
          <span>AnimalSale · Buyer Portal</span>
          <span>Your marketplace, all in one place.</span>
        </footer>
      </main>
    </div>
  );
}

export default BuyerDashboard;
