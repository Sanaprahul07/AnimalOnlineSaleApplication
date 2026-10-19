import AdminSidebar from "../../components/Admin/AdminSidebar";

function AdminOrders() {
  return (
    <>
      <style>{`
        .admin-orders-main {
          margin-left: 250px;
          width: calc(100% - 250px);
          min-width: 0;
        }

        .admin-orders-header {
          min-width: 0;
        }

        .admin-orders-content {
          min-width: 0;
          padding: 24px;
        }

        .admin-orders-card {
          min-width: 0;
          overflow-wrap: anywhere;
          border-radius: 10px;
        }

        @media (max-width: 767.98px) {
          .admin-orders-main {
            margin-left: 0 !important;
            width: 100% !important;
            max-width: 100%;
          }

          .admin-orders-header {
            padding: 16px !important;
          }

          .admin-orders-header h3 {
            font-size: 22px;
          }

          .admin-orders-content {
            padding: 12px !important;
          }

          .admin-orders-card .card-body {
            padding: 16px;
          }

          .admin-orders-card h5 {
            font-size: 17px;
            line-height: 1.5;
          }

          .admin-orders-card p {
            font-size: 14px;
            line-height: 1.7;
          }
        }

        @media (max-width: 380px) {
          .admin-orders-header h3 {
            font-size: 20px;
          }

          .admin-orders-content {
            padding: 9px !important;
          }

          .admin-orders-card .card-body {
            padding: 12px;
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

        <div className="admin-orders-main">
          <div className="admin-orders-header bg-white border-bottom px-4 py-3">
            <h3 className="fw-bold mb-1">Orders</h3>

            <small className="text-muted">Manage platform orders</small>
          </div>

          <div className="admin-orders-content">
            <div className="card border-0 shadow-sm admin-orders-card">
              <div className="card-body">
                <h5 className="fw-bold">Order Management</h5>

                <p className="text-muted mb-0">
                  Order data will be connected here using the existing backend
                  order APIs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
