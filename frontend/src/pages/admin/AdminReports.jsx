import AdminSidebar from "../../components/Admin/AdminSidebar";

function AdminReports() {
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
          <h3 className="fw-bold mb-1">Reports</h3>

          <small className="text-muted">
            Application reports and analytics
          </small>
        </div>

        <div className="p-4">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="fw-bold">
                    Seller Reports
                  </h6>

                  <p className="text-muted mb-0">
                    Seller registration and approval reports.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="fw-bold">
                    Animal Reports
                  </h6>

                  <p className="text-muted mb-0">
                    Animal listing reports.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="fw-bold">
                    Order Reports
                  </h6>

                  <p className="text-muted mb-0">
                    Order and transaction reports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;