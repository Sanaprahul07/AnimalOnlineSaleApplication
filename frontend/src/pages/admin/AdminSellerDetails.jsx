import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

function AdminSellerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seller, setSeller] = useState(null);
  const [payment, setPayment] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadSeller = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        // ==============================
        // SELLER DETAILS
        // ==============================

        const response = await AdminService.getAdminSellerById(id);

        setSeller(response.data);

        // ==============================
        // LATEST PAYMENT DETAILS
        // ==============================

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
          error.response?.data?.message || "Unable to load seller details.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadSeller();
    }
  }, [id]);

  // ==========================================
  // MASK AADHAAR
  // ==========================================

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

  // ==========================================
  // MASK PAN
  // ==========================================

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

  // ==========================================
  // PAYMENT SCREENSHOT URL
  // ==========================================

  const getPaymentScreenshotUrl = (paymentScreenshot) => {
    if (!paymentScreenshot) {
      return null;
    }

    if (
      paymentScreenshot.startsWith("http://") ||
      paymentScreenshot.startsWith("https://")
    ) {
      return paymentScreenshot;
    }

    const cleanPath = paymentScreenshot.startsWith("/")
      ? paymentScreenshot
      : `/${paymentScreenshot}`;

    return `http://localhost:8080${cleanPath}`;
  };

  // ==========================================
  // PAYMENT STATUS CLASS
  // ==========================================

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

  // ==========================================
  // SUBSCRIPTION STATUS CLASS
  // ==========================================

  const getSubscriptionStatusClass = (status) => {
    const currentStatus = status ? status.toUpperCase() : "";

    if (currentStatus === "ACTIVE") {
      return "badge bg-success";
    }

    if (currentStatus === "PENDING") {
      return "badge bg-warning text-dark";
    }

    if (currentStatus === "EXPIRED") {
      return "badge bg-danger";
    }

    return "badge bg-secondary";
  };

  // ==========================================
  // LOADING
  // ==========================================

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

            <div className="text-muted">Loading seller details...</div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN
  // ==========================================

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
        }}
      >
        {/* =================================
                    HEADER
                ================================= */}

        <div className="bg-white border-bottom px-4 py-3">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm mb-3"
            onClick={() => navigate("/admin/sellers")}
          >
            ← Back to Sellers
          </button>

          <h3 className="fw-bold mb-1">Seller Details</h3>

          <small className="text-muted">Complete seller information</small>
        </div>

        <div className="p-4">
          {/* =================================
                        ERROR
                    ================================= */}

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {/* =================================
                        SELLER NOT FOUND
                    ================================= */}

          {!errorMessage && !seller && (
            <div className="alert alert-warning">Seller not found.</div>
          )}

          {seller && (
            <>
              {/* =================================
                                SELLER INFORMATION
                            ================================= */}

              <div
                className="card border-0 shadow-sm mb-4"
                style={{
                  borderRadius: "14px",
                }}
              >
                <div className="card-body">
                  <h5 className="fw-bold mb-4">Seller Information</h5>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <strong>Seller ID:</strong>

                      <div>{seller.id || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Seller Name:</strong>

                      <div>{seller.sellerName || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Email:</strong>

                      <div>{seller.email || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Mobile:</strong>

                      <div>{seller.mobile || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Business Name:</strong>

                      <div>{seller.businessName || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Farm Name:</strong>

                      <div>{seller.farmName || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Owner Name:</strong>

                      <div>{seller.ownerName || seller.sellerName || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Approval Status:</strong>

                      <div>
                        <span
                          className={`badge ${
                            seller.approvalStatus === "APPROVED"
                              ? "bg-success"
                              : seller.approvalStatus === "REJECTED"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                          }`}
                        >
                          {seller.approvalStatus || "PENDING"}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>KYC Status:</strong>

                      <div>{seller.kycStatus || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Account Status:</strong>

                      <div>{seller.status || "-"}</div>
                    </div>

                    <div className="col-12">
                      <strong>Address:</strong>

                      <div>{seller.address || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>City:</strong>

                      <div>{seller.city || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>District:</strong>

                      <div>{seller.district || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>State:</strong>

                      <div>{seller.state || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>Village:</strong>

                      <div>{seller.village || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>Post Office:</strong>

                      <div>{seller.postOffice || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>Pincode:</strong>

                      <div>{seller.pincode || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Aadhaar Number:</strong>

                      <div>{getLastFourAadhaar(seller.aadhaarNumber)}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>PAN Number:</strong>

                      <div>{getLastFourPan(seller.panNumber)}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Mobile Verified:</strong>

                      <div>{seller.mobileVerified ? "YES" : "NO"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Email Verified:</strong>

                      <div>{seller.emailVerified ? "YES" : "NO"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================
                                SUBSCRIPTION & PAYMENT
                            ================================= */}

              <div
                className="card border-0 shadow-sm mb-4"
                style={{
                  borderRadius: "14px",
                }}
              >
                <div className="card-body">
                  <h5 className="fw-bold mb-4">Subscription & Payment</h5>

                  {!payment ? (
                    <div className="alert alert-warning mb-0">
                      No payment information found for this seller.
                    </div>
                  ) : (
                    <div className="row g-4">
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
                            {payment.paymentStatus || "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* PAYMENT DATE */}

                      <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                          <div className="text-muted small mb-1">
                            Payment Date
                          </div>

                          <div className="fw-semibold">
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
                            {payment.subscriptionStatus || "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* START DATE */}

                      <div className="col-md-3">
                        <div className="border rounded p-3 h-100">
                          <div className="text-muted small mb-1">
                            Start Date
                          </div>

                          <div className="fw-semibold">
                            {payment.subscriptionStartDate || "-"}
                          </div>
                        </div>
                      </div>

                      {/* END DATE */}

                      <div className="col-md-3">
                        <div className="border rounded p-3 h-100">
                          <div className="text-muted small mb-1">End Date</div>

                          <div className="fw-semibold">
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
                              onClick={() =>
                                window.open(
                                  getPaymentScreenshotUrl(
                                    payment.paymentScreenshot,
                                  ),
                                  "_blank",
                                )
                              }
                              style={{
                                width: "220px",
                                maxHeight: "300px",
                                objectFit: "contain",
                                border: "1px solid #dee2e6",
                                borderRadius: "10px",
                                cursor: "pointer",
                                backgroundColor: "#f8f9fa",
                              }}
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

              {/* =================================
                                SELLER ANIMALS
                            ================================= */}

              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: "14px",
                }}
              >
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Seller Animals</h5>

                  <div className="alert alert-info mb-0">
                    Seller-specific animal data will be displayed here after the
                    seller-animal backend response is connected.
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSellerDetails;
