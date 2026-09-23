import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

function AdminAnimalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // =========================================================
  // ANIMAL STATE
  // =========================================================

  const [animal, setAnimal] = useState(null);

  // =========================================================
  // COMMON STATE
  // =========================================================

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =========================================================
  // LOAD ANIMAL DETAILS
  // =========================================================

  const loadAnimalDetails = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await AdminService.getAnimalById(id);

      console.log("Admin Animal Details Response:", response.data);

      setAnimal(response.data);
    } catch (error) {
      console.error("Admin Animal Details Error:", error);

      console.error("Backend Response:", error?.response?.data);

      setErrorMessage(
        error?.response?.data?.message || "Unable to load animal details.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    if (id) {
      loadAnimalDetails();
    }
  }, [id]);

  // =========================================================
  // IMAGE URL
  // =========================================================

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return null;
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    return `http://localhost:8080${cleanPath}`;
  };

  // =========================================================
  // PRICE FORMAT
  // =========================================================

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

  // =========================================================
  // STATUS CLASS
  // =========================================================

  const getStatusClass = (status) => {
    const currentStatus = status?.toUpperCase() || "";

    if (currentStatus === "APPROVED") {
      return "badge bg-success";
    }

    if (currentStatus === "REJECTED") {
      return "badge bg-danger";
    }

    if (currentStatus === "PENDING") {
      return "badge bg-warning text-dark";
    }

    return "badge bg-secondary";
  };

  // =========================================================
  // AVAILABLE STATUS CLASS
  // =========================================================

  const getAvailableStatusClass = (available) => {
    return available ? "badge bg-success" : "badge bg-secondary";
  };

  // =========================================================
  // APPROVE ANIMAL
  // =========================================================

  const handleApprove = async () => {
    if (!animal?.animalId) {
      return;
    }

    const confirmApprove = window.confirm(
      "Are you sure you want to APPROVE this animal?",
    );

    if (!confirmApprove) {
      return;
    }

    try {
      setActionLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      console.log("Approving Animal ID:", animal.animalId);

      const response = await AdminService.approveAnimal(animal.animalId);

      console.log("Approve Animal Response:", response.data);

      setSuccessMessage(
        response?.data?.message || "Animal approved successfully.",
      );

      await loadAnimalDetails();
    } catch (error) {
      console.error("Approve Animal Error:", error);

      console.error("Approve Backend Response:", error?.response?.data);

      setErrorMessage(
        error?.response?.data?.message || "Unable to approve animal.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =========================================================
  // REJECT ANIMAL
  // =========================================================

  const handleReject = async () => {
    if (!animal?.animalId) {
      return;
    }

    const confirmReject = window.confirm(
      "Are you sure you want to REJECT this animal?",
    );

    if (!confirmReject) {
      return;
    }

    try {
      setActionLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      console.log("Rejecting Animal ID:", animal.animalId);

      const response = await AdminService.rejectAnimal(animal.animalId);

      console.log("Reject Animal Response:", response.data);

      setSuccessMessage(
        response?.data?.message || "Animal rejected successfully.",
      );

      await loadAnimalDetails();
    } catch (error) {
      console.error("Reject Animal Error:", error);

      console.error("Reject Backend Response:", error?.response?.data);

      setErrorMessage(
        error?.response?.data?.message || "Unable to reject animal.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

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

            <div className="text-muted">Loading animal details...</div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // NOT FOUND
  // =========================================================

  if (!animal) {
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
          style={{
            marginLeft: "250px",
            width: "calc(100% - 250px)",
            padding: "30px",
          }}
        >
          {errorMessage ? (
            <div className="alert alert-danger">{errorMessage}</div>
          ) : (
            <div className="alert alert-warning">Animal not found.</div>
          )}

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/admin/animals")}
          >
            ← Back to Animals
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // CURRENT STATUS
  // =========================================================

  const approvalStatus = animal.approvalStatus?.toUpperCase() || "PENDING";

  const availableStatus = Boolean(animal.available);

  // =========================================================
  // MAIN
  // =========================================================

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
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
        }}
      >
        {/* =================================================
                    HEADER
                ================================================= */}

        <div className="bg-white border-bottom px-4 py-3">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm mb-3"
            onClick={() => navigate("/admin/animals")}
          >
            ← Back to Animals
          </button>

          <h3 className="fw-bold mb-1">Animal Details</h3>

          <small className="text-muted">
            Complete animal information & approval management
          </small>
        </div>

        <div className="p-4">
          {/* =================================================
                        ERROR
                    ================================================= */}

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {/* =================================================
                        SUCCESS
                    ================================================= */}

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {/* =================================================
                        ANIMAL APPROVAL MANAGEMENT
                    ================================================= */}

          <div
            className="card border-0 shadow-sm mb-4"
            style={{
              borderRadius: "14px",
            }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <h5 className="fw-bold mb-1">Animal Approval Management</h5>

                  <div className="text-muted">
                    Review animal details and uploaded images before approval.
                  </div>
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  {approvalStatus === "PENDING" && (
                    <>
                      <button
                        type="button"
                        className="btn btn-success"
                        disabled={actionLoading}
                        onClick={handleApprove}
                      >
                        {actionLoading ? "Processing..." : "✓ APPROVE"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger"
                        disabled={actionLoading}
                        onClick={handleReject}
                      >
                        ✕ REJECT
                      </button>
                    </>
                  )}
                </div>
              </div>

              <hr />

              {/* =================================================
                                CURRENT STATUS
                            ================================================= */}

              <div className="row g-3">
                <div className="col-md-4">
                  <div className="border rounded p-3">
                    <div className="text-muted small">Approval Status</div>

                    <div className="mt-2">
                      <span className={getStatusClass(approvalStatus)}>
                        {approvalStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded p-3">
                    <div className="text-muted small">Available Status</div>

                    <div className="mt-2">
                      <span
                        className={getAvailableStatusClass(availableStatus)}
                      >
                        {availableStatus ? "AVAILABLE" : "NOT AVAILABLE"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded p-3">
                    <div className="text-muted small">Animal ID</div>

                    <div className="mt-2 fw-semibold">
                      {animal.animalId || "-"}
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                                APPROVAL MESSAGE
                            ================================================= */}

              {approvalStatus === "PENDING" && (
                <div className="alert alert-warning mt-3 mb-0">
                  <strong>Review Required:</strong> Admin should verify the
                  animal details and all three uploaded images before approving
                  this animal.
                </div>
              )}
            </div>
          </div>

          {/* =================================================
                        ANIMAL INFORMATION
                    ================================================= */}

          <div
            className="card border-0 shadow-sm mb-4"
            style={{
              borderRadius: "14px",
            }}
          >
            <div className="card-body">
              <h5 className="fw-bold mb-4">Animal Information</h5>

              <div className="row g-3">
                <InfoBox label="Animal ID" value={animal.animalId} />

                <InfoBox label="Animal Name" value={animal.animalName} />

                <InfoBox label="Category" value={animal.categoryName} />

                <InfoBox label="Breed" value={animal.breed} />

                <InfoBox
                  label="Age"
                  value={
                    animal.age !== null && animal.age !== undefined
                      ? `${animal.age} Years`
                      : "-"
                  }
                />

                <InfoBox label="Gender" value={animal.gender} />

                <InfoBox label="Price" value={formatPrice(animal.price)} />

                <InfoBox label="Location" value={animal.location} />

                <InfoBox
                  label="Available"
                  value={availableStatus ? "YES" : "NO"}
                />
              </div>

              {/* =================================================
                                DESCRIPTION
                            ================================================= */}

              <div className="border rounded p-3 mt-3">
                <div className="text-muted small mb-2">Description</div>

                <div>{animal.description || "No description available."}</div>
              </div>
            </div>
          </div>

          {/* =================================================
                        ANIMAL IMAGES
                    ================================================= */}

          <div
            className="card border-0 shadow-sm mb-4"
            style={{
              borderRadius: "14px",
            }}
          >
            <div className="card-body">
              <h5 className="fw-bold mb-4">Animal Images</h5>

              <div className="row g-4">
                {/* =================================================
                                    FRONT IMAGE
                                ================================================= */}

                <div className="col-md-4">
                  <AnimalImageCard
                    src={getImageUrl(animal.frontImageUrl)}
                    label="Front Image"
                  />
                </div>

                {/* =================================================
                                    SIDE IMAGE
                                ================================================= */}

                <div className="col-md-4">
                  <AnimalImageCard
                    src={getImageUrl(animal.sideImageUrl)}
                    label="Side Image"
                  />
                </div>

                {/* =================================================
                                    BACK IMAGE
                                ================================================= */}

                <div className="col-md-4">
                  <AnimalImageCard
                    src={getImageUrl(animal.backImageUrl)}
                    label="Back Image"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
                        SELLER INFORMATION
                    ================================================= */}

          <div
            className="card border-0 shadow-sm mb-4"
            style={{
              borderRadius: "14px",
            }}
          >
            <div className="card-body">
              <h5 className="fw-bold mb-4">Seller Information</h5>

              <div className="row g-3">
                <InfoBox label="Seller ID" value={animal.sellerId} />

                <InfoBox label="Seller Name" value={animal.sellerName} />

                <InfoBox label="Email" value={animal.sellerEmail} />

                <InfoBox label="Mobile" value={animal.sellerMobile} />

                <InfoBox
                  label="Seller Location"
                  value={animal.sellerLocation}
                />
              </div>
            </div>
          </div>

          {/* =================================================
                        FINAL APPROVAL ACTION
                    ================================================= */}

          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: "14px",
            }}
          >
            <div className="card-body">
              <h5 className="fw-bold mb-2">Approval Action</h5>

              <p className="text-muted">
                Admin can review the complete animal information, all three
                photos and seller information before taking the final action.
              </p>

              <div className="d-flex gap-2 flex-wrap">
                {approvalStatus === "PENDING" ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-success"
                      disabled={actionLoading}
                      onClick={handleApprove}
                    >
                      {actionLoading ? "Processing..." : "✓ APPROVE ANIMAL"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      disabled={actionLoading}
                      onClick={handleReject}
                    >
                      ✕ REJECT ANIMAL
                    </button>
                  </>
                ) : (
                  <span
                    className={getStatusClass(approvalStatus)}
                    style={{
                      padding: "9px 14px",
                      fontSize: "13px",
                    }}
                  >
                    Animal {approvalStatus}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// INFO BOX
// =====================================================

function InfoBox({ label, value }) {
  return (
    <div className="col-md-4">
      <div className="border rounded p-3 h-100">
        <div className="text-muted small mb-2">{label}</div>

        <div className="fw-semibold">
          {value !== null && value !== undefined && value !== "" ? value : "-"}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// ANIMAL IMAGE CARD
// =====================================================

function AnimalImageCard({ src, label }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="border rounded p-3 h-100">
      <div className="text-muted small mb-3">{label}</div>

      {src && !imageError ? (
        <img
          src={src}
          alt={label}
          title={`View ${label}`}
          onClick={() => window.open(src, "_blank")}
          onError={() => setImageError(true)}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "contain",
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed #adb5bd",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
            color: "#6c757d",
          }}
        >
          No Image Available
        </div>
      )}
    </div>
  );
}

export default AdminAnimalDetails;
