import AdminSidebar from "../../components/Admin/AdminSidebar";

function AdminOrders() {
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
        <div className="bg-white border-bottom px-4 py-3">
          <h3 className="fw-bold mb-1">Orders</h3>

          <small className="text-muted">
            Manage platform orders
          </small>
        </div>

        <div className="p-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold">
                Order Management
              </h5>

              <p className="text-muted mb-0">
                Order data will be connected here using the
                existing backend order APIs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;