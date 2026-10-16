import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { apiUrl } from "../../config/api";

function SellerTopbar() {
  const [bids, setBids] = useState([]);

  const [readBidIds, setReadBidIds] = useState(() => {
    const sellerId = localStorage.getItem("sellerId");
    try {
      return JSON.parse(
        localStorage.getItem(`sellerReadBidIds_${sellerId}`) || "[]",
      );
    } catch {
      return [];
    }
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [notificationError, setNotificationError] = useState("");

  const fetchSellerBids = useCallback(async () => {
    const sellerId = localStorage.getItem("sellerId");

    if (!sellerId) {
      setBids([]);
      setNotificationError("Seller ID not found. Please login again.");
      return;
    }

    try {
      setLoadingNotifications(true);
      setNotificationError("");

      const response = await axios.get(apiUrl(`/api/bids/seller/${sellerId}`));

      const responseData = response.data;
      const bidList = Array.isArray(responseData)
        ? responseData
        : Array.isArray(responseData?.data)
          ? responseData.data
          : [];

      setBids(bidList);
    } catch (error) {
      console.error(
        "Error fetching seller bid notifications:",
        error.response?.data || error.message,
      );
      setNotificationError(
        `Notifications load failed. HTTP ${
          error.response?.status || "network error"
        }.`,
      );
    } finally {
      setLoadingNotifications(false);
    }
  }, []);

  useEffect(() => {
    fetchSellerBids();
    const intervalId = setInterval(fetchSellerBids, 15000);
    return () => clearInterval(intervalId);
  }, [fetchSellerBids]);

  const unreadCount = bids.filter((bid) => !readBidIds.includes(bid.id)).length;

  const markBidsAsRead = () => {
    const sellerId = localStorage.getItem("sellerId");
    if (!sellerId) return;

    const allReadIds = [
      ...new Set([...readBidIds, ...bids.map((bid) => bid.id)]),
    ];

    localStorage.setItem(
      `sellerReadBidIds_${sellerId}`,
      JSON.stringify(allReadIds),
    );
    setReadBidIds(allReadIds);
  };

  const handleNotificationsClick = () => {
    const nextState = !showNotifications;
    setShowNotifications(nextState);

    if (nextState) {
      fetchSellerBids();
      markBidsAsRead();
    }
  };

  const formatBidDate = (dateValue) => {
    if (!dateValue) return "Date not available";

    try {
      let date;

      if (Array.isArray(dateValue)) {
        date = new Date(
          dateValue[0],
          (dateValue[1] || 1) - 1,
          dateValue[2] || 1,
          dateValue[3] || 0,
          dateValue[4] || 0,
          dateValue[5] || 0,
        );
      } else {
        date = new Date(dateValue);
      }

      if (Number.isNaN(date.getTime())) {
        return "Date not available";
      }

      return date.toLocaleString("en-IN");
    } catch {
      return "Date not available";
    }
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">Seller Dashboard</span>

        <div className="d-flex align-items-center">
          <span className="me-3">Welcome, Seller</span>

          <div className="position-relative">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={handleNotificationsClick}
              aria-expanded={showNotifications}
            >
              Notifications
              {unreadCount > 0 && (
                <span className="badge bg-success ms-2">{unreadCount}</span>
              )}
            </button>

            {showNotifications && (
              <div
                className="position-absolute bg-white shadow border rounded mt-2 p-3"
                style={{
                  right: 0,
                  top: "100%",
                  width: "500px",
                  maxWidth: "90vw",
                  maxHeight: "550px",
                  overflowY: "auto",
                  zIndex: 1050,
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Bid Notifications</h5>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={fetchSellerBids}
                    disabled={loadingNotifications}
                  >
                    Refresh
                  </button>
                </div>

                {loadingNotifications && (
                  <p className="text-muted mb-2">Loading notifications...</p>
                )}

                {notificationError && (
                  <p className="text-danger small mb-2">{notificationError}</p>
                )}

                {!loadingNotifications &&
                  !notificationError &&
                  bids.length === 0 && (
                    <p className="text-muted mb-0">
                      No bid notifications available.
                    </p>
                  )}

                {bids.map((bid) => {
                  const isUnread = !readBidIds.includes(bid.id);

                  return (
                    <div
                      key={bid.id}
                      className={`border rounded py-4 px-3 mb-3 ${
                        isUnread
                          ? "border-success bg-success-subtle"
                          : "border-bottom"
                      }`}
                    >
                      <div className="d-flex align-items-center justify-content-between fw-semibold">
                        <span>
                          New bid from {bid.customerName || "Customer"}
                        </span>

                        {isUnread && (
                          <span className="badge bg-success">NEW</span>
                        )}
                      </div>

                      <div className="small mt-2">
                        Animal: {bid.animalName || "Animal"} (ID:{" "}
                        {bid.animalId ?? "N/A"})
                      </div>

                      <div className="mt-2">
                        Bid Amount:{" "}
                        <strong>
                          ₹{Number(bid.bidAmount || 0).toLocaleString("en-IN")}
                        </strong>
                      </div>

                      <div className="small mt-1">
                        Status: {bid.status || "N/A"}
                      </div>

                      <div className="small text-muted mt-1">
                        {formatBidDate(bid.bidDate)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SellerTopbar;
