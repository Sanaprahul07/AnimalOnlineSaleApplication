import { useEffect, useMemo, useRef, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { getApprovedAndAvailableAnimals } from "../services/AnimalService";

import { getBidsByAnimal } from "../services/BidService";

// =====================================================
// 10 ANIMALS PER PAGE
// =====================================================

const ANIMALS_PER_PAGE = 10;

const EMPTY_FILTERS = {
  category: "",
  breed: "",
  gender: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  sellerRating: "",
};

const same = (a, b) =>
  String(a || "")
    .trim()
    .toLowerCase() ===
  String(b || "")
    .trim()
    .toLowerCase();

function FeaturedAnimals() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);

  // =====================================================
  // SEARCH + FILTERS
  // =====================================================

  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = (searchParams.get("q") || "").trim();

  const sectionRef = useRef(null);

  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const [sort, setSort] = useState("default");

  // =====================================================
  // VIEW BIDS MODAL STATES
  // =====================================================

  const [selectedBidAnimal, setSelectedBidAnimal] = useState(null);

  const [selectedAnimalBids, setSelectedAnimalBids] = useState([]);

  const [bidLoading, setBidLoading] = useState(false);

  const [bidError, setBidError] = useState("");

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
  // NEW SEARCH WORD
  // =====================================================

  useEffect(() => {
    setFilters(EMPTY_FILTERS);

    setSort("default");

    setCurrentPage(0);

    if (searchTerm && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [searchTerm]);

  // =====================================================
  // 1) SEARCH WORD MATCH
  // =====================================================

  const searched = useMemo(() => {
    if (!searchTerm) return animals;

    const term = searchTerm.toLowerCase();

    const singular = term.replace(/(es|s)$/, "");

    return animals.filter((a) => {
      const text = [
        a.animalName,
        a.category,
        a.breed,
        a.breedName,
        a.location,
        a.city,
      ]
        .join(" ")
        .toLowerCase();

      return (
        text.includes(term) || (singular.length > 2 && text.includes(singular))
      );
    });
  }, [animals, searchTerm]);

  const categoryOptions = useMemo(
    () => [...new Set(searched.map((a) => a.category).filter(Boolean))].sort(),
    [searched],
  );

  const breedOptions = useMemo(
    () =>
      [
        ...new Set(
          searched
            .filter(
              (a) => !filters.category || same(a.category, filters.category),
            )
            .map((a) => a.breed)
            .filter(Boolean),
        ),
      ].sort(),
    [searched, filters.category],
  );

  const genderOptions = useMemo(
    () => [...new Set(searched.map((a) => a.gender).filter(Boolean))].sort(),
    [searched],
  );

  // =====================================================
  // SELLER RATING
  // =====================================================

  const sellerRatingOf = (animal) => {
    const rating = animal?.sellerRating ?? animal?.seller?.rating ?? 0;

    const numericRating = Number(rating);

    return Number.isFinite(numericRating) ? numericRating : 0;
  };

  const totalRatingsOf = (animal) => {
    const total =
      animal?.totalRatings ??
      animal?.sellerTotalRatings ??
      animal?.seller?.totalRatings ??
      0;

    const numericTotal = Number(total);

    return Number.isFinite(numericTotal) ? numericTotal : 0;
  };

  // =====================================================
  // 2) FILTERS + SORT
  // =====================================================

  const filtered = useMemo(() => {
    let list = searched.filter((a) => {
      if (filters.category && !same(a.category, filters.category)) {
        return false;
      }

      if (filters.breed && !same(a.breed, filters.breed)) {
        return false;
      }

      if (filters.gender && !same(a.gender, filters.gender)) {
        return false;
      }

      if (
        filters.location &&
        !String(a.location || a.city || "")
          .toLowerCase()
          .includes(filters.location.trim().toLowerCase())
      ) {
        return false;
      }

      const price = Number(a.price) || 0;

      if (filters.minPrice !== "" && price < Number(filters.minPrice)) {
        return false;
      }

      if (filters.maxPrice !== "" && price > Number(filters.maxPrice)) {
        return false;
      }

      // =================================================
      // SELLER RATING FILTER
      // =================================================

      if (filters.sellerRating !== "") {
        const sellerRating = sellerRatingOf(a);

        if (sellerRating < Number(filters.sellerRating)) {
          return false;
        }
      }

      return true;
    });

    if (sort === "low") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [searched, filters, sort]);

  const updateFilter = (name, value) => {
    setFilters((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      if (name === "category") {
        next.breed = "";
      }

      return next;
    });

    setCurrentPage(0);
  };

  const activeFilters = Object.values(filters).filter(Boolean).length;

  const clearSearch = () => setSearchParams({});

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(filtered.length / ANIMALS_PER_PAGE);

  const startIndex = currentPage * ANIMALS_PER_PAGE;

  const currentAnimals = filtered.slice(
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
  // EXISTING FUNCTION - KEPT
  // =====================================================

  const openAnimal = (animal) => {
    if (!animal?.id) {
      console.error("Animal ID is missing:", animal);

      return;
    }

    navigate(`/animal/${animal.id}`);
  };

  // =====================================================
  // VIEW BIDS
  // OPEN POPUP ON HOME PAGE
  // =====================================================

  const handleViewBids = async (animal) => {
    if (!animal?.id) {
      console.error("Animal ID is missing:", animal);

      return;
    }

    // =================================================
    // OPEN POPUP IMMEDIATELY
    // =================================================

    setSelectedBidAnimal(animal);

    setSelectedAnimalBids([]);

    setBidError("");

    setBidLoading(true);

    try {
      console.log("=================================");

      console.log("LOAD BIDS FOR HOME PAGE");

      console.log("Animal ID:", animal.id);

      console.log("=================================");

      const response = await getBidsByAnimal(animal.id);

      const allBids = Array.isArray(response.data) ? response.data : [];

      // =================================================
      // SAME VALID BID RULE AS ANIMAL DETAILS
      // =================================================

      const validBids = allBids.filter(
        (bid) =>
          bid &&
          bid.bidAmount != null &&
          Number(bid.bidAmount) > 0 &&
          String(bid.status || "").toUpperCase() !== "REJECTED",
      );

      console.log("Bids For Animal:", animal.id, validBids);

      // =================================================
      // SAVE ONLY SELECTED ANIMAL BIDS
      // =================================================

      setSelectedAnimalBids(validBids);
    } catch (error) {
      console.error("Error loading bids:", error);

      if (error.response) {
        console.error("Bid Backend Status:", error.response.status);

        console.error("Bid Backend Response:", error.response.data);

        setBidError(
          error.response.data?.message ||
            "Unable to load bids for this animal.",
        );
      } else {
        setBidError("Backend server is not running.");
      }
    } finally {
      setBidLoading(false);
    }
  };

  // =====================================================
  // CLOSE BID POPUP
  // =====================================================

  const closeBidModal = () => {
    setSelectedBidAnimal(null);

    setSelectedAnimalBids([]);

    setBidError("");

    setBidLoading(false);
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
  // ONLY IMAGE URL HANDLING CHANGED
  // =====================================================

  const imageOf = (animal) => {
    const imageUrl =
      animal.frontImageUrl || animal.image || animal.imageUrl || null;

    if (!imageUrl || typeof imageUrl !== "string") {
      return null;
    }

    // Keep existing localhost behavior unchanged.
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      return imageUrl;
    }

    // On Lightsail, convert old localhost backend image URLs
    // to the deployed website's origin.
    return imageUrl.replace(
      /^https?:\/\/(localhost|127\.0\.0\.1):8080(?=\/api\/animal\/images\/)/i,
      window.location.origin,
    );
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
    <>
      <section ref={sectionRef} className="as-section as-section-alt">
        <div className="container">
          {/* =====================================================
                      HEADER
          ===================================================== */}

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="as-section-title">
              {searchTerm ? `Results for "${searchTerm}"` : "Featured Animals"}
            </h2>

            {searchTerm ? (
              <button
                type="button"
                className="as-link-green btn btn-link p-0"
                onClick={clearSearch}
              >
                Clear search
              </button>
            ) : (
              <button
                type="button"
                className="as-link-green btn btn-link p-0"
                onClick={() => navigate("/animals/all")}
              >
                View All Animals
              </button>
            )}
          </div>

          {/* =====================================================
                      CATEGORY CHIPS + FILTER BAR
          ===================================================== */}

          {!loading && animals.length > 0 && (
            <div className="mb-4">
              <div className="d-flex flex-wrap gap-2 mb-3">
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill ${
                    !filters.category ? "btn-success" : "btn-outline-success"
                  }`}
                  onClick={() => updateFilter("category", "")}
                >
                  All
                </button>

                {categoryOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`btn btn-sm rounded-pill ${
                      same(filters.category, c)
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                    onClick={() => updateFilter("category", c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="row g-2 align-items-end">
                <div className="col-6 col-md-2">
                  <label className="form-label small fw-semibold mb-1">
                    Breed
                  </label>

                  <select
                    className="form-select form-select-sm"
                    value={filters.breed}
                    onChange={(e) => updateFilter("breed", e.target.value)}
                  >
                    <option value="">All breeds</option>

                    {breedOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-6 col-md-2">
                  <label className="form-label small fw-semibold mb-1">
                    Min price (₹)
                  </label>

                  <input
                    type="number"
                    min="0"
                    className="form-control form-control-sm"
                    value={filters.minPrice}
                    onChange={(e) => updateFilter("minPrice", e.target.value)}
                  />
                </div>

                <div className="col-6 col-md-2">
                  <label className="form-label small fw-semibold mb-1">
                    Max price (₹)
                  </label>

                  <input
                    type="number"
                    min="0"
                    className="form-control form-control-sm"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter("maxPrice", e.target.value)}
                  />
                </div>

                <div className="col-6 col-md-2">
                  <label className="form-label small fw-semibold mb-1">
                    Gender
                  </label>

                  <select
                    className="form-select form-select-sm"
                    value={filters.gender}
                    onChange={(e) => updateFilter("gender", e.target.value)}
                  >
                    <option value="">Any</option>

                    {genderOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-6 col-md-2">
                  <label className="form-label small fw-semibold mb-1">
                    Location
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. Pune"
                    value={filters.location}
                    onChange={(e) => updateFilter("location", e.target.value)}
                  />
                </div>

                {/* =====================================================
                                    SELLER RATING
                ===================================================== */}

                <div className="col-6 col-md-2">
                  <label className="form-label small fw-semibold mb-1">
                    Seller Rating
                  </label>

                  <select
                    className="form-select form-select-sm"
                    value={filters.sellerRating}
                    onChange={(e) =>
                      updateFilter("sellerRating", e.target.value)
                    }
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5 ★ & Above</option>
                    <option value="4.0">4.0 ★ & Above</option>
                    <option value="3.5">3.5 ★ & Above</option>
                    <option value="3.0">3.0 ★ & Above</option>
                  </select>
                </div>

                <div className="col-6 col-md-2">
                  <label className="form-label small fw-semibold mb-1">
                    Sort
                  </label>

                  <select
                    className="form-select form-select-sm"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="default">Default</option>

                    <option value="low">Price: Low to High</option>

                    <option value="high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="small text-muted">
                  {filtered.length} animal
                  {filtered.length === 1 ? "" : "s"} found
                </span>

                {activeFilters > 0 && (
                  <button
                    type="button"
                    className="btn btn-link btn-sm as-link-green p-0"
                    onClick={() => {
                      setFilters(EMPTY_FILTERS);

                      setCurrentPage(0);
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}

          {/* =====================================================
                      LOADING
          ===================================================== */}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border as-text-green" role="status" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-0">
                {animals.length === 0
                  ? "No approved animals are currently available."
                  : "No animals match your search. Try a different keyword or clear some filters."}
              </p>
            </div>
          ) : (
            <>
              {/* =====================================================
                              ANIMAL GRID
              ===================================================== */}

              <div
                className="as-featured-grid"
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
                    {/* =================================================
                                            ANIMAL CARD
                      ================================================= */}

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
                      {/* =================================================
                                                IMAGE
                        ================================================= */}

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

                      {/* =================================================
                                                ANIMAL DETAILS
                        ================================================= */}

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

                        {/* Seller Rating */}

                        <p className="as-animal-meta mb-1">
                          <strong>Seller Rating:</strong>{" "}
                          {sellerRatingOf(animal) > 0
                            ? `${sellerRatingOf(animal).toFixed(1)} ★`
                            : "No ratings yet"}
                        </p>

                        {/* Total Ratings */}

                        <p className="as-animal-meta mb-1">
                          <strong>Total Ratings:</strong>{" "}
                          {totalRatingsOf(animal)}
                        </p>

                        {/* Location */}

                        <p className="as-animal-meta as-animal-location mb-3">
                          <strong>Location:</strong> {locationOf(animal)}
                        </p>

                        {/* =================================================
                                              BUTTONS
                          ================================================= */}

                        <div
                          className="d-flex flex-column gap-2"
                          style={{
                            marginTop: "auto",
                          }}
                        >
                          {/* View Animal */}

                          <button
                            type="button"
                            className="btn btn-success w-100"
                            style={{
                              marginTop: 0,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();

                              openAnimal(animal);
                            }}
                          >
                            View Animal
                          </button>

                          {/* View Bids */}

                          <button
                            type="button"
                            className="btn btn-outline-success w-100"
                            style={{
                              marginTop: 0,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();

                              handleViewBids(animal);
                            }}
                          >
                            View Bids
                          </button>
                        </div>
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
                  <button
                    type="button"
                    className="btn btn-outline-success px-4"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 0}
                  >
                    ← Previous
                  </button>

                  <span
                    className="fw-semibold"
                    style={{
                      minWidth: "90px",
                      textAlign: "center",
                    }}
                  >
                    {currentPage + 1} / {totalPages}
                  </span>

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

      {/* ==========================================================
          VIEW BIDS POPUP
          ONLY BIDS ARE SHOWN
      ========================================================== */}

      {selectedBidAnimal && (
        <div className="as-bids-modal-backdrop" onClick={closeBidModal}>
          <div className="as-bids-modal" onClick={(e) => e.stopPropagation()}>
            {/* =================================================
                POPUP HEADER
            ================================================= */}

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold text-success mb-0">All Bids</h4>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeBidModal}
              />
            </div>

            {/* =================================================
                LOADING
            ================================================= */}

            {bidLoading && (
              <div className="text-center py-4">
                <div className="spinner-border text-success" role="status" />

                <p className="mt-2 mb-0">Loading bids...</p>
              </div>
            )}

            {/* =================================================
                ERROR
            ================================================= */}

            {!bidLoading && bidError && (
              <div className="alert alert-danger mb-0">{bidError}</div>
            )}

            {/* =================================================
                BIDS TABLE
            ================================================= */}

            {!bidLoading && !bidError && selectedAnimalBids.length > 0 && (
              <div className="as-bids-table-wrapper">
                <table className="table table-bordered table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Bid ID</th>

                      <th>Customer Name</th>

                      <th
                        style={{
                          textAlign: "right",
                        }}
                      >
                        Bid Price
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedAnimalBids.map((bid, index) => (
                      <tr key={bid.id || index}>
                        <td>{bid.id || "-"}</td>

                        <td className="fw-semibold">
                          {bid.customerName || "Unknown Customer"}
                        </td>

                        <td
                          className="text-success fw-bold"
                          style={{
                            textAlign: "right",
                          }}
                        >
                          ₹ {Number(bid.bidAmount).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* =================================================
                NO BIDS
            ================================================= */}

            {!bidLoading && !bidError && selectedAnimalBids.length === 0 && (
              <div className="alert alert-info mb-0">
                No bids have been placed for this animal yet.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FeaturedAnimals;
