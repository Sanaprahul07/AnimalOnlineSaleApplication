import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";
import { apiUrl } from "../../config/api";

function ManageSeller() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getPaymentScreenshotUrl = (paymentScreenshot) => {
    if (!paymentScreenshot) return null;

    if (
      paymentScreenshot.startsWith("http://") ||
      paymentScreenshot.startsWith("https://")
    ) {
      return paymentScreenshot;
    }

    const cleanPath = paymentScreenshot.startsWith("/")
      ? paymentScreenshot
      : `/${paymentScreenshot}`;

    return apiUrl(cleanPath);
  };

  const loadSellers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await AdminService.getAllSellers();
      const sellerList = Array.isArray(response.data) ? response.data : [];

      const sellersWithPayment = await Promise.all(
        sellerList.map(async (seller) => {
          try {
            const paymentResponse = await AdminService.getSellerLatestPayment(
              seller.id,
            );

            return {
              ...seller,
              latestPayment: paymentResponse.data || null,
            };
          } catch {
            return {
              ...seller,
              latestPayment: null,
            };
          }
        }),
      );

      setSellers(sellersWithPayment);
    } catch (error) {
      console.error("Error loading sellers:", error);
      setError("Unable to load sellers. Please check the backend server.");
      setSellers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSellers();
  }, []);

  const filteredSellers = sellers.filter((seller) => {
    const searchValue = search.toLowerCase().trim();

    const sellerName = (seller.sellerName || "").toLowerCase();
    const email = (seller.email || "").toLowerCase();
    const mobile = String(seller.mobile || "");
    const pincode = String(seller.pincode || "");
    const status = seller.approvalStatus || seller.status || "PENDING";

    const matchesSearch =
      sellerName.includes(searchValue) ||
      email.includes(searchValue) ||
      mobile.includes(searchValue) ||
      pincode.includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      status.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    const currentStatus = (status || "PENDING").toUpperCase();

    if (currentStatus === "APPROVED") return "badge bg-success";
    if (currentStatus === "REJECTED") return "badge bg-danger";

    return "badge bg-warning text-dark";
  };

  const getSubscriptionStatusClass = (status) => {
    const currentStatus = (status || "").toUpperCase();

    if (currentStatus === "ACTIVE") return "badge bg-success";
    if (currentStatus === "PENDING") return "badge bg-warning text-dark";
    if (currentStatus === "EXPIRED") return "badge bg-danger";

    return "badge bg-secondary";
  };

  const handleViewSeller = (id) => {
    navigate(`/admin/sellers/${id}`);
  };

  return (
    <>
      <style>{`
        .manage-seller-page,
        .manage-seller-page * {
          box-sizing: border-box;
        }

        .manage-seller-page {
          display: flex;
          width: 100%;
          min-height: 100vh;
          background: #f7f8fc;
        }

        .manage-seller-main {
          flex: 1 1 0;
          width: calc(100% - 250px);
          min-width: 0;
          margin-left: 250px;
        }

        .manage-seller-header {
          min-height: 70px;
          padding: 14px 24px;
          gap: 12px;
        }

        .manage-seller-content {
          min-width: 0;
          padding: 24px;
        }

        .manage-seller-title-row {
          gap: 12px;
          flex-wrap: wrap;
        }

        .manage-seller-table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .manage-seller-table {
          min-width: 1450px;
          table-layout: fixed;
        }

        .manage-seller-table th,
        .manage-seller-table td {
          overflow-wrap: anywhere;
        }

        .manage-seller-mobile-list {
          display: none;
        }

        .manage-seller-card {
          min-width: 0;
          padding: 16px;
          border: 1px solid #e5eaf1;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(20, 35, 60, .05);
        }

        .manage-seller-card-heading {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          min-width: 0;
          padding-bottom: 12px;
          border-bottom: 1px solid #edf0f4;
        }

        .manage-seller-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #e8f5e9;
          font-size: 21px;
        }

        .manage-seller-card-name {
          min-width: 0;
          flex: 1;
          color: #202b45;
          font-weight: 700;
          overflow-wrap: anywhere;
        }

        .manage-seller-card-detail {
          display: grid;
          grid-template-columns: 100px minmax(0, 1fr);
          gap: 8px;
          padding-top: 11px;
          font-size: 13px;
        }

        .manage-seller-card-label {
          color: #64748b;
        }

        .manage-seller-card-value {
          min-width: 0;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .manage-seller-payment-image {
          display: block;
          width: 80px;
          height: 80px;
          max-width: 100%;
          object-fit: contain;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          background: #f8f9fa;
          cursor: pointer;
        }

        @media (max-width: 767.98px) {
          .manage-seller-page {
            display: block;
            width: 100%;
            min-width: 0;
            overflow-x: clip;
          }

          .manage-seller-main {
            display: block;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            margin-left: 0 !important;
          }

          .manage-seller-header {
            display: flex;
            align-items: flex-start !important;
            flex-direction: column;
            width: 100%;
            min-height: 0;
            padding: 76px 14px 14px !important;
          }

          .manage-seller-header h5 {
            font-size: 19px;
          }

          .manage-seller-header small {
            font-size: 12px;
          }

          .manage-seller-header button {
            width: 100%;
          }

          .manage-seller-content {
            width: 100%;
            min-width: 0;
            padding: 12px !important;
          }

          .manage-seller-title-row {
            align-items: flex-start !important;
            flex-direction: column;
            margin-bottom: 16px !important;
          }

          .manage-seller-title-row h2 {
            font-size: 22px;
          }

          .manage-seller-filter-card .card-body {
            padding: 14px;
          }

          .manage-seller-filter-card .row > div {
            width: 100%;
          }

          .manage-seller-filter-card input,
          .manage-seller-filter-card select,
          .manage-seller-filter-card button {
            min-height: 42px;
            font-size: 14px;
          }

          .manage-seller-table-wrap {
            display: none;
          }

          .manage-seller-mobile-list {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 12px;
            width: 100%;
            min-width: 0;
          }

          .manage-seller-card {
            width: 100%;
            padding: 14px;
          }

          .manage-seller-card-detail {
            grid-template-columns: 84px minmax(0, 1fr);
          }

          .manage-seller-card button {
            min-height: 40px;
          }

          .manage-seller-content .alert {
            overflow-wrap: anywhere;
            word-break: break-word;
          }
        }
      `}</style>

      <div className="manage-seller-page">
        <AdminSidebar />

        <main className="manage-seller-main">
          <header className="manage-seller-header bg-white border-bottom d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold mb-1">Seller Management</h5>
              <small className="text-muted">
                View and manage registered sellers
              </small>
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/admin/dashboard")}
            >
              ← Dashboard
            </button>
          </header>

          <section className="manage-seller-content">
            <div className="manage-seller-title-row d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold mb-1">All Sellers</h2>
                <p className="text-muted mb-0">
                  Sellers registered in the application.
                </p>
              </div>

              <div className="text-muted">
                Total: <strong>{sellers.length}</strong>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
                <button
                  type="button"
                  className="btn btn-sm btn-danger ms-3"
                  onClick={loadSellers}
                >
                  Retry
                </button>
              </div>
            )}

            {loading ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                  />
                  <div className="text-muted">Loading sellers...</div>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="card manage-seller-filter-card border-0 shadow-sm mb-4"
                  style={{ borderRadius: 14 }}
                >
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-lg-7">
                        <label className="form-label fw-semibold">
                          Search Seller
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search by name, email, mobile or pincode..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>

                      <div className="col-lg-3">
                        <label className="form-label fw-semibold">
                          Approval Status
                        </label>
                        <select
                          className="form-select"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="All">All</option>
                          <option value="PENDING">Pending</option>
                          <option value="APPROVED">Approved</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                      </div>

                      <div className="col-lg-2 d-flex align-items-end">
                        <button
                          type="button"
                          className="btn btn-secondary w-100"
                          onClick={() => {
                            setSearch("");
                            setStatusFilter("All");
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="card border-0 shadow-sm"
                  style={{ borderRadius: 14 }}
                >
                  <div className="card-body p-0">
                    {filteredSellers.length === 0 ? (
                      <div className="p-4 text-center text-muted">
                        {sellers.length === 0
                          ? "No sellers available in database."
                          : "No sellers found for the selected search/filter."}
                      </div>
                    ) : (
                      <>
                        {/* Desktop table */}
                        <div className="manage-seller-table-wrap">
                          <table className="table table-hover align-middle mb-0 manage-seller-table">
                            <colgroup>
                              <col style={{ width: 55 }} />
                              <col style={{ width: 190 }} />
                              <col style={{ width: 245 }} />
                              <col style={{ width: 135 }} />
                              <col style={{ width: 110 }} />
                              <col style={{ width: 140 }} />
                              <col style={{ width: 180 }} />
                              <col style={{ width: 200 }} />
                              <col style={{ width: 160 }} />
                              <col style={{ width: 140 }} />
                            </colgroup>

                            <thead>
                              <tr>
                                {[
                                  "#",
                                  "Seller",
                                  "Email",
                                  "Mobile",
                                  "Pincode",
                                  "Plan",
                                  "Subscription",
                                  "Payment",
                                  "Approval Status",
                                  "Action",
                                ].map((heading) => (
                                  <th
                                    key={heading}
                                    className="px-3 py-3"
                                    style={{
                                      backgroundColor: "#0d6efd",
                                      color: "#fff",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {heading}
                                  </th>
                                ))}
                              </tr>
                            </thead>

                            <tbody>
                              {filteredSellers.map((seller, index) => {
                                const status =
                                  seller.approvalStatus ||
                                  seller.status ||
                                  "PENDING";
                                const payment = seller.latestPayment;
                                const screenshot = getPaymentScreenshotUrl(
                                  payment?.paymentScreenshot,
                                );

                                return (
                                  <tr key={seller.id} style={{ height: 88 }}>
                                    <td className="px-3">{index + 1}</td>

                                    <td>
                                      <div className="d-flex align-items-center gap-3">
                                        <div
                                          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                          style={{
                                            width: 44,
                                            height: 44,
                                            backgroundColor: "#e8f5e9",
                                          }}
                                        >
                                          👨‍🌾
                                        </div>
                                        <div>
                                          <div className="fw-semibold">
                                            {seller.sellerName || "N/A"}
                                          </div>
                                          <small className="text-muted">
                                            ID: {seller.id}
                                          </small>
                                        </div>
                                      </div>
                                    </td>

                                    <td>{seller.email || "N/A"}</td>
                                    <td>{seller.mobile || "N/A"}</td>
                                    <td>{seller.pincode || "N/A"}</td>

                                    <td>
                                      {payment?.planName || "Not selected"}
                                      {payment?.amount != null && (
                                        <div className="small text-muted">
                                          ₹{payment.amount}
                                        </div>
                                      )}
                                    </td>

                                    <td>
                                      {payment?.subscriptionStatus ? (
                                        <>
                                          <span
                                            className={getSubscriptionStatusClass(
                                              payment.subscriptionStatus,
                                            )}
                                          >
                                            {payment.subscriptionStatus}
                                          </span>
                                          {payment.subscriptionStartDate && (
                                            <div className="small text-muted mt-2">
                                              {payment.subscriptionStartDate}
                                            </div>
                                          )}
                                        </>
                                      ) : (
                                        "Not available"
                                      )}
                                    </td>

                                    <td>
                                      {screenshot ? (
                                        <img
                                          src={screenshot}
                                          alt="Payment Screenshot"
                                          className="manage-seller-payment-image"
                                          onClick={() =>
                                            window.open(
                                              screenshot,
                                              "_blank",
                                              "noopener,noreferrer",
                                            )
                                          }
                                        />
                                      ) : (
                                        <span className="text-muted">
                                          No Screenshot
                                        </span>
                                      )}
                                    </td>

                                    <td>
                                      <span className={getStatusClass(status)}>
                                        {status}
                                      </span>
                                    </td>

                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() =>
                                          handleViewSeller(seller.id)
                                        }
                                      >
                                        View Seller
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile seller cards */}
                        <div className="manage-seller-mobile-list p-3">
                          {filteredSellers.map((seller, index) => {
                            const status =
                              seller.approvalStatus ||
                              seller.status ||
                              "PENDING";
                            const payment = seller.latestPayment;
                            const screenshot = getPaymentScreenshotUrl(
                              payment?.paymentScreenshot,
                            );

                            return (
                              <article
                                className="manage-seller-card"
                                key={seller.id}
                              >
                                <div className="manage-seller-card-heading">
                                  <div className="manage-seller-avatar">👨‍🌾</div>
                                  <div className="manage-seller-card-name">
                                    {seller.sellerName || "N/A"}
                                    <div className="small text-muted fw-normal mt-1">
                                      Seller ID: {seller.id ?? "-"}
                                    </div>
                                  </div>
                                  <span className={getStatusClass(status)}>
                                    {status}
                                  </span>
                                </div>

                                <div className="manage-seller-card-detail">
                                  <span className="manage-seller-card-label">
                                    Email
                                  </span>
                                  <span className="manage-seller-card-value">
                                    {seller.email || "N/A"}
                                  </span>
                                </div>

                                <div className="manage-seller-card-detail">
                                  <span className="manage-seller-card-label">
                                    Mobile
                                  </span>
                                  <span className="manage-seller-card-value">
                                    {seller.mobile || "N/A"}
                                  </span>
                                </div>

                                <div className="manage-seller-card-detail">
                                  <span className="manage-seller-card-label">
                                    Pincode
                                  </span>
                                  <span className="manage-seller-card-value">
                                    {seller.pincode || "N/A"}
                                  </span>
                                </div>

                                <div className="manage-seller-card-detail">
                                  <span className="manage-seller-card-label">
                                    Plan
                                  </span>
                                  <span className="manage-seller-card-value">
                                    {payment?.planName || "Not selected"}
                                    {payment?.amount != null && (
                                      <div className="text-muted mt-1">
                                        ₹{payment.amount}
                                      </div>
                                    )}
                                  </span>
                                </div>

                                <div className="manage-seller-card-detail">
                                  <span className="manage-seller-card-label">
                                    Subscription
                                  </span>
                                  <span className="manage-seller-card-value">
                                    {payment?.subscriptionStatus ? (
                                      <>
                                        <span
                                          className={getSubscriptionStatusClass(
                                            payment.subscriptionStatus,
                                          )}
                                        >
                                          {payment.subscriptionStatus}
                                        </span>
                                        {payment.subscriptionStartDate && (
                                          <div className="small text-muted mt-1">
                                            {payment.subscriptionStartDate}
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      "Not available"
                                    )}
                                  </span>
                                </div>

                                <div className="manage-seller-card-detail">
                                  <span className="manage-seller-card-label">
                                    Payment
                                  </span>
                                  <span className="manage-seller-card-value">
                                    {screenshot ? (
                                      <img
                                        src={screenshot}
                                        alt="Payment Screenshot"
                                        className="manage-seller-payment-image"
                                        onClick={() =>
                                          window.open(
                                            screenshot,
                                            "_blank",
                                            "noopener,noreferrer",
                                          )
                                        }
                                      />
                                    ) : (
                                      "No Screenshot"
                                    )}
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  className="btn btn-outline-primary w-100 mt-3"
                                  onClick={() => handleViewSeller(seller.id)}
                                >
                                  View Seller
                                </button>
                              </article>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default ManageSeller;
