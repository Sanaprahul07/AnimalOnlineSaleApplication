import { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";
import { apiUrl } from "../../config/api";

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // =====================================================
  // NEW: APPROVED PAYMENT SUMMARY STATE
  // =====================================================

  const [paymentSummary, setPaymentSummary] = useState({
    plans: [],
    totalApprovedSellers: 0,
    totalApprovedAmount: 0,
    totalApprovedPayments: 0,
  });

  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  // =====================================================
  // LOAD PENDING PAYMENTS
  // EXISTING CODE - KEPT
  // =====================================================

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await AdminService.getPendingPayments();

      setPayments(response.data || []);
    } catch (err) {
      console.error("Get Pending Payments Error:", err);

      setError(
        err.response?.data?.message || "Failed to load pending payments.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // NEW: LOAD APPROVED PAYMENT SUMMARY
  // =====================================================

  const loadPaymentSummary = async () => {
    try {
      setSummaryLoading(true);
      setSummaryError("");

      const response = await AdminService.getApprovedPaymentSummary();

      const data = response.data || {};

      setPaymentSummary({
        plans: Array.isArray(data.plans) ? data.plans : [],
        totalApprovedSellers:
          data.totalApprovedSellers != null ? data.totalApprovedSellers : 0,
        totalApprovedAmount:
          data.totalApprovedAmount != null ? data.totalApprovedAmount : 0,
        totalApprovedPayments:
          data.totalApprovedPayments != null ? data.totalApprovedPayments : 0,
      });
    } catch (err) {
      console.error("Payment Summary Error:", err);

      setSummaryError(
        err.response?.data?.message || "Failed to load payment summary.",
      );
    } finally {
      setSummaryLoading(false);
    }
  };

  // =====================================================
  // LOAD ON PAGE OPEN
  // EXISTING CODE - KEPT
  // =====================================================

  useEffect(() => {
    loadPayments();
  }, []);

  // =====================================================
  // NEW: LOAD PAYMENT SUMMARY ON PAGE OPEN
  // =====================================================

  useEffect(() => {
    loadPaymentSummary();
  }, []);

  // =====================================================
  // APPROVE PAYMENT
  // EXISTING CODE KEPT + SUMMARY REFRESH ADDED
  // =====================================================

  const handleApprove = async (paymentId) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this payment?",
    );

    if (!confirmApprove) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setMessage("");

      await AdminService.approveSellerPayment(paymentId);

      setMessage("Payment approved successfully.");

      // NEW: Refresh approved payment summary
      await loadPaymentSummary();

      // Remove approved payment
      // from pending list
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment.id !== paymentId),
      );
    } catch (err) {
      console.error("Approve Payment Error:", err);

      setError(err.response?.data?.message || "Failed to approve payment.");
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // REJECT PAYMENT
  // EXISTING CODE KEPT + SUMMARY REFRESH ADDED
  // =====================================================

  const handleReject = async (paymentId) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this payment?",
    );

    if (!confirmReject) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setMessage("");

      await AdminService.rejectSellerPayment(paymentId);

      setMessage("Payment rejected successfully.");

      // NEW: Refresh approved payment summary
      await loadPaymentSummary();

      // Remove rejected payment
      // from pending list
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment.id !== paymentId),
      );
    } catch (err) {
      console.error("Reject Payment Error:", err);

      setError(err.response?.data?.message || "Failed to reject payment.");
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // FORMAT DATE
  // EXISTING CODE - KEPT
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString();
  };

  // =====================================================
  // NEW: FORMAT AMOUNT IN INDIAN CURRENCY
  // =====================================================

  const formatCurrency = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });
  };

  // =====================================================
  // PAYMENT SCREENSHOT URL
  // EXISTING CODE - KEPT
  // =====================================================

  const getScreenshotUrl = (path) => {
    if (!path) {
      return "";
    }

    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }

    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    return apiUrl(cleanPath);
  };

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
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
        }}
      >
        {/* =================================================
                    HEADER
                ================================================= */}

        <div className="bg-white border-bottom px-4 py-3">
          <h3 className="fw-bold mb-1">Payments</h3>

          <small className="text-muted">
            Verify seller subscription payments
          </small>
        </div>

        {/* =================================================
                    CONTENT
                ================================================= */}

        <div className="p-4">
          {/* SUCCESS MESSAGE */}

          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}

          {/* ERROR MESSAGE */}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* =================================================
                        EXISTING SUMMARY
                        KEPT WITHOUT CHANGES
                    ================================================= */}

          <div className="row g-3 mb-4">
            {/* PENDING */}

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Pending Payments</small>

                  <h3 className="fw-bold mb-0">{payments.length}</h3>
                </div>
              </div>
            </div>

            {/* AWAITING VERIFICATION */}

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Awaiting Verification</small>

                  <h3 className="fw-bold mb-0">{payments.length}</h3>
                </div>
              </div>
            </div>

            {/* REVIEW */}

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Payment Verification</small>

                  <h6 className="fw-bold mb-0 mt-1">Admin Review Required</h6>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
                NEW: APPROVED PAYMENT SUMMARY BY PLAN
              ================================================= */}

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1">Subscription Payment Summary</h5>

                  <small className="text-muted">
                    Approved sellers and total amount for each plan
                  </small>
                </div>

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={loadPaymentSummary}
                  disabled={summaryLoading}
                >
                  {summaryLoading ? "Loading..." : "Refresh Summary"}
                </button>
              </div>

              {/* SUMMARY ERROR */}

              {summaryError && (
                <div className="alert alert-warning" role="alert">
                  {summaryError}
                </div>
              )}

              {/* TOTAL SUMMARY CARDS */}

              <div className="row g-3 mb-4">
                {/* TOTAL APPROVED SELLERS */}

                <div className="col-md-4">
                  <div className="card bg-light border-0 h-100">
                    <div className="card-body">
                      <small className="text-muted">
                        Total Approved Sellers
                      </small>

                      <h3 className="fw-bold mb-0">
                        {paymentSummary.totalApprovedSellers}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* TOTAL APPROVED PAYMENTS */}

                <div className="col-md-4">
                  <div className="card bg-light border-0 h-100">
                    <div className="card-body">
                      <small className="text-muted">
                        Total Approved Payments
                      </small>

                      <h3 className="fw-bold mb-0">
                        {paymentSummary.totalApprovedPayments}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* TOTAL APPROVED AMOUNT */}

                <div className="col-md-4">
                  <div className="card bg-light border-0 h-100">
                    <div className="card-body">
                      <small className="text-muted">
                        Total Approved Amount
                      </small>

                      <h3 className="fw-bold mb-0 text-success">
                        {formatCurrency(paymentSummary.totalApprovedAmount)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* PLAN-WISE SUMMARY TABLE */}

              <h6 className="fw-bold mb-3">Plan-wise Breakdown</h6>

              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Subscription Plan</th>
                      <th>Duration</th>
                      <th>Approved Sellers</th>
                      <th>Total Approved Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paymentSummary.plans.length > 0 ? (
                      paymentSummary.plans.map((plan, index) => (
                        <tr key={plan.planId}>
                          <td>{index + 1}</td>

                          <td className="fw-semibold">
                            {plan.planName || "-"}
                          </td>

                          <td>
                            {plan.durationMonths != null
                              ? `${plan.durationMonths} Months`
                              : "-"}
                          </td>

                          <td>
                            <span className="badge bg-primary">
                              {plan.sellerCount != null ? plan.sellerCount : 0}
                            </span>
                          </td>

                          <td className="fw-bold text-success">
                            {formatCurrency(plan.totalAmount)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          {summaryLoading
                            ? "Loading summary..."
                            : "No approved subscription payments found."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* =================================================
                        EXISTING PAYMENT TABLE
                        KEPT WITHOUT CHANGES
                    ================================================= */}

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1">
                    Pending Subscription Payments
                  </h5>

                  <small className="text-muted">
                    Review payment screenshot before approval
                  </small>
                </div>

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={loadPayments}
                  disabled={loading || actionLoading}
                >
                  {loading ? "Loading..." : "Refresh"}
                </button>
              </div>

              {/* =================================================
                                LOADING
                            ================================================= */}

              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status" />

                  <p className="text-muted mt-3 mb-0">Loading payments...</p>
                </div>
              )}

              {/* =================================================
                                EMPTY
                            ================================================= */}

              {!loading && payments.length === 0 && (
                <div className="text-center py-5">
                  <h5 className="fw-bold">No Pending Payments</h5>

                  <p className="text-muted mb-0">
                    There are currently no payments waiting for verification.
                  </p>
                </div>
              )}

              {/* =================================================
                                TABLE
                            ================================================= */}

              {!loading && payments.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>

                        <th>Seller</th>

                        <th>Subscription</th>

                        <th>Amount</th>

                        <th>Screenshot</th>

                        <th>Submitted</th>

                        <th>Status</th>

                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {payments.map((payment, index) => (
                        <tr key={payment.id}>
                          {/* NUMBER */}

                          <td>{index + 1}</td>

                          {/* SELLER */}

                          <td>
                            <div className="fw-semibold">
                              Seller #{payment.sellerId}
                            </div>

                            <small className="text-muted">
                              Seller ID: {payment.sellerId}
                            </small>
                          </td>

                          {/* PLAN */}

                          <td>
                            <div className="fw-semibold">
                              {payment.planName || "-"}
                            </div>

                            <small className="text-muted">
                              {payment.durationMonths
                                ? `${payment.durationMonths} Months`
                                : "-"}
                            </small>
                          </td>

                          {/* AMOUNT */}

                          <td>
                            <span className="fw-bold">
                              ₹{payment.amount != null ? payment.amount : "-"}
                            </span>
                          </td>

                          {/* SCREENSHOT */}

                          <td>
                            {payment.paymentScreenshot ? (
                              <a
                                href={getScreenshotUrl(
                                  payment.paymentScreenshot,
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-secondary"
                              >
                                View Screenshot
                              </a>
                            ) : (
                              <span className="text-muted">Not Available</span>
                            )}
                          </td>

                          {/* DATE */}

                          <td>
                            <small>{formatDate(payment.createdAt)}</small>
                          </td>

                          {/* STATUS */}

                          <td>
                            <span className="badge bg-warning text-dark">
                              {payment.paymentStatus || "PENDING"}
                            </span>
                          </td>

                          {/* ACTION */}

                          <td>
                            <div
                              className="d-flex gap-2"
                              style={{
                                minWidth: "180px",
                              }}
                            >
                              <button
                                type="button"
                                className="btn btn-sm btn-success"
                                onClick={() => handleApprove(payment.id)}
                                disabled={actionLoading}
                              >
                                Approve
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => handleReject(payment.id)}
                                disabled={actionLoading}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPayments;
