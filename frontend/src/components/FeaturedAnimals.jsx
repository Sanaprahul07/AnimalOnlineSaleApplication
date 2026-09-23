import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getApprovedAndAvailableAnimals } from "../services/AnimalService";

// =====================================================
// 10 ANIMALS PER PAGE
// =====================================================

const ANIMALS_PER_PAGE = 10;

function FeaturedAnimals() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);

  // =====================================================
  // LOAD APPROVED + AVAILABLE ANIMALS
  // =====================================================

  useEffect(() => {
    let active = true;

    const loadAnimals = async () => {
      try {
        setLoading(true);

        const response = await getApprovedAndAvailableAnimals();

        if (!active) return;

        // =================================================
        // BACKEND ALREADY RETURNS APPROVED + AVAILABLE
        // =================================================

        if (Array.isArray(response.data)) {
          setAnimals(response.data);
        } else {
          setAnimals([]);
        }

        setCurrentPage(0);

        console.log("Approved + Available Animals:", response.data);
      } catch (err) {
        console.error("LOAD APPROVED + AVAILABLE ANIMALS ERROR:", err);

        if (active) {
          setAnimals([]);

          setCurrentPage(0);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadAnimals();

    return () => {
      active = false;
    };
  }, []);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(animals.length / ANIMALS_PER_PAGE);

  const startIndex = currentPage * ANIMALS_PER_PAGE;

  const currentAnimals = animals.slice(
    startIndex,
    startIndex + ANIMALS_PER_PAGE,
  );

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // =====================================================
  // OPEN ANIMAL DETAILS
  // =====================================================

  const openAnimal = (animal) => {
    if (!animal?.id) {
      console.error("Animal ID is missing:", animal);

      return;
    }

    navigate(`/animal/${animal.id}`);
  };

  // =====================================================
  // PRICE FORMAT
  // =====================================================

  const priceText = (price) => {
    return price
      ? `₹${Number(price).toLocaleString("en-IN")}`
      : "Price on request";
  };

  // =====================================================
  // FRONT IMAGE
  // =====================================================

  const imageOf = (animal) => {
    return animal.frontImageUrl || animal.image || animal.imageUrl || null;
  };

  // =====================================================
  // BREED
  // =====================================================

  const breedOf = (animal) => {
    return (
      animal.breed ||
      animal.breedName ||
      animal.categoryName ||
      animal.category?.categoryName ||
      "Not specified"
    );
  };

  // =====================================================
  // AGE
  // =====================================================

  const ageOf = (animal) => {
    if (animal.age) {
      return animal.age;
    }

    if (animal.ageYears) {
      return `${animal.ageYears} Years`;
    }

    return "Not specified";
  };

  // =====================================================
  // GENDER
  // =====================================================

  const genderOf = (animal) => {
    return animal.gender || "Not specified";
  };

  // =====================================================
  // LOCATION
  // =====================================================

  const locationOf = (animal) => {
    return (
      animal.location ||
      animal.city ||
      animal.address ||
      "Location not specified"
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="as-section as-section-alt">
      <div className="container">
        {/* =====================================================
                    HEADER
                ===================================================== */}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="as-section-title">Featured Animals</h2>

          <button
            type="button"
            className="as-link-green btn btn-link p-0"
            onClick={() => navigate("/animals/all")}
          >
            View All Animals
          </button>
        </div>

        {/* =====================================================
                    LOADING
                ===================================================== */}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border as-text-green" role="status" />
          </div>
        ) : animals.length === 0 ? (
          /* =====================================================
                        NO APPROVED ANIMALS
                    ===================================================== */

          <div className="text-center py-5">
            <p className="text-muted mb-0">
              No approved animals are currently available.
            </p>
          </div>
        ) : (
          <>
            {/* =====================================================
                            ANIMAL GRID
                            
                            IMPORTANT:
                            5 animals in one row.
                            10 animals = 5 + 5.
                            CSS Grid is used instead of Bootstrap
                            col-md / col-lg so browser zoom does not
                            change 5 columns into 4 columns.
                        ===================================================== */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                columnGap: "18px",
                rowGap: "24px",
                width: "100%",
                margin: 0,
                padding: 0,
              }}
            >
              {currentAnimals.map((animal) => (
                <div
                  key={animal.id}
                  style={{
                    width: "100%",
                    minWidth: 0,
                  }}
                >
                  {/* =====================================================
                                        ANIMAL CARD
                                    ===================================================== */}

                  <div
                    className="as-animal-card h-100"
                    onClick={() => openAnimal(animal)}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    }}
                  >
                    {/* =====================================================
                                            IMAGE
                                        ===================================================== */}

                    <div className="as-animal-media">
                      {imageOf(animal) ? (
                        <img
                          src={imageOf(animal)}
                          alt={animal.animalName || "Animal"}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;

                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                          No image
                        </div>
                      )}
                    </div>

                    {/* =====================================================
                                            ANIMAL DETAILS
                                        ===================================================== */}

                    <div className="as-animal-body">
                      {/* Animal Name */}

                      <h6 className="as-animal-name">
                        {animal.animalName || "Animal"}
                      </h6>

                      {/* Price */}

                      <div className="as-animal-price">
                        {priceText(animal.price)}
                      </div>

                      {/* Breed */}

                      <p className="as-animal-meta mb-1">
                        <strong>Breed:</strong> {breedOf(animal)}
                      </p>

                      {/* Age */}

                      <p className="as-animal-meta mb-1">
                        <strong>Age:</strong> {ageOf(animal)}
                      </p>

                      {/* Gender */}

                      <p className="as-animal-meta mb-1">
                        <strong>Gender:</strong> {genderOf(animal)}
                      </p>

                      {/* Location */}

                      <p className="as-animal-meta mb-3">
                        <strong>Location:</strong> {locationOf(animal)}
                      </p>

                      {/* View Animal Button */}

                      <button
                        type="button"
                        className="btn btn-success w-100"
                        onClick={(e) => {
                          e.stopPropagation();

                          openAnimal(animal);
                        }}
                      >
                        View Animal
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* =====================================================
                            PAGINATION
                        ===================================================== */}

            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                {/* Previous */}

                <button
                  type="button"
                  className="btn btn-outline-success px-4"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                >
                  ← Previous
                </button>

                {/* Page Number */}

                <span
                  className="fw-semibold"
                  style={{
                    minWidth: "90px",
                    textAlign: "center",
                  }}
                >
                  {currentPage + 1} / {totalPages}
                </span>

                {/* Next */}

                <button
                  type="button"
                  className="btn btn-success px-4"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages - 1}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default FeaturedAnimals;
