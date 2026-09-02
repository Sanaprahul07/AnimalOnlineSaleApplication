import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

function AdminSellerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadSeller = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await AdminService.getAdminSellerById(id);

        setSeller(response.data);
      } catch (error) {
        console.error("Seller Details Error:", error);

        setErrorMessage(
          error.response?.data?.message ||
            "Unable to load seller details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadSeller();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex">
        <AdminSidebar />

        <div
          className="p-5"
          style={{
            marginLeft: "250px",
            width: "calc(100% - 250px)",
          }}
        >
          Loading seller details...
        </div>
      </div>
    );
  }

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
          <button
            className="btn btn-outline-secondary btn-sm mb-3"
            onClick={() => navigate("/admin/sellers")}
          >
            ← Back to Sellers
          </button>

          <h3 className="fw-bold mb-1">Seller Details</h3>

          <small className="text-muted">
            Complete seller information
          </small>
        </div>

        <div className="p-4">
          {errorMessage && (
            <div className="alert alert-danger">
              {errorMessage}
            </div>
          )}

          {!errorMessage && !seller && (
            <div className="alert alert-warning">
              Seller not found.
            </div>
          )}

          {seller && (
            <>
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-4">
                    Seller Information
                  </h5>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <strong>Seller ID:</strong>
                      <div>{seller.id || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Seller Name:</strong>
                      <div>{seller.sellerName || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Email:</strong>
                      <div>{seller.email || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Mobile:</strong>
                      <div>{seller.mobile || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Business Name:</strong>
                      <div>{seller.businessName || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Farm Name:</strong>
                      <div>{seller.farmName || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Owner Name:</strong>
                      <div>{seller.ownerName || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Approval Status:</strong>
                      <div>
                        <span
                          className={`badge ${
                            seller.approvalStatus === "APPROVED"
                              ? "bg-success"
                              : seller.approvalStatus === "REJECTED"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {seller.approvalStatus || "PENDING"}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>KYC Status:</strong>
                      <div>
                        {seller.kycStatus || "-"}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>Account Status:</strong>
                      <div>
                        {seller.status || "-"}
                      </div>
                    </div>

                    <div className="col-12">
                      <strong>Address:</strong>
                      <div>{seller.address || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>City:</strong>
                      <div>{seller.city || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>District:</strong>
                      <div>{seller.district || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>State:</strong>
                      <div>{seller.state || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>Village:</strong>
                      <div>{seller.village || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>Post Office:</strong>
                      <div>{seller.postOffice || "-"}</div>
                    </div>

                    <div className="col-md-4">
                      <strong>Pincode:</strong>
                      <div>{seller.pincode || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Aadhaar Number:</strong>
                      <div>{seller.aadhaarNumber || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>PAN Number:</strong>
                      <div>{seller.panNumber || "-"}</div>
                    </div>

                    <div className="col-md-6">
                      <strong>Mobile Verified:</strong>
                      <div>
                        {seller.mobileVerified ? "YES" : "NO"}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <strong>Email Verified:</strong>
                      <div>
                        {seller.emailVerified ? "YES" : "NO"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">
                    Seller Animals
                  </h5>

                  <div className="alert alert-info mb-0">
                    Seller-specific animal data will be displayed
                    here after the seller-animal backend response is
                    connected.
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSellerDetails;