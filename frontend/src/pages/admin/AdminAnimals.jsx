import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";
import { apiUrl } from "../../config/api";

function AdminAnimals() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

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

  useEffect(() => {
    loadAnimals();
  }, []);

  const getImageUrl = (image) => {
    if (!image) {
      return null;
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    const cleanPath = image.startsWith("/") ? image : `/${image}`;

    return apiUrl(cleanPath);
  };

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

  return (
    <div className="admin-animals-page d-flex">
      <style>{`
        .admin-animals-page {
          min-height: 100vh;
          width: 100%;
          background-color: #f7f8fc;
        }

        .admin-animals-main {
          margin-left: 250px;
          width: calc(100% - 250px);
          min-width: 0;
          min-height: 100vh;
          flex: 1;
        }

        .admin-animals-header {
          padding: 10px 18px;
        }

        .admin-animals-content {
          padding: 18px;
          min-width: 0;
        }

        .admin-animals-table {
          min-width: 1050px;
        }

        .admin-animals-no-data {
          padding: 55px;
        }

        @media (max-width: 767.98px) {
          .admin-animals-main {
            margin-left: 0;
            width: 100%;
            min-width: 0;
          }

          .admin-animals-header {
            padding: 12px !important;
          }

          .admin-animals-header h5 {
            font-size: 15px !important;
          }

          .admin-animals-header small {
            font-size: 11px;
          }

          .admin-animals-header .btn {
            flex-shrink: 0;
            font-size: 12px;
            padding: 6px 9px;
          }

          .admin-animals-header-inner {
            gap: 8px;
          }

          .admin-animals-content {
            padding: 12px !important;
          }

          .admin-animals-title {
            align-items: flex-start !important;
            gap: 8px;
          }

          .admin-animals-title h2 {
            font-size: 21px !important;
          }

          .admin-animals-title p {
            font-size: 12px !important;
          }

          .admin-animals-total {
            font-size: 12px !important;
            white-space: nowrap;
          }

          .admin-animals-filter .card-body {
            padding: 12px;
          }

          .admin-animals-filter .form-control,
          .admin-animals-filter .form-select,
          .admin-animals-filter .btn {
            width: 100%;
            min-width: 0;
            font-size: 14px;
          }

          .admin-animals-filter .form-label {
            font-size: 12px !important;
          }

          .admin-animals-result-count {
            font-size: 12px !important;
            overflow-wrap: anywhere;
          }

          .admin-animals-table-card {
            width: 100%;
            min-width: 0;
          }

          .admin-animals-table {
            min-width: 1050px;
          }

          .admin-animals-no-data {
            padding: 30px 14px !important;
          }

          .admin-animals-no-data h5 {
            font-size: 17px;
          }

          .admin-animals-no-data p {
            font-size: 13px;
          }
        }
      `}</style>

      <AdminSidebar />

      <div className="admin-animals-main">
        {/* TOP HEADER */}
        <div className="admin-animals-header bg-white border-bottom">
          <div className="admin-animals-header-inner d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold mb-1" style={{ fontSize: "16px" }}>
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

        {/* CONTENT */}
        <div className="admin-animals-content">
          {/* TITLE */}
          <div className="admin-animals-title d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="fw-bold mb-1" style={{ fontSize: "24px" }}>
                All Animals
              </h2>

              <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                Animals added by sellers.
              </p>
            </div>

            <div
              className="admin-animals-total text-muted"
              style={{ fontSize: "13px" }}
            >
              Total: <strong>{animals.length}</strong>
            </div>
          </div>

          {/* ERROR */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* SEARCH + FILTER */}
          <div
            className="admin-animals-filter card border-0 shadow-sm mb-3"
            style={{ borderRadius: "12px" }}
          >
            <div className="card-body py-3">
              <div className="row g-3 align-items-end">
                <div className="col-12 col-md-6 col-lg-7">
                  <label
                    className="form-label fw-semibold mb-1"
                    style={{ fontSize: "12px" }}
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

                <div className="col-12 col-sm-6 col-md-3 col-lg-3">
                  <label
                    className="form-label fw-semibold mb-1"
                    style={{ fontSize: "12px" }}
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

                <div className="col-12 col-sm-6 col-md-3 col-lg-2">
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

          {/* RESULT COUNT */}
          <div
            className="admin-animals-result-count text-muted mb-2"
            style={{ fontSize: "13px" }}
          >
            Showing <strong>{filteredAnimals.length}</strong> of{" "}
            <strong>{animals.length}</strong> animals
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <div
                  className="spinner-border text-primary mb-3"
                  role="status"
                />
                <div className="text-muted">Loading animals...</div>
              </div>
            </div>
          ) : filteredAnimals.length === 0 ? (
            /* NO DATA */
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="admin-animals-no-data card-body text-center">
                <h5 className="fw-bold">No Animals Found</h5>

                <p className="text-muted mb-0">
                  No animals match your search or selected status.
                </p>
              </div>
            </div>
          ) : (
            /* TABLE */
            <div
              className="admin-animals-table-card card border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="admin-animals-table table table-hover align-middle mb-0">
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

                    <tbody>
                      {filteredAnimals.map((animal, index) => {
                        const animalId = animal.animalId;
                        const status =
                          animal.approvalStatus?.toUpperCase() || "PENDING";
                        const frontImage = getImageUrl(animal.frontImageUrl);

                        return (
                          <tr key={animalId || `${animal.animalName}-${index}`}>
                            <td style={cellStyle}>{index + 1}</td>

                            <td style={cellStyle}>
                              <div
                                style={{ fontWeight: "700", fontSize: "13px" }}
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

                            <td style={cellStyle}>
                              {animal.categoryName || "N/A"}
                            </td>

                            <td style={cellStyle}>{animal.breed || "N/A"}</td>

                            <td style={cellStyle}>{animal.age ?? "N/A"}</td>

                            <td
                              style={{
                                ...cellStyle,
                                fontWeight: "700",
                                color: "#198754",
                              }}
                            >
                              {formatPrice(animal.price)}
                            </td>

                            <td style={cellStyle}>
                              <div
                                style={{ fontWeight: "600", fontSize: "13px" }}
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

                            <td style={cellStyle}>
                              <AnimalThumbnail src={frontImage} label="Front" />
                            </td>

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

                            <td style={cellStyle}>
                              <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={() => {
                                  console.log(
                                    "Opening Animal ID:",
                                    animal.animalId,
                                  );
                                  navigate(`/admin/animals/${animal.animalId}`);
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

function AnimalThumbnail({ src, label }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div style={{ width: "65px", textAlign: "center" }}>
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

const headerStyle = {
  padding: "10px",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: "600",
  whiteSpace: "nowrap",
  backgroundColor: "#0d6efd",
  borderBottom: "2px solid #0d6efd",
};

const cellStyle = {
  padding: "12px",
  verticalAlign: "middle",
  fontSize: "12px",
  whiteSpace: "nowrap",
};

export default AdminAnimals;
