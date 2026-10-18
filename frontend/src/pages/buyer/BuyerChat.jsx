import { useCallback, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config/api";

const BASE_URL = apiUrl("/api/chat");

function BuyerChat() {
  const [searchParams, setSearchParams] = useSearchParams();

  const animalId = searchParams.get("animalId");
  const sellerId = searchParams.get("sellerId");
  const customerId = localStorage.getItem("customerId");

  const [inbox, setInbox] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [inboxLoading, setInboxLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [inboxError, setInboxError] = useState("");

  // =====================================================
  // LOAD BUYER INBOX
  // GET ALL MESSAGES AND GROUP BY ANIMAL + SELLER
  // =====================================================

  const loadInbox = useCallback(() => {
    if (!customerId) {
      setInbox([]);
      setInboxLoading(false);
      return;
    }

    setInboxLoading(true);
    setInboxError("");

    axios
      .get(`${BASE_URL}/customer/${customerId}/inbox`)
      .then((response) => {
        const allMessages = Array.isArray(response.data) ? response.data : [];

        // Keep the latest message for each animal-seller conversation.
        const conversations = new Map();

        allMessages.forEach((chatMessage) => {
          if (!chatMessage.animalId || !chatMessage.sellerId) {
            return;
          }

          const key = `${chatMessage.animalId}-${chatMessage.sellerId}`;

          const existing = conversations.get(key);

          if (
            !existing ||
            new Date(chatMessage.createdAt || 0) >
              new Date(existing.createdAt || 0)
          ) {
            conversations.set(key, chatMessage);
          }
        });

        setInbox(
          Array.from(conversations.values()).sort(
            (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
          ),
        );
      })
      .catch((err) => {
        console.error("Error loading buyer inbox:", err);
        setInboxError("Unable to load your conversations.");
        setInbox([]);
      })
      .finally(() => {
        setInboxLoading(false);
      });
  }, [customerId]);

  useEffect(() => {
    loadInbox();
  }, [loadInbox]);

  // =====================================================
  // LOAD SELECTED CONVERSATION
  // =====================================================

  const loadConversation = useCallback(() => {
    if (!animalId || !sellerId || !customerId) {
      setMessages([]);
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    axios
      .get(`${BASE_URL}/conversation`, {
        params: {
          animalId,
          customerId,
          sellerId,
        },
      })
      .then((response) => {
        setMessages(Array.isArray(response.data) ? response.data : []);
      })
      .catch((err) => {
        console.error("Error loading buyer conversation:", err);
        setError("Unable to load conversation.");
        setMessages([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [animalId, sellerId, customerId]);

  useEffect(() => {
    loadConversation();
  }, [loadConversation]);

  // =====================================================
  // SELECT CONVERSATION FROM INBOX
  // =====================================================

  const handleSelectConversation = (chatMessage) => {
    setSearchParams({
      animalId: String(chatMessage.animalId),
      sellerId: String(chatMessage.sellerId),
    });

    setMessage("");
    setOfferPrice("");
  };

  // =====================================================
  // CHECK CONTACT INFORMATION UNLOCKED
  // EXISTING LOGIC PRESERVED
  // =====================================================

  const acceptedOfferMessage = messages.find(
    (chatMessage) =>
      chatMessage.offerPrice != null && chatMessage.offerStatus === "ACCEPTED",
  );

  const contactInformationUnlocked = !!acceptedOfferMessage;

  const sellerInfo =
    messages.find(
      (chatMessage) => chatMessage.sellerId && chatMessage.sellerName,
    ) || {};

  const selectedConversation = inbox.find(
    (chatMessage) =>
      String(chatMessage.animalId) === String(animalId) &&
      String(chatMessage.sellerId) === String(sellerId),
  );

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
      alert("Please select a conversation first.");
      return;
    }

    if (
      offerPrice &&
      (!Number.isFinite(Number(offerPrice)) || Number(offerPrice) <= 0)
    ) {
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
        setMessages((previousMessages) => [...previousMessages, response.data]);

        setMessage("");
        setOfferPrice("");

        loadInbox();
      })
      .catch((err) => {
        console.error("Error sending buyer message:", err);

        if (err.response) {
          console.error("Backend Status:", err.response.status);
          console.error("Backend Response:", err.response.data);
        }

        alert("Unable to send message.");
      })
      .finally(() => {
        setSending(false);
      });
  };

  // =====================================================
  // CUSTOMER ACCEPT SELLER OFFER
  // EXISTING LOGIC PRESERVED
  // =====================================================

  const handleAcceptOffer = (messageId) => {
    if (!messageId) {
      alert("Offer information is missing.");
      return;
    }

    if (!window.confirm("Are you sure you want to accept this seller offer?")) {
      return;
    }

    setActionLoading(true);

    axios
      .post(`${BASE_URL}/offer/${messageId}/accept`)
      .then(() => {
        alert("Seller offer accepted successfully. Order created.");
        loadConversation();
        loadInbox();
      })
      .catch((err) => {
        console.error("Error accepting seller offer:", err);

        if (err.response) {
          console.error("Backend Status:", err.response.status);
          console.error("Backend Response:", err.response.data);
        }

        alert("Unable to accept seller offer.");
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  // =====================================================
  // CUSTOMER REJECT SELLER OFFER
  // EXISTING LOGIC PRESERVED
  // =====================================================

  const handleRejectOffer = (messageId) => {
    if (!messageId) {
      alert("Offer information is missing.");
      return;
    }

    if (!window.confirm("Are you sure you want to reject this seller offer?")) {
      return;
    }

    setActionLoading(true);

    axios
      .post(`${BASE_URL}/offer/${messageId}/reject`)
      .then(() => {
        alert("Seller offer rejected successfully.");
        loadConversation();
        loadInbox();
      })
      .catch((err) => {
        console.error("Error rejecting seller offer:", err);

        if (err.response) {
          console.error("Backend Status:", err.response.status);
          console.error("Backend Response:", err.response.data);
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
    <div className="container-fluid container-lg py-4">
      <div className="mb-4">
        <h2 className="fw-bold text-primary">Messages / Chat</h2>

        <p className="text-muted mb-0">
          View your seller conversations and negotiate animal prices.
        </p>
      </div>

      <div className="row g-4">
        {/* =================================================
            BUYER INBOX
        ================================================= */}

        <div className="col-12 col-md-4 col-lg-3">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">My Conversations</h5>

              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={loadInbox}
                disabled={inboxLoading}
              >
                {inboxLoading ? "..." : "Refresh"}
              </button>
            </div>

            <div className="list-group list-group-flush">
              {inboxLoading && (
                <div className="p-3 text-muted">Loading conversations...</div>
              )}

              {inboxError && (
                <div className="p-3">
                  <div className="alert alert-danger mb-2">{inboxError}</div>

                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={loadInbox}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!inboxLoading && !inboxError && inbox.length === 0 && (
                <div className="p-3 text-muted">
                  No conversations found.
                  <div className="small mt-2">
                    Open an animal's details and start a chat with its seller.
                  </div>
                </div>
              )}

              {inbox.map((chatMessage) => {
                const isSelected =
                  String(chatMessage.animalId) === String(animalId) &&
                  String(chatMessage.sellerId) === String(sellerId);

                return (
                  <button
                    key={`${chatMessage.animalId}-${chatMessage.sellerId}`}
                    type="button"
                    className={`list-group-item list-group-item-action text-start ${
                      isSelected ? "active" : ""
                    }`}
                    onClick={() => handleSelectConversation(chatMessage)}
                  >
                    <div className="fw-bold">
                      {chatMessage.sellerName || "Seller"}
                    </div>

                    <div className="small">
                      Animal: {chatMessage.animalName || "Animal"}
                    </div>

                    <div
                      className="small text-truncate mt-1"
                      style={{ maxWidth: "100%" }}
                    >
                      {chatMessage.offerPrice != null
                        ? `Offer: ₹${Number(
                            chatMessage.offerPrice,
                          ).toLocaleString("en-IN")}`
                        : chatMessage.message || "Message"}
                    </div>

                    {chatMessage.createdAt && (
                      <div className="small mt-1 opacity-75">
                        {new Date(chatMessage.createdAt).toLocaleString()}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================
            SELECTED CONVERSATION
        ================================================= */}

        <div className="col-12 col-md-8 col-lg-9">
          {!animalId || !sellerId ? (
            <div className="card shadow border-0">
              <div className="card-body text-center py-5">
                <h4 className="text-primary">Select a Conversation</h4>

                <p className="text-muted mb-0">
                  Choose a seller conversation from the list to view messages
                  and continue negotiating.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* HEADER */}

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <div>
                  <h4 className="fw-bold mb-1">
                    {sellerInfo.sellerName ||
                      selectedConversation?.sellerName ||
                      "Seller Conversation"}
                  </h4>

                  <div className="text-muted small">
                    Animal:{" "}
                    {messages.find((item) => item.animalName)?.animalName ||
                      selectedConversation?.animalName ||
                      `#${animalId}`}
                  </div>
                </div>

                <Link
                  to={`/animal/${animalId}`}
                  className="btn btn-secondary btn-sm"
                >
                  ← Back to Animal
                </Link>
              </div>

              {/* CONTACT INFORMATION */}

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
                      Offer accepted. Seller contact information is now
                      available.
                    </div>
                  </div>
                </div>
              )}

              {!contactInformationUnlocked && (
                <div className="alert alert-warning">
                  🔒 Seller contact information will be available according to
                  your existing offer acceptance rules.
                </div>
              )}

              {/* CHAT CARD */}

              <div className="card shadow border-0">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Seller Conversation</h5>
                </div>

                <div className="card-body">
                  {loading && (
                    <div className="text-center py-3">
                      Loading conversation...
                    </div>
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
                          const isCustomer =
                            chatMessage.senderType === "CUSTOMER";

                          const isSellerOffer =
                            chatMessage.senderType === "SELLER" &&
                            chatMessage.offerPrice != null;

                          const isPendingSellerOffer =
                            isSellerOffer &&
                            chatMessage.offerStatus === "PENDING";

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
                                style={{ maxWidth: "75%" }}
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
                                      ₹
                                      {Number(
                                        chatMessage.offerPrice,
                                      ).toLocaleString("en-IN")}
                                    </strong>

                                    <div className="small mt-1">
                                      Status:{" "}
                                      {chatMessage.offerStatus || "PENDING"}
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
                                    {new Date(
                                      chatMessage.createdAt,
                                    ).toLocaleString()}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* SEND MESSAGE */}

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

                  {/* CUSTOMER OFFER */}

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

                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSend}
                      disabled={sending || loading || !!error}
                    >
                      {sending ? "Sending..." : "Send Message / Offer"}
                    </button>

                    <Link
                      to={`/animal/${animalId}`}
                      className="btn btn-secondary"
                    >
                      Back to Animal
                    </Link>
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

export default BuyerChat;
