import AdminSidebar from "../../components/Admin/AdminSidebar";

function AdminSettings() {
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
          <h3 className="fw-bold mb-1">
            Admin Settings
          </h3>

          <small className="text-muted">
            Manage admin application settings
          </small>
        </div>

        <div className="p-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-4">
                Application Settings
              </h5>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Application Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value="AnimalSale"
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Admin Role
                </label>

                <input
                  type="text"
                  className="form-control"
                  value="Administrator"
                  readOnly
                />
              </div>

              <button
                type="button"
                className="btn btn-success"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;