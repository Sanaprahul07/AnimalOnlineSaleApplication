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

  const customerId = localStorage.getItem("customerId");
  const customerName = localStorage.getItem("customerName") || "Buyer";

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

  useEffect(() => {
    loadAnimals();
    loadPurchasedAnimals();
    // Initial dashboard load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSection = (section) => {
    setActiveSection(section);

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

  const menuItems = [
    { id: "overview", icon: "⌂", label: "Overview" },
    { id: "animals", icon: "♧", label: "Browse Animals" },
    { id: "orders", icon: "▤", label: "My Orders" },
    { id: "bids", icon: "⇄", label: "My Bids" },
    { id: "chat", icon: "▤", label: "Messages" },
    { id: "profile", icon: "♙", label: "My Profile" },
  ];

  return (
    <div className="buyer-dashboard">
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

      <main className="buyer-main">
        <header className="buyer-page-header">
          <div>
            <div className="buyer-breadcrumb">Workspace / Overview</div>
            <h1>Buyer Dashboard</h1>
            <p>Manage your orders and discover quality animals.</p>
          </div>

          <button
            className="buyer-primary-button"
            type="button"
            onClick={() => handleSection("animals")}
          >
            <span>＋</span> Browse Animals
          </button>
        </header>

        {!customerId && (
          <div className="buyer-notice">
            You are browsing as a guest.{" "}
            <button onClick={() => navigate("/buyer/login")} type="button">
              Login to view your orders
            </button>
          </div>
        )}

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
                          if (event.currentTarget.dataset.fallbackApplied)
                            return;
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
                        if (event.currentTarget.dataset.fallbackApplied) return;
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

        <footer className="buyer-dashboard-footer">
          <span>AnimalSale · Buyer Portal</span>
          <span>Your marketplace, all in one place.</span>
        </footer>
      </main>
    </div>
  );
}

export default BuyerDashboard;
