import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";

function ManageAnimals() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // =====================================================
  // SAMPLE UI DATA
  // =====================================================

  const [animals, setAnimals] = useState([
    {
      id: 1,
      animalName: "Gauri",
      category: "Cow",
      breed: "Gir",
      seller: "Rahul Farms",
      price: 85000,
      location: "Pune",
      status: "Available",
    },
    {
      id: 2,
      animalName: "Moti",
      category: "Buffalo",
      breed: "Murrah",
      seller: "Green Valley Farm",
      price: 120000,
      location: "Nashik",
      status: "Available",
    },
    {
      id: 3,
      animalName: "Sheru",
      category: "Dog",
      breed: "German Shepherd",
      seller: "Paws & Claws",
      price: 35000,
      location: "Mumbai",
      status: "Sold",
    },
    {
      id: 4,
      animalName: "Rani",
      category: "Goat",
      breed: "Sirohi",
      seller: "Shree Ganesh Farm",
      price: 18000,
      location: "Ahmednagar",
      status: "Available",
    },
    {
      id: 5,
      animalName: "Badal",
      category: "Horse",
      breed: "Marwari",
      seller: "Royal Horse Farm",
      price: 200000,
      location: "Beed",
      status: "Pending",
    },
  ]);

  // =====================================================
  // CATEGORY LIST
  // =====================================================

  const categories = [
    "All",
    "Cow",
    "Buffalo",
    "Ox",
    "Bull",
    "Goat",
    "Sheep",
    "Horse",
    "Donkey",
    "Camel",
    "Dog",
    "Cat",
    "Rabbit",
    "Pig",
    "Elephant",
    "Deer",
    "Yak",
    "Mule",
    "Chicken",
    "Duck",
    "Turkey",
    "Goose",
    "Pigeon",
    "Parrot",
    "Peacock",
    "Quail",
    "Fish",
    "Turtle",
    "Ostrich",
    "Emu",
    "Guinea Fowl",
  ];

  // =====================================================
  // FILTER
  // =====================================================

  const filteredAnimals = animals.filter((animal) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      animal.animalName.toLowerCase().includes(searchValue) ||
      animal.category.toLowerCase().includes(searchValue) ||
      animal.breed.toLowerCase().includes(searchValue) ||
      animal.seller.toLowerCase().includes(searchValue) ||
      animal.location.toLowerCase().includes(searchValue);

    const matchesCategory =
      categoryFilter === "All" || animal.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" || animal.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // =====================================================
  // STATUS CHANGE
  // =====================================================

  const handleStatusChange = (id) => {
    setAnimals((prev) =>
      prev.map((animal) =>
        animal.id === id
          ? {
              ...animal,
              status: animal.status === "Available" ? "Sold" : "Available",
            }
          : animal,
      ),
    );
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this animal from the admin list?",
    );

    if (!confirmed) {
      return;
    }

    setAnimals((prev) => prev.filter((animal) => animal.id !== id));
  };

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const getStatusClass = (status) => {
    if (status === "Available") {
      return "badge bg-success";
    }

    if (status === "Sold") {
      return "badge bg-danger";
    }

    return "badge bg-warning text-dark";
  };

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f8fc",
      }}
    >
      {/* =====================================================
                SIDEBAR
            ===================================================== */}

      <AdminSidebar />

      {/* =====================================================
                MAIN AREA
            ===================================================== */}

      <div
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          minHeight: "100vh",
        }}
      >
        {/* =================================================
                    TOP HEADER
                ================================================= */}

        <div
          className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center"
          style={{
            minHeight: "70px",
          }}
        >
          <div>
            <h5 className="fw-bold mb-0">Animal Management</h5>

            <small className="text-muted">
              Manage all animals listed on the platform
            </small>
          </div>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Dashboard
          </button>
        </div>

        {/* =================================================
                    CONTENT
                ================================================= */}

        <div className="p-4">
          {/* =================================================
                        TITLE
                    ================================================= */}

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Manage Animals</h2>

              <p className="text-muted mb-0">
                View, filter and manage seller animal listings.
              </p>
            </div>

            <div className="text-muted">
              Total: <strong>{animals.length}</strong>
            </div>
          </div>

          {/* =================================================
                        FILTER CARD
                    ================================================= */}

          <div
            className="card border-0 shadow-sm mb-4"
            style={{
              borderRadius: "14px",
            }}
          >
            <div className="card-body">
              <div className="row g-3">
                {/* SEARCH */}

                <div className="col-lg-5">
                  <label className="form-label fw-semibold">
                    Search Animal
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name, breed, seller or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* CATEGORY */}

                <div className="col-lg-3">
                  <label className="form-label fw-semibold">Category</label>

                  <select
                    className="form-select"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* STATUS */}

                <div className="col-lg-2">
                  <label className="form-label fw-semibold">Status</label>

                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All</option>

                    <option value="Available">Available</option>

                    <option value="Sold">Sold</option>

                    <option value="Pending">Pending</option>
                  </select>
                </div>

                {/* RESET */}

                <div className="col-lg-2 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setSearch("");
                      setCategoryFilter("All");
                      setStatusFilter("All");
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
                        ANIMAL TABLE
                    ================================================= */}

          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: "14px",
            }}
          >
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="px-4 py-3">#</th>

                      <th className="py-3">Animal</th>

                      <th className="py-3">Category</th>

                      <th className="py-3">Breed</th>

                      <th className="py-3">Seller</th>

                      <th className="py-3">Price</th>

                      <th className="py-3">Location</th>

                      <th className="py-3">Status</th>

                      <th className="py-3 text-end px-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredAnimals.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center py-5 text-muted">
                          No animals found.
                        </td>
                      </tr>
                    ) : (
                      filteredAnimals.map((animal, index) => (
                        <tr key={animal.id}>
                          <td className="px-4">{index + 1}</td>

                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <div
                                className="rounded d-flex align-items-center justify-content-center"
                                style={{
                                  width: "48px",
                                  height: "48px",
                                  backgroundColor: "#e8f5e9",
                                  fontSize: "22px",
                                }}
                              >
                                🐄
                              </div>

                              <div>
                                <div className="fw-semibold">
                                  {animal.animalName}
                                </div>

                                <small className="text-muted">
                                  ID: {animal.id}
                                </small>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="badge bg-success">
                              {animal.category}
                            </span>
                          </td>

                          <td>{animal.breed}</td>

                          <td>{animal.seller}</td>

                          <td className="fw-semibold text-success">
                            ₹ {Number(animal.price).toLocaleString("en-IN")}
                          </td>

                          <td>📍 {animal.location}</td>

                          <td>
                            <span className={getStatusClass(animal.status)}>
                              {animal.status}
                            </span>
                          </td>

                          <td className="text-end px-4">
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => navigate(`/animal/${animal.id}`)}
                              >
                                View
                              </button>

                              {animal.status !== "Pending" && (
                                <button
                                  type="button"
                                  className={
                                    animal.status === "Available"
                                      ? "btn btn-sm btn-outline-danger"
                                      : "btn btn-sm btn-success"
                                  }
                                  onClick={() => handleStatusChange(animal.id)}
                                >
                                  {animal.status === "Available"
                                    ? "Mark Sold"
                                    : "Mark Available"}
                                </button>
                              )}

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(animal.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* =================================================
                        FOOT NOTE
                    ================================================= */}

          <div className="mt-3 text-muted small">
            Showing <strong>{filteredAnimals.length}</strong> of{" "}
            <strong>{animals.length}</strong> animals.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAnimals;
