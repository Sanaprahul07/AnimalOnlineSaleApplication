import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/chat";

function SellerChat() {
  const [searchParams] = useSearchParams();

  const animalId = searchParams.get("animalId");
  const customerId = searchParams.get("customerId");
  const sellerId = localStorage.getItem("sellerId");

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const loadConversation = () => {
    if (!animalId || !customerId || !sellerId) {
      setError("Seller, customer or animal information is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    console.log("Loading Seller Chat");
    console.log("Seller ID:", sellerId);
    console.log("Animal ID:", animalId);
    console.log("Customer ID:", customerId);

    axios
      .get(`${BASE_URL}/conversation`, {
        params: {
          animalId: animalId,
          customerId: customerId,
          sellerId: sellerId,
        },
      })
      .then((response) => {
        console.log("Chat Conversation Response:", response.data);

        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          setMessages([]);
        }
      })
      .catch((error) => {
        console.error("Error loading conversation:", error);

        if (error.response) {
          console.error("Backend Status:", error.response.status);
          console.error("Backend Response:", error.response.data);
        }

        setError("Unable to load chat conversation.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadConversation();
  }, [animalId, customerId, sellerId]);

  const handleSendMessage = () => {
    if (!sellerId || !animalId || !customerId) {
      alert("Seller, customer or animal information is missing.");
      return;
    }

    const trimmedMessage = message.trim();

    if (!trimmedMessage && !offerPrice) {
      alert("Please enter a message or offer price.");
      return;
    }

    if (offerPrice && (isNaN(Number(offerPrice)) || Number(offerPrice) <= 0)) {
      alert("Please enter a valid offer price.");
      return;
    }

    const chatData = {
      sellerId: Number(sellerId),
      customerId: Number(customerId),
      animalId: Number(animalId),
      senderType: "SELLER",
      message: trimmedMessage,
      offerPrice: offerPrice ? Number(offerPrice) : null,
    };

    console.log("Sending Seller Chat:", chatData);

    setSending(true);

    axios
      .post(`${BASE_URL}/send`, chatData)
      .then((response) => {
        console.log("Seller Chat Send Response:", response.data);

        setMessage("");
        setOfferPrice("");

        alert("Message sent successfully.");

        loadConversation();
      })
      .catch((error) => {
        console.error("Error sending seller message:", error);

        if (error.response) {
          console.error("Backend Status:", error.response.status);
          console.error("Backend Response:", error.response.data);
        }

        alert("Unable to send message.");
      })
      .finally(() => {
        setSending(false);
      });
  };

  // STEP 9: Accept Customer Offer
  const handleAcceptOffer = (messageId) => {
    if (!messageId) {
      alert("Offer information is missing.");
      return;
    }

    const confirmAccept = window.confirm(
      "Are you sure you want to accept this offer?",
    );

    if (!confirmAccept) {
      return;
    }

    console.log("Accepting Offer. Message ID:", messageId);

    setActionLoading(true);

    axios
      .post(`${BASE_URL}/offer/${messageId}/accept`)
      .then((response) => {
        console.log("Accept Offer Response:", response.data);

        alert("Offer accepted successfully.");

        loadConversation();
      })
      .catch((error) => {
        console.error("Error accepting offer:", error);

        if (error.response) {
          console.error("Backend Status:", error.response.status);
          console.error("Backend Response:", error.response.data);
        }

        alert("Unable to accept offer.");
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  // STEP 9: Reject Customer Offer
  const handleRejectOffer = (messageId) => {
    if (!messageId) {
      alert("Offer information is missing.");
      return;
    }

    const confirmReject = window.confirm(
      "Are you sure you want to reject this offer?",
    );

    if (!confirmReject) {
      return;
    }

    console.log("Rejecting Offer. Message ID:", messageId);

    setActionLoading(true);

    axios
      .post(`${BASE_URL}/offer/${messageId}/reject`)
      .then((response) => {
        console.log("Reject Offer Response:", response.data);

        alert("Offer rejected successfully.");

        loadConversation();
      })
      .catch((error) => {
        console.error("Error rejecting offer:", error);

        if (error.response) {
          console.error("Backend Status:", error.response.status);
          console.error("Backend Response:", error.response.data);
        }

        alert("Unable to reject offer.");
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-success">Seller Chat & Negotiation</h2>

          <p className="text-muted mb-0">Discuss animal price with customer</p>
        </div>

        <Link
          to={`/seller/animal-bids/${animalId}`}
          className="btn btn-secondary"
        >
          ← Back to Bids
        </Link>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card shadow border-0 mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Conversation Details</h5>
            </div>

            <div className="card-body">
              <p>
                <strong>Seller ID:</strong> {sellerId || "Not found"}
              </p>

              <p>
                <strong>Animal ID:</strong> {animalId || "Not selected"}
              </p>

              <p className="mb-0">
                <strong>Customer ID:</strong> {customerId || "Not selected"}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Customer Conversation</h5>
            </div>

            <div className="card-body">
              {loading && (
                <div className="text-center p-4">
                  <div
                    className="spinner-border text-success"
                    role="status"
                  ></div>

                  <p className="mt-2 mb-0">Loading conversation...</p>
                </div>
              )}

              {error && !loading && (
                <div className="alert alert-danger">{error}</div>
              )}

              {!loading && !error && messages.length === 0 && (
                <div className="alert alert-info">
                  No conversation messages found.
                </div>
              )}

              {!loading && !error && messages.length > 0 && (
                <div className="mb-4">
                  {messages.map((chatMessage) => (
                    <div
                      key={chatMessage.id}
                      className={`mb-3 d-flex ${
                        chatMessage.senderType === "SELLER"
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded shadow-sm ${
                          chatMessage.senderType === "SELLER"
                            ? "bg-success text-white"
                            : "bg-light"
                        }`}
                        style={{ maxWidth: "75%" }}
                      >
                        <div className="fw-bold mb-1">
                          {chatMessage.senderType === "SELLER"
                            ? "Seller"
                            : chatMessage.customerName || "Customer"}
                        </div>

                        {chatMessage.message && (
                          <div className="mb-2">{chatMessage.message}</div>
                        )}

                        {chatMessage.offerPrice != null && (
                          <div className="fw-bold">
                            Offer: ₹{chatMessage.offerPrice}
                          </div>
                        )}

                        {chatMessage.offerStatus && (
                          <div className="small mt-1">
                            Offer Status: {chatMessage.offerStatus}
                          </div>
                        )}

                        {/* STEP 9: Accept / Reject buttons */}
                        {chatMessage.offerPrice != null &&
                          chatMessage.offerStatus === "PENDING" &&
                          chatMessage.senderType !== "SELLER" && (
                            <div className="mt-3 d-flex gap-2 flex-wrap">
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                                onClick={() =>
                                  handleAcceptOffer(chatMessage.id)
                                }
                                disabled={actionLoading}
                              >
                                {actionLoading
                                  ? "Processing..."
                                  : "✓ Accept Offer"}
                              </button>

                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleRejectOffer(chatMessage.id)
                                }
                                disabled={actionLoading}
                              >
                                {actionLoading
                                  ? "Processing..."
                                  : "✕ Reject Offer"}
                              </button>
                            </div>
                          )}

                        <div className="small mt-2 opacity-75">
                          {chatMessage.createdAt
                            ? new Date(chatMessage.createdAt).toLocaleString()
                            : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <hr />

              <h5 className="fw-bold mb-3">Send Message / Offer</h5>

              <div className="mb-3">
                <label className="form-label fw-bold">Message</label>

                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter your message to customer..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={sending}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Offer Price</label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter negotiated offer price"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  min="1"
                  disabled={sending}
                />
              </div>

              <button
                type="button"
                className="btn btn-success"
                onClick={handleSendMessage}
                disabled={sending}
              >
                {sending ? "Sending..." : "💬 Send Message / Offer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerChat;
