import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

function AdminAnimals() {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // SEARCH
  const [searchText, setSearchText] = useState("");

  // STATUS FILTER
  const [statusFilter, setStatusFilter] = useState("ALL");

  // =====================================================
  // LOAD ALL ANIMALS
  // =====================================================

  const loadAnimals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await AdminService.getAllAnimals();

      console.log("Admin Animals Response:", response.data);

      if (Array.isArray(response.data)) {
        setAnimals(response.data);
      } else {
        setAnimals([]);
      }
    } catch (error) {
      console.error("Error loading admin animals:", error);

      console.error("Backend Response:", error?.response?.data);

      setError(error?.response?.data?.message || "Unable to load animals.");

      setAnimals([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PAGE LOAD
  // =====================================================

  useEffect(() => {
    loadAnimals();
  }, []);

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) {
      return null;
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `http://localhost:8080${image.startsWith("/") ? "" : "/"}${image}`;
  };

  // =====================================================
  // PRICE FORMAT
  // =====================================================

  const formatPrice = (price) => {
    if (price === null || price === undefined || price === "") {
      return "₹0";
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice)) {
      return "₹0";
    }

    return `₹${numericPrice.toLocaleString("en-IN")}`;
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    const currentStatus = status?.toUpperCase() || "PENDING";

    if (currentStatus === "APPROVED") {
      return "badge bg-success";
    }

    if (currentStatus === "REJECTED") {
      return "badge bg-danger";
    }

    return "badge bg-warning text-dark";
  };

  // =====================================================
  // FILTER ANIMALS
  // =====================================================

  const filteredAnimals = animals.filter((animal) => {
    const search = searchText.trim().toLowerCase();

    const animalName = animal.animalName?.toLowerCase() || "";

    const categoryName = animal.categoryName?.toLowerCase() || "";

    const breed = animal.breed?.toLowerCase() || "";

    const sellerName = animal.sellerName?.toLowerCase() || "";

    const animalId = String(animal.animalId || "");

    const sellerId = String(animal.sellerId || "");

    const matchesSearch =
      !search ||
      animalName.includes(search) ||
      categoryName.includes(search) ||
      breed.includes(search) ||
      sellerName.includes(search) ||
      animalId.includes(search) ||
      sellerId.includes(search);

    const currentStatus = animal.approvalStatus?.toUpperCase() || "PENDING";

    const matchesStatus =
      statusFilter === "ALL" || currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="d-flex"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f7f8fc",
        }}
      >
        <AdminSidebar />

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            marginLeft: "250px",
            width: "calc(100% - 250px)",
            minHeight: "100vh",
          }}
        >
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status" />

            <div className="text-muted">Loading animals...</div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f8fc",
      }}
    >
      {/* =================================================
                SIDEBAR
            ================================================= */}

      <AdminSidebar />

      {/* =================================================
                MAIN CONTENT
            ================================================= */}

      <div
        className="flex-grow-1"
        style={{
          minWidth: 0,
          marginLeft: "250px",
          width: "calc(100% - 250px)",
        }}
      >
        {/* =================================================
                    TOP HEADER
                ================================================= */}

        <div
          className="bg-white border-bottom"
          style={{
            padding: "10px 18px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5
                className="fw-bold mb-1"
                style={{
                  fontSize: "16px",
                }}
              >
                Animal Management
              </h5>

              <small className="text-muted">
                View and manage seller-added animals
              </small>
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={loadAnimals}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* =================================================
                    CONTENT
                ================================================= */}

        <div
          style={{
            padding: "18px",
          }}
        >
          {/* =================================================
                        TITLE
                    ================================================= */}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2
                className="fw-bold mb-1"
                style={{
                  fontSize: "24px",
                }}
              >
                All Animals
              </h2>

              <p
                className="text-muted mb-0"
                style={{
                  fontSize: "13px",
                }}
              >
                Animals added by sellers.
              </p>
            </div>

            <div
              className="text-muted"
              style={{
                fontSize: "13px",
              }}
            >
              Total: <strong>{animals.length}</strong>
            </div>
          </div>

          {/* =================================================
                        ERROR
                    ================================================= */}

          {error && <div className="alert alert-danger">{error}</div>}

          {/* =================================================
                        SEARCH + FILTER
                    ================================================= */}

          <div
            className="card border-0 shadow-sm mb-3"
            style={{
              borderRadius: "12px",
            }}
          >
            <div className="card-body py-3">
              <div className="row g-3 align-items-end">
                {/* SEARCH */}

                <div className="col-lg-7 col-md-6">
                  <label
                    className="form-label fw-semibold mb-1"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Search Animal
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search by animal, category, breed or seller..."
                  />
                </div>

                {/* STATUS */}

                <div className="col-lg-3 col-md-3">
                  <label
                    className="form-label fw-semibold mb-1"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Approval Status
                  </label>

                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="ALL">All</option>

                    <option value="PENDING">Pending</option>

                    <option value="APPROVED">Approved</option>

                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>

                {/* RESET */}

                <div className="col-lg-2 col-md-3">
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setSearchText("");
                      setStatusFilter("ALL");
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
                        RESULT COUNT
                    ================================================= */}

          <div
            className="text-muted mb-2"
            style={{
              fontSize: "13px",
            }}
          >
            Showing <strong>{filteredAnimals.length}</strong> of{" "}
            <strong>{animals.length}</strong> animals
          </div>

          {/* =================================================
                        NO DATA
                    ================================================= */}

          {filteredAnimals.length === 0 ? (
            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "12px",
              }}
            >
              <div
                className="card-body text-center"
                style={{
                  padding: "55px",
                }}
              >
                <h5 className="fw-bold">No Animals Found</h5>

                <p className="text-muted mb-0">
                  No animals match your search or selected status.
                </p>
              </div>
            </div>
          ) : (
            /* =================================================
                            TABLE
                        ================================================= */

            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "12px",
              }}
            >
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table
                    className="table table-hover align-middle mb-0"
                    style={{
                      minWidth: "1050px",
                    }}
                  >
                    {/* =================================================
                                            HEADER
                                        ================================================= */}

                    <thead>
                      <tr>
                        <th style={headerStyle}>#</th>

                        <th style={headerStyle}>Animal</th>

                        <th style={headerStyle}>Category</th>

                        <th style={headerStyle}>Breed</th>

                        <th style={headerStyle}>Age</th>

                        <th style={headerStyle}>Price</th>

                        <th style={headerStyle}>Seller</th>

                        <th style={headerStyle}>Photo</th>

                        <th style={headerStyle}>Status</th>

                        <th style={headerStyle}>Action</th>
                      </tr>
                    </thead>

                    {/* =================================================
                                            BODY
                                        ================================================= */}

                    <tbody>
                      {filteredAnimals.map((animal, index) => {
                        const animalId = animal.animalId;

                        const status =
                          animal.approvalStatus?.toUpperCase() || "PENDING";

                        const frontImage = getImageUrl(animal.frontImageUrl);

                        return (
                          <tr key={animalId || `${animal.animalName}-${index}`}>
                            {/* # */}

                            <td style={cellStyle}>{index + 1}</td>

                            {/* ANIMAL */}

                            <td style={cellStyle}>
                              <div
                                style={{
                                  fontWeight: "700",
                                  fontSize: "13px",
                                }}
                              >
                                {animal.animalName || "N/A"}
                              </div>

                              <div
                                style={{
                                  fontSize: "11px",
                                  color: "#6c757d",
                                  marginTop: "3px",
                                }}
                              >
                                ID: {animalId || "N/A"}
                              </div>
                            </td>

                            {/* CATEGORY */}

                            <td style={cellStyle}>
                              {animal.categoryName || "N/A"}
                            </td>

                            {/* BREED */}

                            <td style={cellStyle}>{animal.breed || "N/A"}</td>

                            {/* AGE */}

                            <td style={cellStyle}>{animal.age ?? "N/A"}</td>

                            {/* PRICE */}

                            <td
                              style={{
                                ...cellStyle,
                                fontWeight: "700",
                                color: "#198754",
                              }}
                            >
                              {formatPrice(animal.price)}
                            </td>

                            {/* SELLER */}

                            <td style={cellStyle}>
                              <div
                                style={{
                                  fontWeight: "600",
                                  fontSize: "13px",
                                }}
                              >
                                {animal.sellerName || "N/A"}
                              </div>

                              <div
                                style={{
                                  fontSize: "11px",
                                  color: "#6c757d",
                                  marginTop: "3px",
                                }}
                              >
                                Seller ID: {animal.sellerId || "N/A"}
                              </div>
                            </td>

                            {/* SINGLE PHOTO */}

                            <td style={cellStyle}>
                              <AnimalThumbnail
                                src={frontImage}
                                label="Front"
                              />
                            </td>

                            {/* STATUS */}

                            <td style={cellStyle}>
                              <span
                                className={getStatusClass(status)}
                                style={{
                                  fontSize: "10px",
                                  padding: "6px 10px",
                                }}
                              >
                                {status}
                              </span>
                            </td>

                            {/* ACTION */}

                            <td style={cellStyle}>
                              <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={() => {
                                  console.log(
                                    "Opening Animal ID:",
                                    animal.animalId,
                                  );

                                  navigate(
                                    `/admin/animals/${animal.animalId}`,
                                  );
                                }}
                              >
                                View Animal
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// SINGLE ANIMAL PHOTO
// =====================================================

function AnimalThumbnail({ src, label }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      style={{
        width: "65px",
        textAlign: "center",
      }}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={`${label} animal`}
          title={`View ${label} image`}
          onClick={() => window.open(src, "_blank")}
          onError={() => setImageError(true)}
          style={{
            width: "65px",
            height: "52px",
            objectFit: "cover",
            border: "1px solid #dee2e6",
            borderRadius: "6px",
            cursor: "pointer",
            display: "block",
            backgroundColor: "#f8f9fa",
          }}
        />
      ) : (
        <div
          style={{
            width: "65px",
            height: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed #adb5bd",
            borderRadius: "6px",
            backgroundColor: "#f8f9fa",
            color: "#6c757d",
            fontSize: "9px",
          }}
        >
          No Image
        </div>
      )}

      <div
        style={{
          marginTop: "3px",
          fontSize: "9px",
          color: "#6c757d",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// =====================================================
// HEADER STYLE
// =====================================================

const headerStyle = {
  padding: "10px",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: "600",
  whiteSpace: "nowrap",
  backgroundColor: "#0d6efd",
  borderBottom: "2px solid #0d6efd",
};

// =====================================================
// CELL STYLE
// =====================================================

const cellStyle = {
  padding: "12px",
  verticalAlign: "middle",
  fontSize: "12px",
  whiteSpace: "nowrap",
};

export default AdminAnimals;