import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/chat";

function BuyerChat() {
  const [searchParams] = useSearchParams();

  const animalId = searchParams.get("animalId");
  const sellerId = searchParams.get("sellerId");
  const customerId = localStorage.getItem("customerId");

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD CONVERSATION
  // =====================================================

  const loadConversation = () => {
    if (!animalId || !sellerId || !customerId) {
      setError("Animal, seller or customer information is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    axios
      .get(`${BASE_URL}/conversation`, {
        params: {
          animalId: animalId,
          customerId: customerId,
          sellerId: sellerId,
        },
      })
      .then((response) => {
        console.log("Buyer Chat Response:", response.data);

        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          setMessages([]);
        }
      })
      .catch((error) => {
        console.error("Error loading buyer conversation:", error);

        if (error.response) {
          console.error("Backend Status:", error.response.status);
          console.error("Backend Response:", error.response.data);
        }

        setError("Unable to load conversation.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadConversation();
  }, [animalId, sellerId, customerId]);

  // =====================================================
  // CHECK CONTACT INFORMATION UNLOCKED
  // =====================================================

  const acceptedOfferMessage = messages.find(
    (chatMessage) =>
      chatMessage.senderType === "SELLER" &&
      chatMessage.offerStatus === "ACCEPTED",
  );

  const contactInformationUnlocked = !!acceptedOfferMessage;

  const sellerInfo =
    messages.find(
      (chatMessage) => chatMessage.sellerId && chatMessage.sellerName,
    ) || {};

  // =====================================================
  // SEND CUSTOMER MESSAGE / OFFER
  // =====================================================

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage && !offerPrice) {
      alert("Please enter a message or offer price.");
      return;
    }

    if (!animalId || !sellerId || !customerId) {
      alert("Required information is missing.");
      return;
    }

    if (offerPrice && Number(offerPrice) <= 0) {
      alert("Please enter a valid offer price.");
      return;
    }

    const chatData = {
      customerId: Number(customerId),
      sellerId: Number(sellerId),
      animalId: Number(animalId),
      senderType: "CUSTOMER",
      message: trimmedMessage,
      offerPrice: offerPrice ? Number(offerPrice) : null,
    };

    setSending(true);

    axios
      .post(`${BASE_URL}/send`, chatData)
      .then((response) => {
        console.log("Buyer Message Sent:", response.data);

        setMessages((previousMessages) => [...previousMessages, response.data]);

        setMessage("");
        setOfferPrice("");
      })
      .catch((error) => {
        console.error("Error sending buyer message:", error);

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
  // CUSTOMER ACCEPT SELLER FINAL OFFER
  // =====================================================

  const handleAcceptOffer = (messageId) => {
    if (!messageId) {
      alert("Offer information is missing.");
      return;
    }

    const confirmAccept = window.confirm(
      "Are you sure you want to accept this seller offer?",
    );

    if (!confirmAccept) {
      return;
    }

    setActionLoading(true);

    axios
      .post(`${BASE_URL}/offer/${messageId}/accept`)
      .then((response) => {
        console.log("Seller Offer Accepted:", response.data);

        alert("Seller offer accepted successfully. Order created.");

        loadConversation();
      })
      .catch((error) => {
        console.error("Error accepting seller offer:", error);

        if (error.response) {
          console.error("Backend Status:", error.response.status);
          console.error("Backend Response:", error.response.data);
        }

        alert("Unable to accept seller offer.");
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  // =====================================================
  // CUSTOMER REJECT SELLER FINAL OFFER
  // =====================================================

  const handleRejectOffer = (messageId) => {
    if (!messageId) {
      alert("Offer information is missing.");
      return;
    }

    const confirmReject = window.confirm(
      "Are you sure you want to reject this seller offer?",
    );

    if (!confirmReject) {
      return;
    }

    setActionLoading(true);

    axios
      .post(`${BASE_URL}/offer/${messageId}/reject`)
      .then((response) => {
        console.log("Seller Offer Rejected:", response.data);

        alert("Seller offer rejected successfully.");

        loadConversation();
      })
      .catch((error) => {
        console.error("Error rejecting seller offer:", error);

        if (error.response) {
          console.error("Backend Status:", error.response.status);
          console.error("Backend Response:", error.response.data);
        }

        alert("Unable to reject seller offer.");
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  // =====================================================
  // LOGIN CHECK
  // =====================================================

  if (!customerId) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Please login as a customer before starting a chat.
        </div>

        <Link to="/buyer/login" className="btn btn-primary">
          Customer Login
        </Link>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="container py-4">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-primary">Chat / Negotiate with Seller</h2>

          <p className="text-muted mb-0">Discuss animal price with seller</p>
        </div>

        <Link to={`/animal/${animalId}`} className="btn btn-secondary">
          ← Back to Animal
        </Link>
      </div>

      {/* =================================================
          CONTACT INFORMATION
      ================================================= */}

      {contactInformationUnlocked && (
        <div className="card shadow border-0 mb-4">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">✓ Seller Information</h5>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <strong>Seller Name</strong>
                <div>{sellerInfo.sellerName || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Mobile Number</strong>
                <div>
                  {sellerInfo.sellerMobile ? (
                    <a
                      href={`tel:${sellerInfo.sellerMobile}`}
                      className="btn btn-success btn-sm mt-1"
                    >
                      📞 {sellerInfo.sellerMobile}
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Email</strong>
                <div>{sellerInfo.sellerEmail || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Address</strong>
                <div>{sellerInfo.sellerAddress || "-"}</div>
              </div>

              <div className="col-md-4 mb-3">
                <strong>City</strong>
                <div>{sellerInfo.sellerCity || "-"}</div>
              </div>

              <div className="col-md-4 mb-3">
                <strong>State</strong>
                <div>{sellerInfo.sellerState || "-"}</div>
              </div>

              <div className="col-md-4 mb-3">
                <strong>District</strong>
                <div>{sellerInfo.sellerDistrict || "-"}</div>
              </div>

              <div className="col-md-4 mb-3">
                <strong>Sub-District</strong>
                <div>{sellerInfo.sellerSubDistrict || "-"}</div>
              </div>

              <div className="col-md-4 mb-3">
                <strong>Village</strong>
                <div>{sellerInfo.sellerVillage || "-"}</div>
              </div>

              <div className="col-md-4 mb-3">
                <strong>Pincode</strong>
                <div>{sellerInfo.sellerPincode || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Location</strong>
                <div>{sellerInfo.sellerLocation || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Farm / Business</strong>
                <div>
                  {sellerInfo.sellerFarmName ||
                    sellerInfo.sellerBusinessName ||
                    "-"}
                </div>
              </div>
            </div>

            <div className="alert alert-success mb-0">
              Offer accepted. Seller contact information is now available.
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          CONTACT LOCK MESSAGE
      ================================================= */}

      {!contactInformationUnlocked && (
        <div className="alert alert-warning">
          🔒 Seller contact information will be available after you accept the
          seller's final offer.
        </div>
      )}

      {/* =================================================
          CHAT CARD
      ================================================= */}

      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Seller Conversation</h4>
        </div>

        <div className="card-body">
          {loading && (
            <div className="text-center py-3">Loading conversation...</div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          {!loading && !error && (
            <div
              className="border rounded p-3 mb-3"
              style={{
                height: "400px",
                overflowY: "auto",
                backgroundColor: "#f8f9fa",
              }}
            >
              {messages.length === 0 ? (
                <div className="text-center text-muted mt-5">
                  No conversation yet.
                  <br />
                  Start a conversation with the seller.
                </div>
              ) : (
                messages.map((chatMessage) => {
                  const isCustomer = chatMessage.senderType === "CUSTOMER";

                  const isSellerOffer =
                    chatMessage.senderType === "SELLER" &&
                    chatMessage.offerPrice != null;

                  const isPendingSellerOffer =
                    isSellerOffer && chatMessage.offerStatus === "PENDING";

                  return (
                    <div
                      key={chatMessage.id}
                      className={`mb-3 d-flex ${
                        isCustomer
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded ${
                          isCustomer
                            ? "bg-primary text-white"
                            : "bg-white border"
                        }`}
                        style={{
                          maxWidth: "75%",
                        }}
                      >
                        <div className="small fw-bold mb-1">
                          {isCustomer ? "You" : "Seller"}
                        </div>

                        {chatMessage.message && (
                          <div>{chatMessage.message}</div>
                        )}

                        {chatMessage.offerPrice != null && (
                          <div className="mt-2">
                            <strong>
                              {isSellerOffer
                                ? "Seller Offer: "
                                : "Your Offer: "}
                              ₹{Number(chatMessage.offerPrice).toLocaleString()}
                            </strong>

                            <div className="small mt-1">
                              Status: {chatMessage.offerStatus || "PENDING"}
                            </div>

                            {isPendingSellerOffer && (
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
                                    : "✓ Accept Seller Offer"}
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
                          </div>
                        )}

                        {chatMessage.createdAt && (
                          <div className="small mt-2 opacity-75">
                            {new Date(chatMessage.createdAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* =================================================
              SEND MESSAGE
          ================================================= */}

          <div className="mb-3">
            <label className="form-label">Message</label>

            <textarea
              className="form-control"
              rows="3"
              placeholder="Write a message to the seller..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={sending}
            />
          </div>

          {/* =================================================
              CUSTOMER OFFER
          ================================================= */}

          <div className="mb-3">
            <label className="form-label">Your Offer Price</label>

            <input
              type="number"
              className="form-control"
              placeholder="Enter your offer price"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              min="1"
              disabled={sending}
            />
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Message / Offer"}
            </button>

            <Link to={`/animal/${animalId}`} className="btn btn-secondary">
              Back to Animal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerChat;
