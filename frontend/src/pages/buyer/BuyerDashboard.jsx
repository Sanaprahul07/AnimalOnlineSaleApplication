import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllAnimals } from "../../services/AnimalService";

function BuyerDashboard() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // LOAD ANIMALS
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
  // LOAD DATA ON PAGE LOAD
  // =====================================================

  useEffect(() => {
    loadAnimals();
  }, []);

  // =====================================================
  // ANIMAL IMAGE URL
  // =====================================================

  const getImageUrl = (animal) => {
    const image =
      animal.frontImageUrl ||
      animal.imageUrl ||
      animal.sideImageUrl ||
      animal.backImageUrl;

    if (!image) {
      return "/images/default-animal.jpg";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `http://localhost:8080${image.startsWith("/") ? "" : "/"}${image}`;
  };

  return (
    <div
      className="container-fluid py-4"
      style={{
        backgroundColor: "#f7f8fc",
        minHeight: "100vh",
      }}
    >
      {/* =====================================================
                          HEADER
         ===================================================== */}

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

      {/* =====================================================
                          ERROR MESSAGE
         ===================================================== */}

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* =====================================================
                          SUMMARY CARDS
         ===================================================== */}

      <div className="row g-4 mb-4">
        {/* AVAILABLE ANIMALS */}

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted">Available Animals</h6>

              <h2 className="fw-bold mb-0">{animals.length}</h2>
            </div>
          </div>
        </div>

        {/* CATEGORIES */}

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

        {/* VERIFIED SELLERS */}

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

      {/* =====================================================
                        AVAILABLE ANIMALS
         ===================================================== */}

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {/* SECTION HEADER */}

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold mb-1">Available Animals</h4>

              <small className="text-muted">
                Animals listed by approved sellers
              </small>
            </div>
          </div>

          {/* =================================================
                              LOADING
             ================================================= */}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" />

              <p className="mt-3 text-muted">Loading animals...</p>
            </div>
          ) : animals.length === 0 ? (
            /* =================================================
                              NO ANIMALS
               ================================================= */

            <div className="alert alert-info mb-0">
              No animals are currently available.
            </div>
          ) : (
            /* =================================================
                              ANIMAL LIST
               ================================================= */

            <div className="row g-4">
              {animals.map((animal) => (
                <div className="col-md-6 col-lg-4 col-xl-3" key={animal.id}>
                  <div className="card h-100 border-0 shadow-sm">
                    {/* ANIMAL IMAGE */}

                    <img
                      src={getImageUrl(animal)}
                      alt={animal.animalName || "Animal"}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                      onError={(event) => {
                        event.currentTarget.src = "/images/default-animal.jpg";
                      }}
                    />

                    {/* ANIMAL DETAILS */}

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

                      {/* VIEW DETAILS */}

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
