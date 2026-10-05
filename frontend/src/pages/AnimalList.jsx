import { useEffect, useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getAllAnimals } from "../services/AnimalService";

import AnimalCard from "../components/AnimalCard";

import "./AnimalList.css";

// =====================================================
// FILTER DEFAULT VALUES
// =====================================================

const EMPTY_FILTERS = {
  category: "",
  breed: "",
  gender: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  minAge: "",
  maxAge: "",
  availability: "",
};

// =====================================================
// CASE-INSENSITIVE COMPARISON
// =====================================================

const same = (a, b) =>
  String(a || "")
    .trim()
    .toLowerCase() ===
  String(b || "")
    .trim()
    .toLowerCase();

function AnimalList() {
  const navigate = useNavigate();

  // =====================================================
  // SEARCH TERM FROM URL
  // =====================================================

  const { category: searchTerm } = useParams();

  const [animals, setAnimals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const [sort, setSort] = useState("default");

  // -------------------------------------------------
  // LOAD ANIMALS
  // -------------------------------------------------

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllAnimals();

        setAnimals(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.log(err);

        setError("Unable to load animals.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  // -------------------------------------------------
  // RESET FILTERS WHEN SEARCH CHANGES
  // -------------------------------------------------

  useEffect(() => {
    setFilters(EMPTY_FILTERS);
    setSort("default");
  }, [searchTerm]);

  // -------------------------------------------------
  // SEARCH WORD MATCH
  // LOWERCASE / UPPERCASE BOTH WORK
  // -------------------------------------------------

  const searched = useMemo(() => {
    const normalizedSearchTerm = String(searchTerm || "")
      .trim()
      .toLowerCase();

    if (!normalizedSearchTerm || normalizedSearchTerm === "all") {
      return animals;
    }

    const term = decodeURIComponent(searchTerm).trim().toLowerCase();

    return animals.filter((animal) =>
      [animal.animalName, animal.category, animal.breed, animal.location]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [animals, searchTerm]);

  // -------------------------------------------------
  // CATEGORY OPTIONS
  // -------------------------------------------------

  const categoryOptions = useMemo(
    () => [...new Set(searched.map((a) => a.category).filter(Boolean))].sort(),
    [searched],
  );

  // -------------------------------------------------
  // BREED OPTIONS
  // -------------------------------------------------

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

  // -------------------------------------------------
  // GENDER OPTIONS
  // -------------------------------------------------

  const genderOptions = useMemo(
    () => [...new Set(searched.map((a) => a.gender).filter(Boolean))].sort(),
    [searched],
  );

  // -------------------------------------------------
  // APPLY FILTERS + SORT
  // -------------------------------------------------

  const results = useMemo(() => {
    let list = searched.filter((a) => {
      // =================================================
      // CATEGORY
      // =================================================

      if (filters.category && !same(a.category, filters.category)) {
        return false;
      }

      // =================================================
      // BREED
      // =================================================

      if (filters.breed && !same(a.breed, filters.breed)) {
        return false;
      }

      // =================================================
      // GENDER
      // =================================================

      if (filters.gender && !same(a.gender, filters.gender)) {
        return false;
      }

      // =================================================
      // LOCATION
      // =================================================

      if (
        filters.location &&
        !String(a.location || "")
          .toLowerCase()
          .includes(filters.location.trim().toLowerCase())
      ) {
        return false;
      }

      // =================================================
      // PRICE
      // =================================================

      const price = Number(a.price) || 0;

      if (filters.minPrice !== "" && price < Number(filters.minPrice)) {
        return false;
      }

      if (filters.maxPrice !== "" && price > Number(filters.maxPrice)) {
        return false;
      }

      // =================================================
      // AGE
      // =================================================

      const age = Number(a.age);

      if (
        filters.minAge !== "" &&
        (Number.isNaN(age) || age < Number(filters.minAge))
      ) {
        return false;
      }

      if (
        filters.maxAge !== "" &&
        (Number.isNaN(age) || age > Number(filters.maxAge))
      ) {
        return false;
      }

      // =================================================
      // AVAILABILITY
      // =================================================

      if (filters.availability === "available" && a.available !== true) {
        return false;
      }

      if (filters.availability === "notAvailable" && a.available !== false) {
        return false;
      }

      return true;
    });

    // =================================================
    // SORT - EXISTING LOGIC
    // =================================================

    if (sort === "low") {
      list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "high") {
      list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    }

    return list;
  }, [searched, filters, sort]);

  // -------------------------------------------------
  // UPDATE FILTER
  // -------------------------------------------------

  const updateFilter = (name, value) => {
    setFilters((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      // Breed depends on category
      if (name === "category") {
        next.breed = "";
      }

      return next;
    });
  };

  const activeFilters = Object.values(filters).filter(Boolean).length;

  // -------------------------------------------------
  // LOADING
  // -------------------------------------------------

  if (loading) {
    return (
      <div className="container text-center py-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  // -------------------------------------------------
  // ERROR
  // -------------------------------------------------

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  // =====================================================
  // PAGE TITLE
  // =====================================================

  const title =
    !searchTerm || String(searchTerm).trim().toLowerCase() === "all"
      ? "All Animals"
      : `Results for "${decodeURIComponent(searchTerm)}"`;

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="animal-list-page">
      {/* =================================================
          TOP HEADER
          ================================================= */}

      <div className="animal-list-header">
        <div className="animal-page-title">
          <h2 className="text-success mb-1">{title}</h2>

          <p className="text-muted mb-0">{results.length} animals found</p>
        </div>

        <button
          type="button"
          className="animal-back-button"
          onClick={() => navigate(-1)}
        >
          <span className="back-arrow">←</span>
          Back
        </button>
      </div>

      {/* =================================================
          MAIN 32% / 68% STRUCTURE
          ================================================= */}

      <div className="animal-list-layout">
        {/* =================================================
            LEFT SIDE - FILTERS
            ================================================= */}

        <aside className="animal-filter-section">
          <div className="animal-filter-card">
            {/* =================================================
                FILTER HEADER
                ================================================= */}

            <div className="filter-header">
              <div>
                <h5 className="fw-bold mb-1">Filters</h5>

                <small className="text-muted">Refine your animal search</small>
              </div>

              {activeFilters > 0 && (
                <button
                  type="button"
                  className="btn btn-link btn-sm text-success p-0"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* =================================================
                CATEGORY
                ================================================= */}

            <div className="filter-item">
              <label className="form-label fw-semibold">Category</label>

              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => updateFilter("category", e.target.value)}
              >
                <option value="">All categories</option>

                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* =================================================
                BREED
                ================================================= */}

            <div className="filter-item">
              <label className="form-label fw-semibold">Breed</label>

              <select
                className="form-select"
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

            {/* =================================================
                PRICE
                ================================================= */}

            <div className="filter-item">
              <label className="form-label fw-semibold">Price range (₹)</label>

              <div className="price-inputs">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => updateFilter("minPrice", e.target.value)}
                />

                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilter("maxPrice", e.target.value)}
                />
              </div>
            </div>

            {/* =================================================
                AGE
                ================================================= */}

            <div className="filter-item">
              <label className="form-label fw-semibold">Age (Years)</label>

              <div className="price-inputs">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="Min age"
                  value={filters.minAge}
                  onChange={(e) => updateFilter("minAge", e.target.value)}
                />

                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="Max age"
                  value={filters.maxAge}
                  onChange={(e) => updateFilter("maxAge", e.target.value)}
                />
              </div>
            </div>

            {/* =================================================
                GENDER
                ================================================= */}

            <div className="filter-item">
              <label className="form-label fw-semibold">Gender</label>

              <select
                className="form-select"
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

            {/* =================================================
                AVAILABILITY
                ================================================= */}

            <div className="filter-item">
              <label className="form-label fw-semibold">Availability</label>

              <select
                className="form-select"
                value={filters.availability}
                onChange={(e) => updateFilter("availability", e.target.value)}
              >
                <option value="">All</option>

                <option value="available">Available</option>

                <option value="notAvailable">Not Available</option>
              </select>
            </div>

            {/* =================================================
                LOCATION
                ================================================= */}

            <div className="filter-item">
              <label className="form-label fw-semibold">Location</label>

              <input
                type="text"
                className="form-control"
                placeholder="e.g. Pune"
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
              />
            </div>

            {/* =================================================
                ACTIVE FILTER COUNT
                ================================================= */}

            {activeFilters > 0 && (
              <div className="filter-active-info">
                <strong>{activeFilters}</strong> filter
                {activeFilters > 1 ? "s" : ""} applied
              </div>
            )}
          </div>
        </aside>

        {/* =================================================
            RIGHT SIDE - ANIMAL RESULTS
            ================================================= */}

        <section className="animal-results-section">
          {/* =================================================
              RESULT HEADER
              ================================================= */}

          <div className="animal-results-top">
            <div>
              <h5 className="fw-bold mb-1">All Animals</h5>

              <span className="text-muted">{results.length} animals found</span>
            </div>

            <select
              className="form-select animal-sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Sort: Default</option>

              <option value="low">Price: Low to High</option>

              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* =================================================
              ONLY RIGHT SIDE SCROLL
              ================================================= */}

          <div className="animal-results-scroll">
            <div className="row">
              {results.length > 0 ? (
                results.map((animal) => (
                  <div className="col-xl-4 col-md-6 mb-4" key={animal.id}>
                    <AnimalCard animal={animal} />
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  <h4>No Animals Found</h4>

                  <p className="text-muted">
                    Try a different keyword or clear some filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AnimalList;
