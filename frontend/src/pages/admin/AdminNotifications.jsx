import AdminSidebar from "../../components/Admin/AdminSidebar";

function AdminNotifications() {
  return (
    <>
      <style>{`
        .admin-notifications-main {
          margin-left: 250px;
          width: calc(100% - 250px);
          min-width: 0;
        }

        .admin-notifications-header {
          min-width: 0;
        }

        .admin-notifications-content {
          min-width: 0;
          padding: 24px;
        }

        .admin-notifications-card {
          min-width: 0;
          overflow-wrap: anywhere;
          border-radius: 10px;
        }

        @media (max-width: 767.98px) {
          .admin-notifications-main {
            margin-left: 0 !important;
            width: 100% !important;
            max-width: 100%;
          }

          .admin-notifications-header {
            padding: 16px !important;
          }

          .admin-notifications-header h3 {
            font-size: 22px;
          }

          .admin-notifications-content {
            padding: 12px !important;
          }

          .admin-notifications-card .card-body {
            padding: 16px;
          }

          .admin-notifications-card h5 {
            font-size: 17px;
            line-height: 1.5;
          }

          .admin-notifications-card p {
            font-size: 14px;
            line-height: 1.7;
          }
        }

        @media (max-width: 380px) {
          .admin-notifications-header h3 {
            font-size: 20px;
          }

          .admin-notifications-content {
            padding: 9px !important;
          }

          .admin-notifications-card .card-body {
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

        <div className="admin-notifications-main">
          <div className="admin-notifications-header bg-white border-bottom px-4 py-3">
            <h3 className="fw-bold mb-1">Notifications</h3>

            <small className="text-muted">
              Admin application notifications
            </small>
          </div>

          <div className="admin-notifications-content">
            <div className="card border-0 shadow-sm admin-notifications-card">
              <div className="card-body">
                <h5 className="fw-bold">Notification Management</h5>

                <p className="text-muted mb-0">
                  Notifications will be displayed here when the notification
                  backend API is connected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminNotifications;
