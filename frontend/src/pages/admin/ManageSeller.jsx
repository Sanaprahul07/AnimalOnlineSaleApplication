import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

function ManageSeller() {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // PAYMENT SCREENSHOT URL
  // =====================================================

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

  // =====================================================
  // LOAD ALL SELLERS FROM DATABASE
  // =====================================================

  const loadSellers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await AdminService.getAllSellers();

      const sellerList = response.data || [];

      console.log("ALL SELLERS FROM DATABASE:", sellerList);

      // =================================================
      // LOAD LATEST PAYMENT FOR EACH SELLER
      // =================================================

      const sellersWithPayment = await Promise.all(
        sellerList.map(async (seller) => {
          try {
            const paymentResponse = await AdminService.getSellerLatestPayment(
              seller.id,
            );

            const payment = paymentResponse.data || null;

            return {
              ...seller,
              latestPayment: payment,
            };
          } catch {
            console.log(`No payment found for seller ${seller.id}`);

            return {
              ...seller,
              latestPayment: null,
            };
          }
        }),
      );

      console.log("SELLERS WITH PAYMENT DATA:", sellersWithPayment);

      setSellers(sellersWithPayment);
    } catch (error) {
      console.error("Error loading sellers:", error);

      setError("Unable to load sellers. Please check the backend server.");

      setSellers([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD SELLERS WHEN PAGE OPENS
  // =====================================================

  useEffect(() => {
    loadSellers();
  }, []);

  // =====================================================
  // SEARCH + STATUS FILTER
  // =====================================================

  const filteredSellers = sellers.filter((seller) => {
    const searchValue = search.toLowerCase().trim();

    const sellerName = seller.sellerName ? seller.sellerName.toLowerCase() : "";

    const email = seller.email ? seller.email.toLowerCase() : "";

    const mobile = seller.mobile ? String(seller.mobile) : "";

    const pincode = seller.pincode ? String(seller.pincode) : "";

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

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const getStatusClass = (status) => {
    const currentStatus = status ? status.toUpperCase() : "PENDING";

    if (currentStatus === "APPROVED") {
      return "badge bg-success";
    }

    if (currentStatus === "REJECTED") {
      return "badge bg-danger";
    }

    return "badge bg-warning text-dark";
  };

  // =====================================================
  // SUBSCRIPTION STATUS BADGE
  // =====================================================

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

  // =====================================================
  // VIEW PARTICULAR SELLER
  // =====================================================

  const handleViewSeller = (id) => {
    navigate(`/admin/sellers/${id}`);
  };

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

            <div className="text-muted">Loading sellers...</div>
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
            <h5 className="fw-bold mb-0">Seller Management</h5>

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
              <h2 className="fw-bold mb-1">All Sellers</h2>

              <p className="text-muted mb-0">
                Sellers registered in the application.
              </p>
            </div>

            <div className="text-muted">
              Total: <strong>{sellers.length}</strong>
            </div>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

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

                {/* STATUS */}

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

                {/* RESET */}

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

          {/* =================================================
              SELLER TABLE
          ================================================= */}

          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: "14px",
            }}
          >
            <div className="card-body p-0">
              {/* =================================================
                  TABLE SCROLL AREA
              ================================================= */}

              <div
                className="table-responsive"
                style={{
                  overflowX: "auto",
                }}
              >
                <table
                  className="table table-hover align-middle mb-0"
                  style={{
                    minWidth: "1450px",
                    tableLayout: "fixed",
                  }}
                >
                  {/* =================================================
                      FIXED COLUMN WIDTHS
                  ================================================= */}

                  <colgroup>
                    <col
                      style={{
                        width: "55px",
                      }}
                    />

                    <col
                      style={{
                        width: "190px",
                      }}
                    />

                    <col
                      style={{
                        width: "245px",
                      }}
                    />

                    <col
                      style={{
                        width: "135px",
                      }}
                    />

                    <col
                      style={{
                        width: "110px",
                      }}
                    />

                    <col
                      style={{
                        width: "140px",
                      }}
                    />

                    <col
                      style={{
                        width: "180px",
                      }}
                    />

                    <col
                      style={{
                        width: "200px",
                      }}
                    />

                    <col
                      style={{
                        width: "160px",
                      }}
                    />

                    <col
                      style={{
                        width: "140px",
                      }}
                    />
                  </colgroup>

                  {/* =================================================
                      TABLE HEADER
                  ================================================= */}

                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#0d6efd",
                        color: "#ffffff",
                      }}
                    >
                      <th
                        className="px-3 py-3"
                        style={{
                          backgroundColor: "#0d6efd",
                          color: "#ffffff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        #
                      </th>

                      <th
                        className="py-3"
                        style={{
                          backgroundColor: "#0d6efd",
                          color: "#ffffff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Seller
                      </th>

                      <th
                        className="py-3"
                        style={{
                          backgroundColor: "#0d6efd",
                          color: "#ffffff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Email
                      </th>

                      <th
                        className="py-3"
                        style={{
                          backgroundColor: "#0d6efd",
                          color: "#ffffff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Mobile
                      </th>

                      <th
                        className="py-3"
                        style={{
                          backgroundColor: "#0d6efd",
                          color: "#ffffff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Pincode
                      </th>

                      <th
                        className="py-3"
                        style={{
                          backgroundColor: "#0d6efd",
                          color: "#ffffff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Plan
                      </th>

                      <th
                        className="py-3"
                        style={{
                          backgroundColor: "#0d6efd",
                          color: "#ffffff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Subscription
                      </th>

                      <th
                        className="py-3"
                        style={{
                          backgroundColor: "#0d6efd",
                          color: "#ffffff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Payment
                      </th>

                      <th
                        className="py-3"
                        style={{
                          backgroundColor: "#0d6efd",
                          color: "#ffffff",
                          whiteSpace: "normal",
                        }}
                      >
                        Approval Status
                      </th>

                      <th
                        className="py-3 px-3"
                        style={{
                          backgroundColor: "#0d6efd",
                          color: "#ffffff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  {/* =================================================
                      TABLE BODY
                  ================================================= */}

                  <tbody>
                    {/* =================================================
                        NO SELLER
                    ================================================= */}

                    {filteredSellers.length === 0 ? (
                      <tr>
                        <td
                          colSpan="10"
                          className="text-center py-5 text-muted"
                        >
                          {sellers.length === 0
                            ? "No sellers available in database."
                            : "No sellers found for the selected search/filter."}
                        </td>
                      </tr>
                    ) : (
                      filteredSellers.map((seller, index) => {
                        const status =
                          seller.approvalStatus || seller.status || "PENDING";

                        const payment = seller.latestPayment;

                        const paymentScreenshot = payment
                          ? getPaymentScreenshotUrl(payment.paymentScreenshot)
                          : null;

                        return (
                          <tr
                            key={seller.id}
                            style={{
                              height: "88px",
                            }}
                          >
                            {/* NUMBER */}

                            <td
                              className="px-3"
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {index + 1}
                            </td>

                            {/* SELLER */}

                            <td>
                              <div
                                className="d-flex align-items-center gap-3"
                                style={{
                                  minWidth: "170px",
                                }}
                              >
                                <div
                                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                  style={{
                                    width: "44px",
                                    height: "44px",
                                    backgroundColor: "#e8f5e9",
                                  }}
                                >
                                  👨‍🌾
                                </div>

                                <div
                                  style={{
                                    minWidth: "0",
                                  }}
                                >
                                  <div
                                    className="fw-semibold"
                                    style={{
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {seller.sellerName || "N/A"}
                                  </div>

                                  <small className="text-muted">
                                    ID: {seller.id}
                                  </small>
                                </div>
                              </div>
                            </td>

                            {/* EMAIL */}

                            <td
                              style={{
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {seller.email || "N/A"}
                            </td>

                            {/* MOBILE */}

                            <td
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {seller.mobile || "N/A"}
                            </td>

                            {/* PINCODE */}

                            <td
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {seller.pincode || "N/A"}
                            </td>

                            {/* PLAN */}

                            <td>
                              {payment?.planName ? (
                                <div>
                                  <div
                                    className="fw-semibold"
                                    style={{
                                      whiteSpace: "normal",
                                    }}
                                  >
                                    {payment.planName}
                                  </div>

                                  {payment.amount != null && (
                                    <small className="text-muted">
                                      ₹{payment.amount}
                                    </small>
                                  )}
                                </div>
                              ) : (
                                <span className="text-muted">Not selected</span>
                              )}
                            </td>

                            {/* SUBSCRIPTION */}

                            <td>
                              {payment?.subscriptionStatus ? (
                                <div>
                                  <span
                                    className={getSubscriptionStatusClass(
                                      payment.subscriptionStatus,
                                    )}
                                    style={{
                                      display: "inline-block",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {payment.subscriptionStatus}
                                  </span>

                                  {payment.subscriptionStartDate && (
                                    <div className="small text-muted mt-2">
                                      {payment.subscriptionStartDate}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-muted">
                                  Not available
                                </span>
                              )}
                            </td>

                            {/* =================================================
                                  PAYMENT
                                  ONLY PAYMENT SCREENSHOT
                              ================================================= */}

                            <td>
                              {payment ? (
                                paymentScreenshot ? (
                                  <img
                                    src={paymentScreenshot}
                                    alt="Payment Screenshot"
                                    title="View Payment Screenshot"
                                    onClick={() =>
                                      window.open(paymentScreenshot, "_blank")
                                    }
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      objectFit: "contain",
                                      borderRadius: "10px",
                                      border: "1px solid #dee2e6",
                                      cursor: "pointer",
                                      backgroundColor: "#f8f9fa",
                                      display: "block",
                                    }}
                                  />
                                ) : (
                                  <span className="text-muted">
                                    No Screenshot
                                  </span>
                                )
                              ) : (
                                <span className="text-muted">
                                  No Screenshot
                                </span>
                              )}
                            </td>

                            {/* APPROVAL STATUS */}

                            <td>
                              <span
                                className={getStatusClass(status)}
                                style={{
                                  display: "inline-block",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {status}
                              </span>
                            </td>

                            {/* ACTION */}

                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleViewSeller(seller.id)}
                                style={{
                                  whiteSpace: "nowrap",
                                }}
                              >
                                View Seller
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageSeller;
