import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllAnimals, getAnimalById } from "../../services/AnimalService";

import { getOrdersByBuyer } from "../../services/OrderService";

function BuyerDashboard() {
  const navigate = useNavigate();

  // =====================================================
  // EXISTING AVAILABLE ANIMALS STATE
  // =====================================================

  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // NEW - PURCHASED ANIMALS STATE
  // =====================================================

  const [purchasedAnimals, setPurchasedAnimals] = useState([]);
  const [purchasedLoading, setPurchasedLoading] = useState(true);
  const [purchasedError, setPurchasedError] = useState("");

  // =====================================================
  // EXISTING - LOAD AVAILABLE ANIMALS
  // =====================================================

  const loadAnimals = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await getAllAnimals();

      const data = Array.isArray(response.data) ? response.data : [];

      const availableAnimals = data.filter(
        (animal) =>
          animal.available === true &&
          animal.approvalStatus === "APPROVED" &&
          animal.sellerId,
      );

      setAnimals(availableAnimals);
    } catch (error) {
      console.error("Buyer Animals Loading Error:", error);

      const backendMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || error.response?.data?.error;

      setErrorMessage(backendMessage || "Unable to load animals.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // NEW - LOAD LOGGED-IN CUSTOMER PURCHASED ANIMALS
  // =====================================================

  const loadPurchasedAnimals = async () => {
    try {
      setPurchasedLoading(true);
      setPurchasedError("");

      const customerId = localStorage.getItem("customerId");

      // =================================================
      // CUSTOMER LOGIN CHECK
      // =================================================

      if (!customerId) {
        setPurchasedAnimals([]);
        setPurchasedError(
          "Please login as a customer to view your purchased animals.",
        );
        return;
      }

      // =================================================
      // GET CUSTOMER ORDERS
      // =================================================

      const orderResponse = await getOrdersByBuyer(Number(customerId));

      const orders = Array.isArray(orderResponse.data)
        ? orderResponse.data
        : [];

      // =================================================
      // GET ANIMAL DETAILS FOR EACH ORDER
      // =================================================

      const purchasedData = await Promise.all(
        orders.map(async (order) => {
          try {
            if (!order.animalId) {
              return {
                order,
                animal: null,
              };
            }

            const animalResponse = await getAnimalById(order.animalId);

            return {
              order,
              animal: animalResponse.data || null,
            };
          } catch (animalError) {
            console.error(
              `Unable to load Animal ID ${order.animalId}:`,
              animalError,
            );

            return {
              order,
              animal: null,
            };
          }
        }),
      );

      setPurchasedAnimals(purchasedData);
    } catch (error) {
      console.error("Customer Purchased Animals Loading Error:", error);

      const backendMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || error.response?.data?.error;

      setPurchasedError(
        backendMessage || "Unable to load your purchased animals.",
      );

      setPurchasedAnimals([]);
    } finally {
      setPurchasedLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    loadAnimals();
  }, []);

  useEffect(() => {
    loadPurchasedAnimals();
  }, []);

  // =====================================================
  // EXISTING IMAGE URL FUNCTION
  // =====================================================

  const getImageUrl = (animal) => {
    const image =
      animal?.frontImageUrl ||
      animal?.imageUrl ||
      animal?.sideImageUrl ||
      animal?.backImageUrl;

    if (!image) {
      return "/images/default-animal.jpg";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `http://localhost:8080${image.startsWith("/") ? "" : "/"}${image}`;
  };

  // =====================================================
  // NEW - OPEN DIRECT CHAT
  // =====================================================

  const handlePurchasedAnimalChat = (animalId, sellerId) => {
    const customerId = localStorage.getItem("customerId");

    // =================================================
    // CUSTOMER LOGIN CHECK
    // =================================================

    if (!customerId) {
      navigate("/buyer/login");
      return;
    }

    // =================================================
    // CHAT DATA CHECK
    // =================================================

    if (!animalId || !sellerId) {
      alert("Animal or seller information is missing for chat.");
      return;
    }

    // =================================================
    // SAVE LAST ACTIVE CHAT
    // =================================================

    localStorage.setItem("lastChatAnimalId", String(animalId));

    localStorage.setItem("lastChatSellerId", String(sellerId));

    // =================================================
    // OPEN DIRECT CHAT
    // =================================================

    navigate(`/buyer/chat?animalId=${animalId}&sellerId=${sellerId}`);
  };

  // =====================================================
  // RETURN UI
  // =====================================================

  return (
    <div
      className="container-fluid py-4"
      style={{
        backgroundColor: "#f7f8fc",
        minHeight: "100vh",
      }}
    >
      {/* =================================================
          HEADER
          ================================================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Buyer Dashboard</h2>

          <p className="text-muted mb-0">
            Find and purchase animals from verified sellers.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/animals")}
        >
          Browse Animals
        </button>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* =================================================
          SUMMARY CARDS
          EXISTING CODE KEPT
          ================================================= */}

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted">Available Animals</h6>

              <h2 className="fw-bold mb-0">{animals.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted">Categories</h6>

              <h2 className="fw-bold mb-0">
                {
                  new Set(
                    animals.map((animal) => animal.category).filter(Boolean),
                  ).size
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted">Verified Sellers</h6>

              <h2 className="fw-bold mb-0">
                {
                  new Set(
                    animals.map((animal) => animal.sellerId).filter(Boolean),
                  ).size
                }
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          NEW - MY PURCHASED ANIMALS
          ================================================= */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold mb-1">My Purchased Animals</h4>

              <small className="text-muted">
                Animals purchased by your customer account
              </small>
            </div>

            {!purchasedLoading && (
              <span className="badge bg-success fs-6">
                {purchasedAnimals.length} Purchased
              </span>
            )}
          </div>

          {/* =================================================
              PURCHASED LOADING
              ================================================= */}

          {purchasedLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status" />

              <p className="mt-3 text-muted">
                Loading your purchased animals...
              </p>
            </div>
          ) : purchasedError ? (
            <div className="alert alert-warning mb-0">{purchasedError}</div>
          ) : purchasedAnimals.length === 0 ? (
            <div className="alert alert-info mb-0">
              You have not purchased any animals yet.
            </div>
          ) : (
            <div className="row g-4">
              {purchasedAnimals.map(({ order, animal }) => {
                const animalId = animal?.id || order.animalId;

                const sellerId = order.sellerId || animal?.sellerId;

                return (
                  <div
                    className="col-md-6 col-lg-4 col-xl-3"
                    key={order.id || `${animalId}-${sellerId}`}
                  >
                    <div className="card h-100 border-0 shadow-sm">
                      {/* =================================================
                            PURCHASED ANIMAL IMAGE
                            ================================================= */}

                      {animal ? (
                        <img
                          src={getImageUrl(animal)}
                          alt={
                            animal.animalName || order.animalName || "Animal"
                          }
                          className="card-img-top"
                          style={{
                            height: "220px",
                            objectFit: "cover",
                          }}
                          onError={(event) => {
                            if (
                              event.currentTarget.dataset.fallbackApplied ===
                              "true"
                            ) {
                              return;
                            }

                            event.currentTarget.dataset.fallbackApplied =
                              "true";

                            event.currentTarget.src =
                              "/images/default-animal.jpg";
                          }}
                        />
                      ) : (
                        <div
                          className="d-flex align-items-center justify-content-center bg-light"
                          style={{
                            height: "220px",
                            color: "#6c757d",
                          }}
                        >
                          No Animal Photo
                        </div>
                      )}

                      {/* =================================================
                            PURCHASED ANIMAL DETAILS
                            ================================================= */}

                      <div className="card-body">
                        <h5 className="fw-bold">
                          {animal?.animalName || order.animalName || "-"}
                        </h5>

                        <p className="mb-1">
                          <strong>Animal ID:</strong> {animalId || "-"}
                        </p>

                        <p className="mb-1">
                          <strong>Category:</strong> {animal?.category || "-"}
                        </p>

                        <p className="mb-1">
                          <strong>Breed:</strong> {animal?.breed || "-"}
                        </p>

                        <p className="mb-1">
                          <strong>Age:</strong> {animal?.age ?? "-"}
                        </p>

                        <p className="mb-1">
                          <strong>Gender:</strong> {animal?.gender || "-"}
                        </p>

                        <p className="mb-1">
                          <strong>Seller:</strong>{" "}
                          {order.sellerName || animal?.sellerName || "-"}
                        </p>

                        <p className="mb-1">
                          <strong>Order:</strong>{" "}
                          {order.orderNumber || order.id || "-"}
                        </p>

                        <p className="mb-1">
                          <strong>Order Status:</strong> {order.status || "-"}
                        </p>

                        <h5 className="fw-bold mt-3">
                          ₹{" "}
                          {order.totalAmount ??
                            order.amount ??
                            animal?.price ??
                            "-"}
                        </h5>

                        <hr />

                        {/* =================================================
                              VIEW ANIMAL
                              ================================================= */}

                        {animalId && (
                          <button
                            type="button"
                            className="btn btn-outline-primary w-100 mb-2"
                            onClick={() => navigate(`/animal/${animalId}`)}
                          >
                            View Animal
                          </button>
                        )}

                        {/* =================================================
                              DIRECT CHAT
                              ================================================= */}

                        <button
                          type="button"
                          className="btn btn-success w-100"
                          onClick={() =>
                            handlePurchasedAnimalChat(animalId, sellerId)
                          }
                          disabled={!animalId || !sellerId}
                        >
                          💬 Chat with Seller
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* =================================================
          AVAILABLE ANIMALS
          EXISTING CODE KEPT
          ================================================= */}

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold mb-1">Available Animals</h4>

              <small className="text-muted">
                Animals listed by approved sellers
              </small>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" />

              <p className="mt-3 text-muted">Loading animals...</p>
            </div>
          ) : animals.length === 0 ? (
            <div className="alert alert-info mb-0">
              No animals are currently available.
            </div>
          ) : (
            <div className="row g-4">
              {animals.map((animal) => (
                <div className="col-md-6 col-lg-4 col-xl-3" key={animal.id}>
                  <div className="card h-100 border-0 shadow-sm">
                    <img
                      src={getImageUrl(animal)}
                      alt={animal.animalName || "Animal"}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                      onError={(event) => {
                        // =================================================
                        // PREVENT INFINITE FALLBACK IMAGE LOOP
                        // =================================================

                        if (
                          event.currentTarget.dataset.fallbackApplied === "true"
                        ) {
                          return;
                        }

                        event.currentTarget.dataset.fallbackApplied = "true";

                        event.currentTarget.src = "/images/default-animal.jpg";
                      }}
                    />

                    <div className="card-body">
                      <h5 className="fw-bold">{animal.animalName || "-"}</h5>

                      <p className="mb-1">
                        <strong>Category:</strong> {animal.category || "-"}
                      </p>

                      <p className="mb-1">
                        <strong>Breed:</strong> {animal.breed || "-"}
                      </p>

                      <p className="mb-1">
                        <strong>Age:</strong> {animal.age ?? "-"}
                      </p>

                      <p className="mb-1">
                        <strong>Gender:</strong> {animal.gender || "-"}
                      </p>

                      <p className="mb-1">
                        <strong>Location:</strong> {animal.location || "-"}
                      </p>

                      <h5 className="fw-bold mt-3">₹ {animal.price ?? "-"}</h5>

                      <hr />

                      <p className="mb-3">
                        <strong>Seller:</strong> {animal.sellerName || "-"}
                      </p>

                      <button
                        className="btn btn-primary w-100"
                        onClick={() => navigate(`/animal/${animal.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
