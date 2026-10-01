import { useEffect, useMemo, useRef, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { getApprovedAndAvailableAnimals } from "../services/AnimalService";

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
  // SEARCH + FILTERS (NO PAGE RELOAD)
  // Header / Hero / Navbar / Category cards set ?q=cow.
  // Only this section re-renders; the top bar stays.
  // =====================================================

  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = (searchParams.get("q") || "").trim();

  const sectionRef = useRef(null);

  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const [sort, setSort] = useState("default");

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
  // NEW SEARCH WORD: reset filters, scroll to this section
  // =====================================================

  useEffect(() => {
    setFilters(EMPTY_FILTERS);
    setSort("default");
    setCurrentPage(0);

    if (searchTerm && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchTerm]);

  // =====================================================
  // 1) SEARCH WORD MATCH (name, category, breed, location)
  //    "cows" also matches "cow"
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
  // 2) FILTERS + SORT
  // =====================================================

  const filtered = useMemo(() => {
    let list = searched.filter((a) => {
      if (filters.category && !same(a.category, filters.category)) return false;
      if (filters.breed && !same(a.breed, filters.breed)) return false;
      if (filters.gender && !same(a.gender, filters.gender)) return false;

      if (
        filters.location &&
        !String(a.location || a.city || "")
          .toLowerCase()
          .includes(filters.location.trim().toLowerCase())
      )
        return false;

      const price = Number(a.price) || 0;
      if (filters.minPrice !== "" && price < Number(filters.minPrice))
        return false;
      if (filters.maxPrice !== "" && price > Number(filters.maxPrice))
        return false;

      return true;
    });

    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [searched, filters, sort]);

  const updateFilter = (name, value) => {
    setFilters((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "category") next.breed = "";
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
                {filtered.length} animal{filtered.length === 1 ? "" : "s"} found
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
          /* =====================================================
                        NO APPROVED ANIMALS
                    ===================================================== */

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
