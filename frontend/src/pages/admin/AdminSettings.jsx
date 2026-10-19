import AdminSidebar from "../../components/Admin/AdminSidebar";

function AdminSettings() {
  return (
    <>
      <style>{`
        .admin-settings-main {
          margin-left: 250px;
          width: calc(100% - 250px);
          min-width: 0;
        }

        .admin-settings-content {
          min-width: 0;
          padding: 24px;
        }

        .admin-settings-card {
          min-width: 0;
          border-radius: 10px;
        }

        .admin-settings-card .form-control {
          width: 100%;
          min-width: 0;
        }

        @media (max-width: 767.98px) {
          .admin-settings-main {
            margin-left: 0 !important;
            width: 100% !important;
            max-width: 100%;
          }

          .admin-settings-header {
            padding: 16px !important;
          }

          .admin-settings-header h3 {
            font-size: 22px;
          }

          .admin-settings-content {
            padding: 12px !important;
          }

          .admin-settings-card .card-body {
            padding: 16px;
          }

          .admin-settings-card h5 {
            font-size: 18px;
          }

          .admin-settings-card .form-label {
            font-size: 14px;
          }

          .admin-settings-card .form-control {
            font-size: 14px;
            min-height: 42px;
          }

          .admin-settings-card .btn {
            width: 100%;
            min-height: 42px;
          }
        }

        @media (max-width: 380px) {
          .admin-settings-header h3 {
            font-size: 20px;
          }

          .admin-settings-content {
            padding: 9px !important;
          }

          .admin-settings-card .card-body {
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

        <div className="admin-settings-main">
          <div className="admin-settings-header bg-white border-bottom px-4 py-3">
            <h3 className="fw-bold mb-1">Admin Settings</h3>

            <small className="text-muted">
              Manage admin application settings
            </small>
          </div>

          <div className="admin-settings-content">
            <div className="card border-0 shadow-sm admin-settings-card">
              <div className="card-body">
                <h5 className="fw-bold mb-4">Application Settings</h5>

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
                  <label className="form-label fw-semibold">Admin Role</label>

                  <input
                    type="text"
                    className="form-control"
                    value="Administrator"
                    readOnly
                  />
                </div>

                <button type="button" className="btn btn-success">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSettings;
