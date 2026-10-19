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

  const [paymentSummary, setPaymentSummary] = useState({
    plans: [],
    totalApprovedSellers: 0,
    totalApprovedAmount: 0,
    totalApprovedPayments: 0,
  });

  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");

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

  useEffect(() => {
    loadPayments();
  }, []);

  useEffect(() => {
    loadPaymentSummary();
  }, []);

  const handleApprove = async (paymentId) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this payment?",
    );

    if (!confirmApprove) return;

    try {
      setActionLoading(true);
      setError("");
      setMessage("");

      await AdminService.approveSellerPayment(paymentId);

      setMessage("Payment approved successfully.");
      await loadPaymentSummary();

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

  const handleReject = async (paymentId) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this payment?",
    );

    if (!confirmReject) return;

    try {
      setActionLoading(true);
      setError("");
      setMessage("");

      await AdminService.rejectSellerPayment(paymentId);

      setMessage("Payment rejected successfully.");
      await loadPaymentSummary();

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

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };

  const formatCurrency = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });
  };

  const getScreenshotUrl = (path) => {
    if (!path) return "";

    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }

    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return apiUrl(cleanPath);
  };

  return (
    <>
      <style>{`
        .admin-payments-main {
          margin-left: 250px;
          width: calc(100% - 250px);
          min-width: 0;
        }

        .admin-payments-header {
          min-width: 0;
        }

        .admin-payments-content {
          min-width: 0;
          padding: 24px;
        }

        .admin-payments-card {
          min-width: 0;
          overflow: hidden;
          border-radius: 10px;
        }

        .admin-payments-card .card-body {
          min-width: 0;
        }

        .admin-payments-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .admin-payments-section-header > div {
          min-width: 0;
        }

        .admin-payments-table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .admin-payments-table {
          min-width: 760px;
          margin-bottom: 0;
        }

        .admin-payments-summary-table {
          min-width: 560px;
        }

        .admin-payments-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 180px;
        }

        .admin-payments-actions .btn {
          white-space: nowrap;
        }

        .admin-payments-alert {
          overflow-wrap: anywhere;
        }

        @media (max-width: 767.98px) {
          .admin-payments-main {
            margin-left: 0 !important;
            width: 100% !important;
            max-width: 100%;
          }

          .admin-payments-header {
            padding: 16px !important;
          }

          .admin-payments-header h3 {
            font-size: 22px;
          }

          .admin-payments-content {
            padding: 12px !important;
          }

          .admin-payments-content .row {
            --bs-gutter-x: 12px;
            --bs-gutter-y: 12px;
          }

          .admin-payments-card {
            border-radius: 8px;
          }

          .admin-payments-card .card-body {
            padding: 14px;
          }

          .admin-payments-section-header {
            align-items: stretch;
            flex-direction: column;
            gap: 12px;
          }

          .admin-payments-section-header h5 {
            font-size: 17px;
            overflow-wrap: anywhere;
          }

          .admin-payments-section-header small {
            font-size: 12px;
          }

          .admin-payments-section-header > .btn,
          .admin-payments-section-header button {
            width: 100%;
            white-space: normal;
          }

          .admin-payments-content .card-body h3 {
            font-size: 23px;
            overflow-wrap: anywhere;
          }

          .admin-payments-content .card-body h6 {
            font-size: 14px;
          }

          .admin-payments-table-wrap {
            margin-right: -2px;
          }

          .admin-payments-table th,
          .admin-payments-table td {
            padding: 10px 12px;
            font-size: 13px;
            vertical-align: middle;
          }

          .admin-payments-actions {
            min-width: 170px;
          }

          .admin-payments-actions .btn {
            flex: 1;
            padding: 6px 9px;
            font-size: 12px;
          }

          .admin-payments-content .alert {
            padding: 12px;
            font-size: 13px;
          }

          .admin-payments-content .spinner-border {
            width: 2rem;
            height: 2rem;
          }
        }

        @media (max-width: 380px) {
          .admin-payments-content {
            padding: 9px !important;
          }

          .admin-payments-card .card-body {
            padding: 11px;
          }

          .admin-payments-header h3 {
            font-size: 20px;
          }
        }
      `}</style>

      <div
        className="d-flex"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f7f8fc",
        }}
      >
        <AdminSidebar />

        <div className="admin-payments-main">
          {/* HEADER */}
          <div className="admin-payments-header bg-white border-bottom px-4 py-3">
            <h3 className="fw-bold mb-1">Payments</h3>
            <small className="text-muted">
              Verify seller subscription payments
            </small>
          </div>

          {/* CONTENT */}
          <div className="admin-payments-content">
            {message && (
              <div
                className="alert alert-success admin-payments-alert"
                role="alert"
              >
                {message}
              </div>
            )}

            {error && (
              <div
                className="alert alert-danger admin-payments-alert"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* PENDING PAYMENT SUMMARY */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <small className="text-muted">Pending Payments</small>
                    <h3 className="fw-bold mb-0">{payments.length}</h3>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <small className="text-muted">Awaiting Verification</small>
                    <h3 className="fw-bold mb-0">{payments.length}</h3>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <small className="text-muted">Payment Verification</small>
                    <h6 className="fw-bold mb-0 mt-1">Admin Review Required</h6>
                  </div>
                </div>
              </div>
            </div>

            {/* APPROVED PAYMENT SUMMARY */}
            <div className="card border-0 shadow-sm mb-4 admin-payments-card">
              <div className="card-body">
                <div className="admin-payments-section-header">
                  <div>
                    <h5 className="fw-bold mb-1">
                      Subscription Payment Summary
                    </h5>
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

                {summaryError && (
                  <div
                    className="alert alert-warning admin-payments-alert"
                    role="alert"
                  >
                    {summaryError}
                  </div>
                )}

                {/* TOTAL APPROVED SUMMARY CARDS */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-4">
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

                  <div className="col-12 col-md-4">
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

                  <div className="col-12 col-md-4">
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

                {/* PLAN-WISE BREAKDOWN */}
                <h6 className="fw-bold mb-3">Plan-wise Breakdown</h6>

                <div className="admin-payments-table-wrap">
                  <table className="table table-hover align-middle admin-payments-table admin-payments-summary-table">
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
                                {plan.sellerCount != null
                                  ? plan.sellerCount
                                  : 0}
                              </span>
                            </td>

                            <td className="fw-bold text-success">
                              {formatCurrency(plan.totalAmount)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center py-4 text-muted"
                          >
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

            {/* PENDING SUBSCRIPTION PAYMENTS */}
            <div className="card border-0 shadow-sm admin-payments-card">
              <div className="card-body">
                <div className="admin-payments-section-header">
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

                {/* LOADING */}
                {loading && (
                  <div className="text-center py-5">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    />
                    <p className="text-muted mt-3 mb-0">Loading payments...</p>
                  </div>
                )}

                {/* EMPTY */}
                {!loading && payments.length === 0 && (
                  <div className="text-center py-5">
                    <h5 className="fw-bold">No Pending Payments</h5>
                    <p className="text-muted mb-0">
                      There are currently no payments waiting for verification.
                    </p>
                  </div>
                )}

                {/* PAYMENTS TABLE */}
                {!loading && payments.length > 0 && (
                  <div className="admin-payments-table-wrap">
                    <table className="table table-hover align-middle admin-payments-table">
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
                            <td>{index + 1}</td>

                            <td>
                              <div className="fw-semibold">
                                Seller #{payment.sellerId}
                              </div>
                              <small className="text-muted">
                                Seller ID: {payment.sellerId}
                              </small>
                            </td>

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

                            <td>
                              <span className="fw-bold">
                                ₹{payment.amount != null ? payment.amount : "-"}
                              </span>
                            </td>

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
                                <span className="text-muted">
                                  Not Available
                                </span>
                              )}
                            </td>

                            <td>
                              <small>{formatDate(payment.createdAt)}</small>
                            </td>

                            <td>
                              <span className="badge bg-warning text-dark">
                                {payment.paymentStatus || "PENDING"}
                              </span>
                            </td>

                            <td>
                              <div className="admin-payments-actions">
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
    </>
  );
}

export default AdminPayments;
