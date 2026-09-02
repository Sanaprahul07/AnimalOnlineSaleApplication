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
          error.response?.data?.message ||
            "Unable to load buyers."
        );
      } finally {
        setLoading(false);
      }
    };

    loadBuyers();
  }, []);

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
          <h3 className="fw-bold mb-1">All Buyers</h3>
          <small className="text-muted">
            Buyers registered in the database
          </small>
        </div>

        <div className="p-4">
          {errorMessage && (
            <div className="alert alert-danger">
              {errorMessage}
            </div>
          )}

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {loading ? (
                <p>Loading buyers...</p>
              ) : buyers.length === 0 ? (
                <div className="alert alert-info mb-0">
                  No buyers found.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                      </tr>
                    </thead>

                    <tbody>
                      {buyers.map((buyer) => (
                        <tr key={buyer.id}>
                          <td>{buyer.id}</td>
                          <td>
                            {buyer.customerName ||
                              buyer.name ||
                              "-"}
                          </td>
                          <td>{buyer.email || "-"}</td>
                          <td>{buyer.mobile || "-"}</td>
                        </tr>
                      ))}
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

export default AdminBuyers;