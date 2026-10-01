import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllAnimals } from "../services/AnimalService";
import AnimalCard from "../components/AnimalCard";
import "./AnimalList.css";

// =====================================================
// ANIMAL LIST + SEARCH + FILTERS
// URL: /animals/cow  -> search "cow"
//      /animals/all  -> every animal
//
// Existing API, search, filter and sort logic is kept.
// Only required UI/layout changes are added.
// =====================================================

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

function AnimalList() {
  const navigate = useNavigate();

  // "category" is the search word typed in header / hero
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
  // -------------------------------------------------
  const searched = useMemo(() => {
    if (!searchTerm || searchTerm === "all") {
      return animals;
    }

    const term = decodeURIComponent(searchTerm).trim().toLowerCase();

    return animals.filter((a) =>
      [a.animalName, a.category, a.breed, a.location]
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
        !String(a.location || "")
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

      return true;
    });

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

  const title =
    !searchTerm || searchTerm === "all"
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
                    STATIC
                ================================================= */}

        <aside className="animal-filter-section">
          <div className="animal-filter-card">
            <div className="filter-header">
              <h5 className="fw-bold mb-0">Filters</h5>

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

            {/* CATEGORY */}

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

            {/* BREED */}

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

            {/* PRICE */}

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

            {/* GENDER */}

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

            {/* LOCATION */}

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
          </div>
        </aside>

        {/* =================================================
                    RIGHT SIDE - ANIMAL RESULTS
                    ONLY THIS AREA SCROLLS
                ================================================= */}

        <section className="animal-results-section">
          {/* RESULT HEADER */}

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
