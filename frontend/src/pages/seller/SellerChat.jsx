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
  const [error, setError] = useState("");
  const [offerActionLoading, setOfferActionLoading] = useState(false);

  // =====================================================
  // LOAD CONVERSATION
  // =====================================================

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

  // =====================================================
  // CHECK CONTACT INFORMATION UNLOCKED
  // =====================================================

  const acceptedOfferMessage = messages.find(
    (chatMessage) =>
      chatMessage.offerPrice != null && chatMessage.offerStatus === "ACCEPTED",
  );

  const contactInformationUnlocked = !!acceptedOfferMessage;

  const customerInfo =
    messages.find(
      (chatMessage) => chatMessage.customerId && chatMessage.customerName,
    ) || {};

  // =====================================================
  // SELLER ACCEPT CUSTOMER OFFER
  // =====================================================

  const handleAcceptCustomerOffer = (messageId) => {
    if (!messageId) {
      return;
    }

    if (offerActionLoading) {
      return;
    }

    const confirmAccept = window.confirm(
      "Do you want to accept this customer's offer?",
    );

    if (!confirmAccept) {
      return;
    }

    setOfferActionLoading(true);

    axios
      .post(`${BASE_URL}/offer/${messageId}/accept`)
      .then((response) => {
        console.log("Customer Offer Accepted:", response.data);

        alert("Customer offer accepted successfully. Order has been created.");

        loadConversation();
      })
      .catch((error) => {
        console.error("Error accepting customer offer:", error);

        if (error.response) {
          console.error("Backend Status:", error.response.status);
          console.error("Backend Response:", error.response.data);
        }

        alert("Unable to accept customer offer.");
      })
      .finally(() => {
        setOfferActionLoading(false);
      });
  };

  // =====================================================
  // SELLER REJECT CUSTOMER OFFER
  // =====================================================

  const handleRejectCustomerOffer = (messageId) => {
    if (!messageId) {
      return;
    }

    if (offerActionLoading) {
      return;
    }

    const confirmReject = window.confirm(
      "Do you want to reject this customer's offer?",
    );

    if (!confirmReject) {
      return;
    }

    setOfferActionLoading(true);

    axios
      .post(`${BASE_URL}/offer/${messageId}/reject`)
      .then((response) => {
        console.log("Customer Offer Rejected:", response.data);

        alert("Customer offer rejected successfully.");

        loadConversation();
      })
      .catch((error) => {
        console.error("Error rejecting customer offer:", error);

        if (error.response) {
          console.error("Backend Status:", error.response.status);
          console.error("Backend Response:", error.response.data);
        }

        alert("Unable to reject customer offer.");
      })
      .finally(() => {
        setOfferActionLoading(false);
      });
  };

  // =====================================================
  // SEND SELLER MESSAGE / FINAL OFFER
  // =====================================================

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

        alert(
          offerPrice
            ? "Final offer sent to customer successfully."
            : "Message sent successfully.",
        );

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

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="container-fluid p-4">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-success">Seller Chat & Negotiation</h2>

          <p className="text-muted mb-0">
            Discuss animal price and send final offer to customer
          </p>
        </div>

        <Link
          to={`/seller/animal-bids/${animalId}`}
          className="btn btn-secondary"
        >
          ← Back to Bids
        </Link>
      </div>

      {/* =================================================
          CUSTOMER INFORMATION
      ================================================= */}

      {contactInformationUnlocked && (
        <div className="card shadow border-0 mb-4">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">✓ Customer Information</h5>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <strong>Customer Name</strong>
                <div>{customerInfo.customerName || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Mobile Number</strong>

                <div>
                  {customerInfo.customerMobile ? (
                    <a
                      href={`tel:${customerInfo.customerMobile}`}
                      className="btn btn-success btn-sm mt-1"
                    >
                      📞 {customerInfo.customerMobile}
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Email</strong>
                <div>{customerInfo.customerEmail || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Address</strong>
                <div>{customerInfo.customerAddress || "-"}</div>
              </div>

              <div className="col-md-4 mb-3">
                <strong>City</strong>
                <div>{customerInfo.customerCity || "-"}</div>
              </div>

              <div className="col-md-4 mb-3">
                <strong>State</strong>
                <div>{customerInfo.customerState || "-"}</div>
              </div>

              <div className="col-md-4 mb-3">
                <strong>Pincode</strong>
                <div>{customerInfo.customerPincode || "-"}</div>
              </div>
            </div>

            <div className="alert alert-success mb-0">
              An offer has been accepted. Customer contact information is now
              available.
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          CONTACT LOCK MESSAGE
      ================================================= */}

      {!contactInformationUnlocked && (
        <div className="alert alert-warning">
          🔒 Customer contact information will be available after an offer is
          accepted.
        </div>
      )}

      <div className="row">
        {/* =================================================
            LEFT SIDE - CONVERSATION DETAILS
        ================================================= */}

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

        {/* =================================================
            RIGHT SIDE - CHAT
        ================================================= */}

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

              {/* =================================================
                  ONLY MESSAGE AREA WILL SCROLL
              ================================================= */}

              {!loading && !error && messages.length > 0 && (
                <div
                  className="mb-4 border rounded p-3"
                  style={{
                    height: "500px",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
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
                        style={{
                          maxWidth: "75%",
                        }}
                      >
                        {/* SENDER NAME */}

                        <div className="fw-bold mb-1">
                          {chatMessage.senderType === "SELLER"
                            ? "You"
                            : chatMessage.customerName || "Customer"}
                        </div>

                        {/* MESSAGE */}

                        {chatMessage.message && (
                          <div className="mb-2">{chatMessage.message}</div>
                        )}

                        {/* OFFER */}

                        {chatMessage.offerPrice != null && (
                          <div className="fw-bold">
                            {chatMessage.senderType === "SELLER"
                              ? "Your Final Offer: "
                              : "Customer Offer: "}
                            ₹{Number(chatMessage.offerPrice).toLocaleString()}
                          </div>
                        )}

                        {/* OFFER STATUS */}

                        {chatMessage.offerStatus && (
                          <div className="small mt-1">
                            Offer Status: {chatMessage.offerStatus}
                          </div>
                        )}

                        {/* =================================================
                              CUSTOMER OFFER ACTION BUTTONS
                          ================================================= */}

                        {chatMessage.senderType === "CUSTOMER" &&
                          chatMessage.offerPrice != null &&
                          chatMessage.offerStatus === "PENDING" && (
                            <div className="mt-3 d-flex gap-2">
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                                onClick={() =>
                                  handleAcceptCustomerOffer(chatMessage.id)
                                }
                                disabled={offerActionLoading}
                              >
                                {offerActionLoading
                                  ? "Processing..."
                                  : "✓ Accept Customer Offer"}
                              </button>

                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleRejectCustomerOffer(chatMessage.id)
                                }
                                disabled={offerActionLoading}
                              >
                                ✕ Reject Offer
                              </button>
                            </div>
                          )}

                        {/* DATE */}

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

              {/* =================================================
                  SELLER SEND FINAL OFFER
              ================================================= */}

              <h5 className="fw-bold mb-3">Send Message / Final Offer</h5>

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
                <label className="form-label fw-bold">Final Offer Price</label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter final negotiated price"
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
                {sending ? "Sending..." : "💬 Send Message / Final Offer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerChat;
