import { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

function AdminBuyers() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadBuyers = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await AdminService.getAllCustomers();
        const data = response.data;

        if (Array.isArray(data)) {
          setBuyers(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setBuyers(data.data);
        } else {
          setBuyers([]);
        }
      } catch (error) {
        console.error("Buyers Loading Error:", error);
        setErrorMessage(
          error.response?.data?.message || "Unable to load buyers.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadBuyers();
  }, []);

  return (
    <>
      <style>{`
        .admin-buyers-page {
          display: flex;
          width: 100%;
          max-width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          background-color: #f7f8fc;
          box-sizing: border-box;
        }

        .admin-buyers-page *,
        .admin-buyers-page *::before,
        .admin-buyers-page *::after {
          box-sizing: border-box;
        }

        .admin-buyers-main {
          flex: 1 1 0;
          margin-left: 250px;
          width: calc(100% - 250px);
          min-width: 0;
          max-width: 100%;
          min-height: 100vh;
        }

        .admin-buyers-header {
          display: flex;
          align-items: center;
          min-height: 70px;
          padding: 16px 24px;
          overflow-wrap: anywhere;
        }

        .admin-buyers-header-info {
          min-width: 0;
        }

        .admin-buyers-content {
          width: 100%;
          min-width: 0;
          padding: 24px;
        }

        .admin-buyers-main .card {
          width: 100%;
          min-width: 0;
          border-radius: 12px;
        }

        .admin-buyers-main .card-body {
          min-width: 0;
          padding: 20px;
        }

        .admin-buyers-table-wrapper {
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .admin-buyers-table-wrapper table {
          width: 100%;
          min-width: 520px;
        }

        .admin-buyers-table-wrapper th,
        .admin-buyers-table-wrapper td {
          padding: 14px 12px;
          vertical-align: middle;
          overflow-wrap: anywhere;
        }

        .admin-buyers-mobile-list {
          display: none;
        }

        .admin-buyer-mobile-card {
          min-width: 0;
          padding: 16px;
          background: #fff;
          border: 1px solid #e7eaf0;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(25, 35, 60, 0.04);
        }

        .admin-buyer-mobile-name {
          margin: 0;
          color: #202b45;
          font-size: 16px;
          font-weight: 700;
          overflow-wrap: anywhere;
        }

        .admin-buyer-mobile-id {
          display: inline-block;
          margin-top: 5px;
          color: #64748b;
          font-size: 12px;
        }

        .admin-buyer-mobile-detail {
          display: grid;
          grid-template-columns: 76px minmax(0, 1fr);
          gap: 8px;
          margin-top: 12px;
          font-size: 14px;
        }

        .admin-buyer-mobile-label {
          color: #64748b;
          font-weight: 500;
        }

        .admin-buyer-mobile-value {
          min-width: 0;
          color: #273449;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        @media (max-width: 767.98px) {
          .admin-buyers-page {
            display: block;
            width: 100%;
            min-width: 0;
            min-height: 100vh;
            overflow-x: clip;
          }

          .admin-buyers-main {
            display: block;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            min-height: 100vh;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }

          .admin-buyers-header {
            width: 100%;
            min-height: 0;
            padding: 76px 16px 16px;
          }

          .admin-buyers-header h3 {
            font-size: 22px;
            line-height: 1.3;
          }

          .admin-buyers-header small {
            display: block;
            font-size: 12px;
            line-height: 1.5;
          }

          .admin-buyers-content {
            width: 100%;
            min-width: 0;
            padding: 12px;
          }

          .admin-buyers-main .card {
            width: 100%;
            min-width: 0;
            margin: 0;
            border-radius: 10px;
          }

          .admin-buyers-main .card-body {
            width: 100%;
            min-width: 0;
            padding: 12px;
          }

          .admin-buyers-table-wrapper {
            display: none;
          }

          .admin-buyers-mobile-list {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 12px;
            width: 100%;
            min-width: 0;
          }

          .admin-buyer-mobile-card {
            width: 100%;
            min-width: 0;
            padding: 14px;
          }

          .admin-buyers-main .alert {
            overflow-wrap: anywhere;
            word-break: break-word;
            font-size: 14px;
          }
        }

        @media (min-width: 768px) and (max-width: 991.98px) {
          .admin-buyers-content {
            padding: 20px;
          }

          .admin-buyers-main .card-body {
            padding: 16px;
          }
        }
      `}</style>

      <div className="admin-buyers-page">
        <AdminSidebar />

        <main className="admin-buyers-main">
          <header className="admin-buyers-header bg-white border-bottom">
            <div className="admin-buyers-header-info">
              <h3 className="fw-bold mb-1">All Buyers</h3>
              <small className="text-muted">
                Buyers registered in the database
              </small>
            </div>
          </header>

          <section className="admin-buyers-content">
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <div className="card border-0 shadow-sm">
              <div className="card-body">
                {loading ? (
                  <p className="mb-0" role="status">
                    Loading buyers...
                  </p>
                ) : buyers.length === 0 ? (
                  <div className="alert alert-info mb-0">No buyers found.</div>
                ) : (
                  <>
                    {/* Desktop and tablet table */}
                    <div className="table-responsive admin-buyers-table-wrapper">
                      <table className="table table-hover align-middle mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                          </tr>
                        </thead>

                        <tbody>
                          {buyers.map((buyer, index) => (
                            <tr key={buyer.id ?? index}>
                              <td>{buyer.id ?? "-"}</td>
                              <td>{buyer.customerName || buyer.name || "-"}</td>
                              <td>{buyer.email || "-"}</td>
                              <td>{buyer.mobile || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile buyer cards */}
                    <div className="admin-buyers-mobile-list">
                      {buyers.map((buyer, index) => (
                        <article
                          className="admin-buyer-mobile-card"
                          key={buyer.id ?? index}
                        >
                          <h4 className="admin-buyer-mobile-name">
                            {buyer.customerName || buyer.name || "-"}
                          </h4>

                          <span className="admin-buyer-mobile-id">
                            Buyer ID: {buyer.id ?? "-"}
                          </span>

                          <div className="admin-buyer-mobile-detail">
                            <span className="admin-buyer-mobile-label">
                              Email
                            </span>
                            <span className="admin-buyer-mobile-value">
                              {buyer.email || "-"}
                            </span>
                          </div>

                          <div className="admin-buyer-mobile-detail">
                            <span className="admin-buyer-mobile-label">
                              Mobile
                            </span>
                            <span className="admin-buyer-mobile-value">
                              {buyer.mobile || "-"}
                            </span>
                          </div>
                        </article>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default AdminBuyers;
