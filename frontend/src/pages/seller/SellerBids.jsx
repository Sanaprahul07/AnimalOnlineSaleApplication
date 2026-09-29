import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBidsByAnimal } from "../../services/BidService";

function SellerBids() {
  const { animalId } = useParams();

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBids = () => {
    if (!animalId) {
      setError("Animal ID not found.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    console.log("Loading bids for Animal ID:", animalId);

    getBidsByAnimal(animalId)
      .then((response) => {
        console.log("Animal Bids Response:", response.data);

        if (Array.isArray(response.data)) {
          setBids(response.data);
        } else {
          setBids([]);
        }
      })
      .catch((error) => {
        console.error("Error loading animal bids:", error);

        if (error.response) {
          console.error("Backend Status:", error.response.status);
          console.error("Backend Response:", error.response.data);
        }

        setError("Unable to load animal bids.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadBids();
  }, [animalId]);

  const animalName = bids.length > 0 ? bids[0].animalName : "Animal";
  const sellerName = bids.length > 0 ? bids[0].sellerName : "";

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-success">Animal Bids</h2>
          <p className="text-muted mb-0">View customer bids for this animal</p>
        </div>

        <Link to="/seller/animals" className="btn btn-secondary">
          ← Back to My Animals
        </Link>
      </div>

      {loading && (
        <div className="text-center p-5">
          <div className="spinner-border text-success" role="status"></div>
          <p className="mt-2">Loading bids...</p>
        </div>
      )}

      {error && !loading && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <>
          <div className="card shadow border-0 mb-4">
            <div className="card-body">
              <h4 className="fw-bold mb-2">{animalName}</h4>

              <p className="mb-1">
                <strong>Animal ID:</strong> {animalId}
              </p>

              {sellerName && (
                <p className="mb-0">
                  <strong>Seller:</strong> {sellerName}
                </p>
              )}
            </div>
          </div>

          {bids.length === 0 ? (
            <div className="alert alert-info">
              No bids received for this animal yet.
            </div>
          ) : (
            <div className="card shadow border-0">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Customer Bids ({bids.length})</h5>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Bid ID</th>
                        <th>Customer</th>
                        <th>Bid Amount</th>
                        <th>Status</th>
                        <th>Bid Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {bids.map((bid) => (
                        <tr key={bid.id}>
                          <td>{bid.id}</td>

                          <td>
                            <div className="fw-bold">
                              {bid.customerName || "Customer"}
                            </div>
                            <small className="text-muted">
                              Customer ID: {bid.customerId}
                            </small>
                          </td>

                          <td className="fw-bold text-success">
                            ₹{bid.bidAmount}
                          </td>

                          <td>
                            {bid.status === "ACCEPTED" && (
                              <span className="badge bg-success">ACCEPTED</span>
                            )}

                            {bid.status === "REJECTED" && (
                              <span className="badge bg-danger">REJECTED</span>
                            )}

                            {bid.status === "PENDING" && (
                              <span className="badge bg-warning text-dark">
                                PENDING
                              </span>
                            )}

                            {!["ACCEPTED", "REJECTED", "PENDING"].includes(
                              bid.status,
                            ) && (
                              <span className="badge bg-secondary">
                                {bid.status}
                              </span>
                            )}
                          </td>

                          <td>
                            {bid.bidDate
                              ? new Date(bid.bidDate).toLocaleString()
                              : "-"}
                          </td>

                          <td>
                            <Link
                              to={`/seller/chat?animalId=${bid.animalId}&customerId=${bid.customerId}`}
                              className="btn btn-sm btn-success"
                            >
                              💬 Chat / Negotiate
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SellerBids;
