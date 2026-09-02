import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

function AdminDashboard() {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [dashboard, setDashboard] = useState(null);
  const [sellers, setSellers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // LOAD ADMIN DATA
  // =====================================================

  const loadAdminData = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      // Dashboard data
      const dashboardResponse = await AdminService.getDashboard();

      // Seller data
      const sellersResponse = await AdminService.getAllSellers();

      console.log("Admin Dashboard Data:", dashboardResponse.data);

      console.log("Admin Sellers:", sellersResponse.data);

      // Save dashboard data
      setDashboard(dashboardResponse.data);

      // Save sellers
      const sellerData = sellersResponse.data;

      if (Array.isArray(sellerData)) {
        setSellers(sellerData);
      } else if (sellerData && Array.isArray(sellerData.data)) {
        setSellers(sellerData.data);
      } else if (sellerData && Array.isArray(sellerData.content)) {
        setSellers(sellerData.content);
      } else {
        setSellers([]);
      }
    } catch (error) {
      console.error("Admin Dashboard Loading Error:", error);

      setErrorMessage(
        error.response?.data?.message || "Unable to load admin dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // LOAD DATA WHEN DASHBOARD OPENS
  // =====================================================

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  // =====================================================
  // REFRESH DASHBOARD
  // =====================================================

  const handleRefresh = () => {
    loadAdminData();
  };

  // =====================================================
  // GET SELLER ID
  // =====================================================

  const getSellerId = (seller) => {
    return seller.sellerId || seller.id || seller.sellerID;
  };

  // =====================================================
  // GET SELLER NAME
  // =====================================================

  const getSellerName = (seller) => {
    return (
      seller.sellerName ||
      seller.name ||
      seller.ownerName ||
      seller.farmerName ||
      "Seller"
    );
  };

  // =====================================================
  // GET SELLER EMAIL
  // =====================================================

  const getSellerEmail = (seller) => {
    return seller.email || seller.sellerEmail || "Email not available";
  };

  // =====================================================
  // GET SELLER STATUS
  // =====================================================

  const getSellerStatus = (seller) => {
    return seller.approvalStatus || seller.status || "PENDING";
  };

  // =====================================================
  // GET STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    const value = status?.toString().toUpperCase();

    if (value === "APPROVED") {
      return "badge bg-success";
    }

    if (value === "REJECTED") {
      return "badge bg-danger";
    }

    return "badge bg-warning text-dark";
  };

  // =====================================================
  // OPEN SELLER
  // =====================================================

  const handleViewSeller = (seller) => {
    const sellerId = getSellerId(seller);

    if (!sellerId) {
      console.error("Seller ID not found:", seller);

      return;
    }

    navigate(`/admin/sellers/${sellerId}`);
  };

  // =====================================================
  // DASHBOARD
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
                MAIN CONTENT
            ===================================================== */}

      <div
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          minHeight: "100vh",
        }}
      >
        {/* =================================================
                    HEADER
                ================================================= */}

        <div
          className="bg-white border-bottom d-flex justify-content-between align-items-center px-4 py-3"
          style={{
            minHeight: "70px",
          }}
        >
          <div>
            <div className="fw-bold fs-5">Welcome, Admin 👋</div>

            <small className="text-muted">
              Manage your AnimalSale platform
            </small>
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* REFRESH BUTTON */}

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading ? "Loading..." : "↻ Refresh"}
            </button>

            <div className="text-end">
              <div className="fw-semibold">Admin</div>

              <small className="text-muted">Administrator</small>
            </div>

            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "42px",
                height: "42px",
                backgroundColor: "#e8f5e9",
              }}
            >
              👤
            </div>
          </div>
        </div>

        {/* =================================================
                    CONTENT
                ================================================= */}

        <div className="p-4">
          {/* =================================================
                        TITLE
                    ================================================= */}

          <div className="mb-4">
            <h2 className="fw-bold mb-1">Admin Dashboard</h2>

            <p className="text-muted mb-0">
              Overview of your AnimalSale platform.
            </p>
          </div>

          {/* =================================================
                        ERROR
                    ================================================= */}

          {errorMessage && (
            <div className="alert alert-danger">
              <strong>Error:</strong> {errorMessage}
              <button
                type="button"
                className="btn btn-sm btn-danger ms-3"
                onClick={handleRefresh}
              >
                Try Again
              </button>
            </div>
          )}

          {/* =================================================
                        SUMMARY CARDS
                    ================================================= */}

          <div className="row g-3 mb-4">
            {/* =================================================
                            TOTAL SELLERS
                        ================================================= */}

            <div className="col-xl-3 col-lg-6 col-md-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "14px",
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <small className="text-muted">Total Sellers</small>

                      <h3 className="fw-bold mt-2 mb-1">
                        {loading
                          ? "..."
                          : (dashboard?.totalSellers ?? sellers.length)}
                      </h3>

                      <small className="text-success">Registered Sellers</small>
                    </div>

                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "#e8f5e9",
                      }}
                    >
                      👨‍🌾
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                            TOTAL BUYERS
                        ================================================= */}

            <div className="col-xl-3 col-lg-6 col-md-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "14px",
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <small className="text-muted">Total Buyers</small>

                      <h3 className="fw-bold mt-2 mb-1">
                        {loading ? "..." : (dashboard?.totalBuyers ?? 0)}
                      </h3>

                      <small className="text-primary">Registered Buyers</small>
                    </div>

                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "#e3f2fd",
                      }}
                    >
                      👤
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                            TOTAL ANIMALS
                        ================================================= */}

            <div className="col-xl-3 col-lg-6 col-md-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "14px",
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <small className="text-muted">Total Animals</small>

                      <h3 className="fw-bold mt-2 mb-1">
                        {loading ? "..." : (dashboard?.totalAnimals ?? 0)}
                      </h3>

                      <small className="text-warning">Animals Listed</small>
                    </div>

                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "#fff8e1",
                      }}
                    >
                      🐄
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                            TOTAL ORDERS
                        ================================================= */}

            <div className="col-xl-3 col-lg-6 col-md-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "14px",
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <small className="text-muted">Total Orders</small>

                      <h3 className="fw-bold mt-2 mb-1">
                        {loading ? "..." : (dashboard?.totalOrders ?? 0)}
                      </h3>

                      <small className="text-info">Platform Orders</small>
                    </div>

                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "#e0f7fa",
                      }}
                    >
                      🛒
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
                        REGISTRATION + SELLER SUMMARY
                    ================================================= */}

          <div className="row g-4 mb-4">
            {/* =================================================
                            REGISTRATION OVERVIEW
                        ================================================= */}

            <div className="col-xl-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "14px",
                }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Registration Overview</h5>

                  <div className="row g-3">
                    {/* PENDING */}

                    <div className="col-md-6">
                      <div
                        className="p-3 rounded"
                        style={{
                          backgroundColor: "#fff8e1",
                        }}
                      >
                        <small className="text-muted">Pending Sellers</small>

                        <h4 className="fw-bold mt-2 mb-0">
                          {loading
                            ? "..."
                            : (dashboard?.pendingSellerApprovals ??
                              sellers.filter(
                                (seller) =>
                                  getSellerStatus(seller)
                                    .toString()
                                    .toUpperCase() === "PENDING",
                              ).length)}
                        </h4>
                      </div>
                    </div>

                    {/* APPROVED */}

                    <div className="col-md-6">
                      <div
                        className="p-3 rounded"
                        style={{
                          backgroundColor: "#e8f5e9",
                        }}
                      >
                        <small className="text-muted">Approved Sellers</small>

                        <h4 className="fw-bold mt-2 mb-0">
                          {loading
                            ? "..."
                            : (dashboard?.approvedSellers ??
                              sellers.filter(
                                (seller) =>
                                  getSellerStatus(seller)
                                    .toString()
                                    .toUpperCase() === "APPROVED",
                              ).length)}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                            SELLER ANIMAL SUMMARY
                        ================================================= */}

            <div className="col-xl-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "14px",
                }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Seller Animal Summary</h5>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Total Sellers</span>

                    <strong>
                      {loading
                        ? "..."
                        : (dashboard?.totalSellers ?? sellers.length)}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Total Animals</span>

                    <strong>
                      {loading ? "..." : (dashboard?.totalAnimals ?? 0)}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-success w-100"
                    onClick={() => navigate("/admin/sellers")}
                  >
                    View Sellers & Animals
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
                        RECENT REGISTRATIONS
                    ================================================= */}

          <div className="row g-4 mb-4">
            <div className="col-xl-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "14px",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Recent Registrations</h5>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success"
                      onClick={() => navigate("/admin/sellers")}
                    >
                      View All
                    </button>
                  </div>

                  <div className="list-group list-group-flush">
                    {/* LOADING */}

                    {loading && (
                      <div className="py-4 text-center text-muted">
                        Loading sellers...
                      </div>
                    )}

                    {/* NO SELLERS */}

                    {!loading && sellers.length === 0 && (
                      <div className="py-4 text-center text-muted">
                        No sellers found.
                      </div>
                    )}

                    {/* SELLERS */}

                    {!loading &&
                      sellers.slice(0, 5).map((seller, index) => {
                        const sellerId = getSellerId(seller);

                        const sellerName = getSellerName(seller);

                        const sellerEmail = getSellerEmail(seller);

                        const sellerStatus = getSellerStatus(seller);

                        return (
                          <div
                            key={sellerId || index}
                            className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center"
                          >
                            <div className="d-flex align-items-center gap-3">
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                  width: "42px",
                                  height: "42px",
                                  backgroundColor: "#e8f5e9",
                                }}
                              >
                                👨‍🌾
                              </div>

                              <div>
                                <div className="fw-semibold">{sellerName}</div>

                                <small className="text-muted">
                                  {sellerEmail}
                                </small>
                              </div>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                              <span className={getStatusClass(sellerStatus)}>
                                {sellerStatus}
                              </span>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleViewSeller(seller)}
                              >
                                View
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                            QUICK ACTIONS
                        ================================================= */}

            <div className="col-xl-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "14px",
                }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Quick Actions</h5>

                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => navigate("/admin/sellers")}
                    >
                      ✓ Approve Sellers
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => navigate("/admin/orders")}
                    >
                      📦 View Orders
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => navigate("/admin/animals")}
                    >
                      🐄 Animal Management
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/admin/categories")}
                    >
                      Category Management
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => navigate("/admin/subscriptions")}
                    >
                      ⚙ Manage Subscriptions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
                        ALL SELLERS PREVIEW
                    ================================================= */}

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1">Sellers</h5>

                  <small className="text-muted">
                    Sellers currently registered in the database
                  </small>
                </div>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => navigate("/admin/sellers")}
                >
                  Manage Sellers
                </button>
              </div>

              {/* LOADING */}

              {loading && (
                <div className="text-center py-4 text-muted">
                  Loading sellers...
                </div>
              )}

              {/* EMPTY */}

              {!loading && sellers.length === 0 && (
                <div className="text-center py-4 text-muted">
                  No sellers available.
                </div>
              )}

              {/* SELLER TABLE */}

              {!loading && sellers.length > 0 && (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Seller</th>

                        <th>Email</th>

                        <th>Status</th>

                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {sellers.map((seller, index) => {
                        const sellerId = getSellerId(seller);

                        const sellerName = getSellerName(seller);

                        const sellerEmail = getSellerEmail(seller);

                        const sellerStatus = getSellerStatus(seller);

                        return (
                          <tr key={sellerId || index}>
                            <td>
                              <strong>{sellerName}</strong>
                            </td>

                            <td>{sellerEmail}</td>

                            <td>
                              <span className={getStatusClass(sellerStatus)}>
                                {sellerStatus}
                              </span>
                            </td>

                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleViewSeller(seller)}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
