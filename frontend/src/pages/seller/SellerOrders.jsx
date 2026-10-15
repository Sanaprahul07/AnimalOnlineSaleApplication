import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../config/api";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = async () => {
    const sellerId = localStorage.getItem("sellerId");

    if (!sellerId) {
      setError("Seller session not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        apiUrl(`/api/orders/seller/${sellerId}`),
      );

      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error loading seller orders:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load orders. Please try again.",
      );
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    const confirmed = window.confirm(
      `Are you sure you want to mark this order as ${status}?`,
    );

    if (!confirmed) return;

    try {
      setUpdatingId(orderId);

      const response = await axios.put(
        apiUrl(`/api/orders/${orderId}/status`),
        null,
        {
          params: { status },
        },
      );

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === orderId ? response.data : order,
        ),
      );
    } catch (err) {
      console.error("Error updating order status:", err);
      window.alert(
        err.response?.data?.message || "Unable to update order status.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (value) => {
    if (!value) return "N/A";

    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleString();
  };

  const formatAmount = (value) =>
    value == null ? "N/A" : `₹${Number(value).toLocaleString("en-IN")}`;

  const getStatusClass = (status) => {
    switch ((status || "").toUpperCase()) {
      case "ACCEPTED":
      case "COMPLETED":
        return "bg-success";
      case "CANCELLED":
      case "REJECTED":
        return "bg-danger";
      default:
        return "bg-warning text-dark";
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-2">Customer Orders</h2>
          <p className="text-muted mb-0">
            View customers, animals and order status.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={loadOrders}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh Orders"}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">Total Orders</p>
              <h3 className="fw-bold mb-0">{orders.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">Accepted Orders</p>
              <h3 className="fw-bold text-success mb-0">
                {
                  orders.filter(
                    (order) =>
                      (order.status || "").toUpperCase() === "ACCEPTED",
                  ).length
                }
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">Pending Orders</p>
              <h3 className="fw-bold text-warning mb-0">
                {
                  orders.filter(
                    (order) => (order.status || "").toUpperCase() === "PENDING",
                  ).length
                }
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status" />
              <p className="mt-2">Loading orders...</p>
            </div>
          ) : error ? null : orders.length === 0 ? (
            <div className="alert alert-info mb-0">
              No orders found for your account.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Sr. No.</th>
                    <th>Order Number</th>
                    <th>Customer Name</th>
                    <th>Customer ID</th>
                    <th>Animal Name</th>
                    <th>Animal ID</th>
                    <th>Amount</th>
                    <th>Order Date</th>
                    <th>Order Status</th>
                    <th>Payment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order, index) => {
                    const status = (order.status || "").toUpperCase();
                    const canAccept = status === "PENDING";

                    return (
                      <tr key={order.id ?? order.orderNumber ?? index}>
                        <td>{index + 1}</td>
                        <td>{order.orderNumber || "N/A"}</td>
                        <td>{order.buyerName || "Name not available"}</td>
                        <td>{order.buyerId ?? "N/A"}</td>
                        <td>{order.animalName || "Animal not available"}</td>
                        <td>{order.animalId ?? "N/A"}</td>
                        <td>{formatAmount(order.amount)}</td>
                        <td>{formatDate(order.orderDate)}</td>
                        <td>
                          <span className={`badge ${getStatusClass(status)}`}>
                            {order.status || "N/A"}
                          </span>
                        </td>
                        <td>{order.paymentStatus || "N/A"}</td>
                        <td>
                          {canAccept ? (
                            <button
                              type="button"
                              className="btn btn-success btn-sm"
                              disabled={updatingId === order.id}
                              onClick={() => updateStatus(order.id, "ACCEPTED")}
                            >
                              {updatingId === order.id
                                ? "Updating..."
                                : "Accept Order"}
                            </button>
                          ) : (
                            <span className="text-muted">No action</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerOrders;
