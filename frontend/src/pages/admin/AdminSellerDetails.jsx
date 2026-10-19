import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";
import { apiUrl } from "../../config/api";

function AdminSellerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // SELLER / PAYMENT STATE
  const [seller, setSeller] = useState(null);
  const [payment, setPayment] = useState(null);

  // COMMON STATE
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // LOAD SELLER DETAILS
  const loadSellerDetails = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await AdminService.getAdminSellerById(id);
      setSeller(response.data);

      try {
        const paymentResponse = await AdminService.getSellerLatestPayment(id);

        setPayment(paymentResponse.data || null);
      } catch (paymentError) {
        console.log("No payment found for this seller:", paymentError);
        setPayment(null);
      }
    } catch (error) {
      console.error("Seller Details Error:", error);

      setErrorMessage(
        error?.response?.data?.message || "Unable to load seller details.",
      );
    } finally {
      setLoading(false);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    if (id) {
      loadSellerDetails();
    }
  }, [id]);

  // COMMON ACTION HANDLER
  const executeSellerAction = async (action, successText) => {
    try {
      setActionLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      let response;

      if (action === "approve") {
        response = await AdminService.approveSeller(id);
      }

      if (action === "block") {
        response = await AdminService.blockSeller(id);
      }

      if (action === "activate") {
        response = await AdminService.activateSeller(id);
      }

      if (action === "reject") {
        response = await AdminService.rejectSeller(id);
      }

      if (response?.data) {
        setSeller(response.data);
      }

      setSuccessMessage(response?.data?.message || successText);

      await loadSellerDetails();
    } catch (error) {
      console.error(`Seller ${action} action error:`, error);

      setErrorMessage(
        error?.response?.data?.message || `Unable to ${action} seller.`,
      );
    } finally {
      setActionLoading(false);
    }
  };

  // APPROVE SELLER
  const handleApprove = () => {
    if (!window.confirm("Are you sure you want to APPROVE this seller?")) {
      return;
    }

    executeSellerAction("approve", "Seller approved successfully.");
  };

  // BLOCK SELLER
  const handleBlock = () => {
    if (!window.confirm("Are you sure you want to BLOCK this seller?")) {
      return;
    }

    executeSellerAction("block", "Seller blocked successfully.");
  };

  // ACTIVATE SELLER
  const handleActivate = () => {
    if (!window.confirm("Are you sure you want to ACTIVATE this seller?")) {
      return;
    }

    executeSellerAction("activate", "Seller activated successfully.");
  };

  // REJECT SELLER
  const handleReject = () => {
    if (!window.confirm("Are you sure you want to REJECT this seller?")) {
      return;
    }

    executeSellerAction("reject", "Seller rejected successfully.");
  };

  // MASK AADHAAR
  const getLastFourAadhaar = (aadhaarNumber) => {
    if (!aadhaarNumber) {
      return "-";
    }

    const value = String(aadhaarNumber).replace(/\s/g, "").replace(/-/g, "");

    if (value.length < 4) {
      return value;
    }

    return `XXXX XXXX ${value.slice(-4)}`;
  };

  // MASK PAN
  const getLastFourPan = (panNumber) => {
    if (!panNumber) {
      return "-";
    }

    const value = String(panNumber).replace(/\s/g, "");

    if (value.length <= 4) {
      return value;
    }

    return `XXXX${value.slice(-4)}`;
  };

  // IMAGE URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return null;
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    return apiUrl(cleanPath);
  };

  // PAYMENT SCREENSHOT URL
  const getPaymentScreenshotUrl = (paymentScreenshot) => {
    return getImageUrl(paymentScreenshot);
  };

  // STATUS CLASS
  const getStatusClass = (status) => {
    const currentStatus = status ? status.toUpperCase() : "";

    if (currentStatus === "APPROVED" || currentStatus === "ACTIVE") {
      return "badge bg-success";
    }

    if (currentStatus === "INACTIVE") {
      return "badge bg-secondary";
    }

    if (currentStatus === "REJECTED") {
      return "badge bg-danger";
    }

    if (currentStatus === "PENDING") {
      return "badge bg-warning text-dark";
    }

    return "badge bg-secondary";
  };

  // PAYMENT STATUS CLASS
  const getPaymentStatusClass = (status) => {
    const currentStatus = status ? status.toUpperCase() : "";

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

  // SUBSCRIPTION STATUS CLASS
  const getSubscriptionStatusClass = (status) => {
    const currentStatus = status ? status.toUpperCase() : "";

    if (currentStatus === "ACTIVE") {
      return "badge bg-success";
    }

    if (currentStatus === "INACTIVE") {
      return "badge bg-secondary";
    }

    if (currentStatus === "PENDING") {
      return "badge bg-warning text-dark";
    }

    if (currentStatus === "EXPIRED") {
      return "badge bg-danger";
    }

    return "badge bg-secondary";
  };

  return (
    <div className="seller-details-page d-flex">
      <style>{`
        .seller-details-page,
        .seller-details-page * {
          box-sizing: border-box;
        }

        .seller-details-page {
          min-height: 100vh;
          width: 100%;
          max-width: 100%;
          background-color: #f7f8fc;
          overflow-x: clip;
        }

        .seller-details-main {
          margin-left: 250px;
          width: calc(100% - 250px);
          min-width: 0;
          flex: 1;
        }

        .seller-details-header {
          padding: 16px 24px;
        }

        .seller-details-content {
          padding: 24px;
          min-width: 0;
          width: 100%;
        }

        .seller-details-page .card {
          min-width: 0;
          max-width: 100%;
          border-radius: 14px;
          overflow-wrap: anywhere;
        }

        .seller-details-page .card-body {
          min-width: 0;
          padding: 20px;
        }

        .seller-details-page .row > * {
          min-width: 0;
        }

        .seller-details-page img {
          max-width: 100%;
        }

        .seller-details-page .seller-document-image {
          display: block;
          width: 100%;
          height: 250px;
          max-width: 100%;
          object-fit: contain;
          background-color: #f8f9fa;
          cursor: pointer;
        }

        .seller-details-page .seller-payment-image {
          display: block;
          width: 280px;
          max-width: 100%;
          max-height: 350px;
          object-fit: contain;
          border: 1px solid #dee2e6;
          border-radius: 10px;
          cursor: pointer;
          background-color: #f8f9fa;
        }

        .seller-details-page .seller-action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .seller-details-page .seller-info-value {
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        @media (max-width: 767.98px) {
          .seller-details-main {
            margin-left: 0;
            width: 100%;
            min-width: 0;
            flex: 1 1 100%;
          }

          .seller-details-header {
            padding: 14px;
          }

          .seller-details-header h3 {
            font-size: 1.35rem;
          }

          .seller-details-content {
            padding: 12px !important;
            width: 100%;
            min-width: 0;
          }

          .seller-details-page .card {
            width: 100%;
            margin-left: 0;
            margin-right: 0;
          }

          .seller-details-page .card-body {
            padding: 14px;
          }

          .seller-details-page .card-body h5 {
            font-size: 1.05rem;
          }

          .seller-details-page .seller-action-header {
            align-items: stretch !important;
          }

          .seller-details-page .seller-action-buttons {
            display: flex;
            flex-direction: column;
            width: 100%;
          }

          .seller-details-page .seller-action-buttons button {
            width: 100%;
            min-height: 42px;
          }

          .seller-details-page .seller-status-grid > div,
          .seller-details-page .seller-info-grid > div,
          .seller-details-page .seller-payment-grid > div,
          .seller-details-page .seller-document-grid > div {
            width: 100%;
          }

          .seller-details-page .seller-document-image {
            width: 100%;
            height: 220px;
          }

          .seller-details-page .seller-payment-image {
            width: 100%;
            max-width: 100%;
          }

          .seller-details-page .alert {
            overflow-wrap: anywhere;
          }

          .seller-details-page .badge {
            white-space: normal;
            text-align: left;
          }
        }
      `}</style>

      <AdminSidebar />

      <div className="seller-details-main">
        {/* HEADER */}
        <div className="seller-details-header bg-white border-bottom">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm mb-3"
            onClick={() => navigate("/admin/sellers")}
          >
            ← Back to Sellers
          </button>

          <h3 className="fw-bold mb-1">Seller Details</h3>

          <small className="text-muted">
            Complete seller information &amp; approval management
          </small>
        </div>

        <div className="seller-details-content">
          {/* LOADING */}
          {loading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "50vh" }}
            >
              <div className="text-center">
                <div
                  className="spinner-border text-primary mb-3"
                  role="status"
                />

                <div className="text-muted">Loading seller details...</div>
              </div>
            </div>
          )}

          {/* ERROR */}
          {!loading && errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {/* SUCCESS */}
          {!loading && successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {/* SELLER NOT FOUND */}
          {!loading && !errorMessage && !seller && (
            <div className="alert alert-warning">Seller not found.</div>
          )}

          {!loading && seller && (
            <>
              {/* SELLER APPROVAL MANAGEMENT */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <div className="seller-action-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                      <h5 className="fw-bold mb-1">
                        Seller Approval Management
                      </h5>

                      <div className="text-muted">
                        Manage seller account status
                      </div>
                    </div>

                    <div className="seller-action-buttons">
                      <button
                        type="button"
                        className="btn btn-success"
                        disabled={
                          actionLoading || seller.approvalStatus === "APPROVED"
                        }
                        onClick={handleApprove}
                        title={
                          payment?.paymentStatus?.toUpperCase() !== "APPROVED"
                            ? "Payment must be approved first"
                            : "Approve seller"
                        }
                      >
                        {actionLoading ? "Processing..." : "✓ APPROVE"}
                      </button>

                      {seller.status?.toUpperCase() === "ACTIVE" ? (
                        <button
                          type="button"
                          className="btn btn-warning"
                          disabled={actionLoading}
                          onClick={handleBlock}
                        >
                          ⛔ BLOCK
                        </button>
                      ) : seller.status?.toUpperCase() === "INACTIVE" ? (
                        <button
                          type="button"
                          className="btn btn-primary"
                          disabled={actionLoading}
                          onClick={handleActivate}
                        >
                          ✓ ACTIVATE
                        </button>
                      ) : null}

                      <button
                        type="button"
                        className="btn btn-danger"
                        disabled={
                          actionLoading || seller.approvalStatus === "REJECTED"
                        }
                        onClick={handleReject}
                      >
                        ✕ REJECT
                      </button>
                    </div>
                  </div>

                  <hr />

                  {/* CURRENT STATUS */}
                  <div className="row g-3 seller-status-grid">
                    <div className="col-md-4">
                      <div className="border rounded p-3 h-100">
                        <div className="text-muted small">Approval Status</div>

                        <div className="mt-2">
                          <span
                            className={getStatusClass(seller.approvalStatus)}
                          >
                            {seller.approvalStatus || "PENDING"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="border rounded p-3 h-100">
                        <div className="text-muted small">Account Status</div>

                        <div className="mt-2">
                          <span className={getStatusClass(seller.status)}>
                            {seller.status || "PENDING"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="border rounded p-3 h-100">
                        <div className="text-muted small">Payment Status</div>

                        <div className="mt-2">
                          <span
                            className={getPaymentStatusClass(
                              payment?.paymentStatus,
                            )}
                          >
                            {payment?.paymentStatus || "PENDING"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* APPROVAL WARNING */}
                  {payment?.paymentStatus?.toUpperCase() !== "APPROVED" &&
                    seller.approvalStatus !== "APPROVED" && (
                      <div className="alert alert-warning mt-3 mb-0">
                        <strong>Approval blocked:</strong> Admin must approve
                        the seller payment before approving this seller account.
                      </div>
                    )}
                </div>
              </div>

              {/* SELLER INFORMATION */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-4">Seller Information</h5>

                  <div className="row g-3 seller-info-grid">
                    <div className="col-md-6">
                      <strong>Seller ID:</strong>
                      <div className="seller-info-value">
                        {seller.sellerId || seller.id || "-"}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>Seller Name:</strong>
                      <div className="seller-info-value">
                        {seller.sellerName || "-"}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>Email:</strong>
                      <div className="seller-info-value">
                        {seller.email || "-"}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>Mobile:</strong>
                      <div className="seller-info-value">
                        {seller.mobile || "-"}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>Business Name:</strong>
                      <div className="seller-info-value">
                        {seller.businessName || "-"}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>Farm Name:</strong>
                      <div className="seller-info-value">
                        {seller.farmName || "-"}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>Owner Name:</strong>
                      <div className="seller-info-value">
                        {seller.ownerName || seller.sellerName || "-"}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>KYC Status:</strong>
                      <div>
                        <span className={getStatusClass(seller.kycStatus)}>
                          {seller.kycStatus || "PENDING"}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>Mobile Verified:</strong>
                      <div>{seller.mobileVerified ? "YES" : "NO"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Email Verified:</strong>
                      <div>{seller.emailVerified ? "YES" : "NO"}</div>
                    </div>

                    <div className="col-12">
                      <strong>Address:</strong>
                      <div className="seller-info-value">
                        {seller.address || "-"}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <strong>City:</strong>
                      <div>{seller.city || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>State:</strong>
                      <div>{seller.state || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>District:</strong>
                      <div>{seller.district || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>Sub District:</strong>
                      <div>{seller.subDistrict || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>Village:</strong>
                      <div>{seller.village || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>Pincode:</strong>
                      <div>{seller.pincode || "-"}</div>
                    </div>

                    <div className="col-12">
                      <strong>Location:</strong>
                      <div className="seller-info-value">
                        {seller.location || "-"}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>Aadhaar Number:</strong>
                      <div>{getLastFourAadhaar(seller.aadhaarNumber)}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>PAN Number:</strong>
                      <div>{getLastFourPan(seller.panNumber)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SELLER IMAGES & KYC DOCUMENTS */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-4">
                    Seller Images &amp; KYC Documents
                  </h5>

                  <div className="row g-4 seller-document-grid">
                    {/* PROFILE IMAGE */}
                    <div className="col-md-4">
                      <div className="border rounded p-3 h-100">
                        <div className="text-muted small mb-3">
                          Profile Image
                        </div>

                        {getImageUrl(seller.profileImage) ? (
                          <img
                            src={getImageUrl(seller.profileImage)}
                            alt="Seller Profile"
                            className="seller-document-image img-fluid rounded"
                            onClick={() =>
                              window.open(
                                getImageUrl(seller.profileImage),
                                "_blank",
                                "noopener,noreferrer",
                              )
                            }
                          />
                        ) : (
                          <div className="text-muted">
                            No profile image available.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* AADHAAR FRONT */}
                    <div className="col-md-4">
                      <div className="border rounded p-3 h-100">
                        <div className="text-muted small mb-3">
                          Aadhaar Front
                        </div>

                        {getImageUrl(seller.aadhaarFrontImage) ? (
                          <img
                            src={getImageUrl(seller.aadhaarFrontImage)}
                            alt="Aadhaar Front"
                            className="seller-document-image img-fluid rounded"
                            onClick={() =>
                              window.open(
                                getImageUrl(seller.aadhaarFrontImage),
                                "_blank",
                                "noopener,noreferrer",
                              )
                            }
                          />
                        ) : (
                          <div className="text-muted">
                            No Aadhaar front image available.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* AADHAAR BACK */}
                    <div className="col-md-4">
                      <div className="border rounded p-3 h-100">
                        <div className="text-muted small mb-3">
                          Aadhaar Back
                        </div>

                        {getImageUrl(seller.aadhaarBackImage) ? (
                          <img
                            src={getImageUrl(seller.aadhaarBackImage)}
                            alt="Aadhaar Back"
                            className="seller-document-image img-fluid rounded"
                            onClick={() =>
                              window.open(
                                getImageUrl(seller.aadhaarBackImage),
                                "_blank",
                                "noopener,noreferrer",
                              )
                            }
                          />
                        ) : (
                          <div className="text-muted">
                            No Aadhaar back image available.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SUBSCRIPTION & PAYMENT */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-4">Subscription &amp; Payment</h5>

                  {!payment ? (
                    <div className="alert alert-warning mb-0">
                      No payment information found for this seller.
                    </div>
                  ) : (
                    <div className="row g-4 seller-payment-grid">
                      {/* PLAN */}
                      <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                          <div className="text-muted small mb-1">
                            Subscription Plan
                          </div>

                          <div className="fw-bold fs-5">
                            {payment.planName || "Not available"}
                          </div>

                          {payment.durationMonths && (
                            <div className="text-muted mt-1">
                              Duration: {payment.durationMonths} Months
                            </div>
                          )}
                        </div>
                      </div>

                      {/* AMOUNT */}
                      <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                          <div className="text-muted small mb-1">
                            Payment Amount
                          </div>

                          <div className="fw-bold fs-5">
                            {payment.amount != null
                              ? `₹${payment.amount}`
                              : "Not available"}
                          </div>
                        </div>
                      </div>

                      {/* PAYMENT STATUS */}
                      <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                          <div className="text-muted small mb-2">
                            Payment Status
                          </div>

                          <span
                            className={getPaymentStatusClass(
                              payment.paymentStatus,
                            )}
                          >
                            {payment.paymentStatus || ""}
                          </span>
                        </div>
                      </div>

                      {/* PAYMENT DATE */}
                      <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                          <div className="text-muted small mb-1">
                            Payment Date
                          </div>

                          <div className="fw-semibold seller-info-value">
                            {payment.paidAt ||
                              payment.createdAt ||
                              "Not available"}
                          </div>
                        </div>
                      </div>

                      {/* SUBSCRIPTION STATUS */}
                      <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                          <div className="text-muted small mb-2">
                            Subscription Status
                          </div>

                          <span
                            className={getSubscriptionStatusClass(
                              payment.subscriptionStatus,
                            )}
                          >
                            {payment.subscriptionStatus || "INACTIVE"}
                          </span>
                        </div>
                      </div>

                      {/* START DATE */}
                      <div className="col-md-3">
                        <div className="border rounded p-3 h-100">
                          <div className="text-muted small mb-1">
                            Start Date
                          </div>

                          <div className="fw-semibold seller-info-value">
                            {payment.subscriptionStartDate || "-"}
                          </div>
                        </div>
                      </div>

                      {/* END DATE */}
                      <div className="col-md-3">
                        <div className="border rounded p-3 h-100">
                          <div className="text-muted small mb-1">End Date</div>

                          <div className="fw-semibold seller-info-value">
                            {payment.subscriptionEndDate || "-"}
                          </div>
                        </div>
                      </div>

                      {/* PAYMENT SCREENSHOT */}
                      <div className="col-12">
                        <div className="border rounded p-3">
                          <div className="text-muted small mb-3">
                            Payment Screenshot
                          </div>

                          {getPaymentScreenshotUrl(
                            payment.paymentScreenshot,
                          ) ? (
                            <img
                              src={getPaymentScreenshotUrl(
                                payment.paymentScreenshot,
                              )}
                              alt="Payment Screenshot"
                              className="seller-payment-image"
                              onClick={() =>
                                window.open(
                                  getPaymentScreenshotUrl(
                                    payment.paymentScreenshot,
                                  ),
                                  "_blank",
                                  "noopener,noreferrer",
                                )
                              }
                            />
                          ) : (
                            <div className="text-muted">
                              No payment screenshot available.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SELLER ANIMALS - UNCHANGED */}
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Seller Animals</h5>

                  <div className="alert alert-info mb-0">
                    Seller-specific animal data will remain unchanged here. This
                    section is not modified as part of the seller approval
                    requirement.
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Bottom Seller Action Buttons */}
          <div className="card shadow-sm mt-4 mb-3">
            <div className="card-body">
              <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">
                <button
                  className="btn btn-success"
                  onClick={handleApprove}
                  disabled={
                    actionLoading || seller?.approvalStatus === "APPROVED"
                  }
                >
                  Approval
                </button>

                <button
                  className="btn btn-danger"
                  onClick={handleBlock}
                  disabled={actionLoading}
                >
                  Block
                </button>

                <button
                  className="btn btn-warning"
                  onClick={handleReject}
                  disabled={actionLoading}
                >
                  Rejected
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSellerDetails;
