import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimalById } from "../services/AnimalService";
import { createBid, getBidsByAnimal } from "../services/BidService";

function AnimalDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // BID STATES
  // =====================================================

  const [bidAmount, setBidAmount] = useState("");
  const [showBidForm, setShowBidForm] = useState(false);

  // =====================================================
  // CURRENT BID STATES
  // =====================================================

  const [currentHighestBid, setCurrentHighestBid] = useState(0);
  const [hasExistingBids, setHasExistingBids] = useState(false);
  const [bidLoading, setBidLoading] = useState(false);

  // =====================================================
  // GET ANIMAL DETAILS
  // =====================================================

  useEffect(() => {

    const fetchAnimal = async () => {

      try {

        setLoading(true);
        setErrorMessage("");

        const response = await getAnimalById(id);

        console.log("=================================");
        console.log("ANIMAL DETAILS RESPONSE");
        console.log(response.data);

        console.log(
          "Front Image URL:",
          response.data?.frontImageUrl
        );

        console.log(
          "Side Image URL:",
          response.data?.sideImageUrl
        );

        console.log(
          "Back Image URL:",
          response.data?.backImageUrl
        );

        console.log("=================================");

        setAnimal(response.data);

        // =================================================
        // LOAD EXISTING BIDS FOR THIS ANIMAL
        // =================================================

        try {

          const bidResponse = await getBidsByAnimal(
            response.data.id
          );

          const bids = Array.isArray(bidResponse.data)
            ? bidResponse.data
            : [];

          console.log("=================================");
          console.log(
            "EXISTING BIDS FOR ANIMAL:",
            bids
          );
          console.log("=================================");

          if (bids.length > 0) {

            setHasExistingBids(true);

            const validBids = bids
              .filter(
                (bid) =>
                  bid &&
                  bid.bidAmount != null &&
                  Number(bid.bidAmount) > 0
              )
              .map(
                (bid) =>
                  Number(bid.bidAmount)
              );

            if (validBids.length > 0) {

              const highestBid = Math.max(
                ...validBids
              );

              if (
                Number.isFinite(highestBid) &&
                highestBid > 0
              ) {

                setCurrentHighestBid(
                  highestBid
                );

              } else {

                setCurrentHighestBid(0);

              }

            } else {

              setCurrentHighestBid(0);

            }

          } else {

            // =================================================
            // NO BID YET
            // Animal price is NOT the highest bid.
            // =================================================

            setHasExistingBids(false);
            setCurrentHighestBid(0);

          }

        } catch (bidError) {

          console.error(
            "Error loading existing bids:",
            bidError
          );

          // =================================================
          // IF BIDS CANNOT BE LOADED
          // START WITH NO BID
          // =================================================

          setHasExistingBids(false);
          setCurrentHighestBid(0);

        }

      } catch (error) {

        console.error(
          "Error getting animal details:",
          error
        );

        if (error.response) {

          console.error(
            "Backend Response:",
            error.response.data
          );

          setErrorMessage(
            error.response.data?.message ||
            "Animal details not found."
          );

        } else {

          setErrorMessage(
            "Backend server is not running."
          );

        }

      } finally {

        setLoading(false);

      }

    };

    fetchAnimal();

  }, [id]);

  // =====================================================
  // REFRESH CURRENT HIGHEST BID
  // =====================================================

  const refreshHighestBid = async () => {

    try {

      const response = await getBidsByAnimal(
        animal.id
      );

      const bids = Array.isArray(response.data)
        ? response.data
        : [];

      if (bids.length === 0) {

        setHasExistingBids(false);
        setCurrentHighestBid(0);

        return;
      }

      const validBids = bids
        .filter(
          (bid) =>
            bid &&
            bid.bidAmount != null &&
            Number(bid.bidAmount) > 0
        )
        .map(
          (bid) =>
            Number(bid.bidAmount)
        );

      if (validBids.length === 0) {

        setHasExistingBids(false);
        setCurrentHighestBid(0);

        return;
      }

      const highestBid = Math.max(
        ...validBids
      );

      setHasExistingBids(true);
      setCurrentHighestBid(highestBid);

    } catch (error) {

      console.error(
        "Error refreshing highest bid:",
        error
      );

    }

  };

  // =====================================================
  // BUY NOW / START BIDDING
  // =====================================================

  const handleBuyNow = () => {

    const customerId =
      localStorage.getItem("customerId");

    console.log("=================================");
    console.log("BUY NOW CLICKED");
    console.log("Animal ID:", animal.id);
    console.log("Customer ID:", customerId);
    console.log("=================================");

    // =====================================================
    // CUSTOMER NOT LOGGED IN
    // =====================================================

    if (!customerId) {

      localStorage.setItem(
        "pendingAnimalId",
        String(animal.id)
      );

      console.log(
        "Customer not logged in"
      );

      console.log(
        "Redirecting to Buyer Register"
      );

      navigate("/buyer/register");

      return;
    }

    // =====================================================
    // CUSTOMER ALREADY LOGGED IN
    // =====================================================

    console.log(
      "Customer already logged in"
    );

    console.log(
      "Opening bidding section"
    );

    setShowBidForm(true);

  };

  // =====================================================
  // PLACE BID
  // =====================================================

  const handlePlaceBid = async () => {

    const customerId =
      localStorage.getItem("customerId");

    console.log("=================================");
    console.log("PLACE BID CLICKED");
    console.log("Animal ID:", animal.id);
    console.log("Customer ID:", customerId);
    console.log("Bid Amount:", bidAmount);
    console.log(
      "Current Highest Bid:",
      currentHighestBid
    );
    console.log(
      "Has Existing Bids:",
      hasExistingBids
    );
    console.log("=================================");

    // =====================================================
    // CUSTOMER NOT LOGGED IN
    // =====================================================

    if (!customerId) {

      localStorage.setItem(
        "pendingAnimalId",
        String(animal.id)
      );

      localStorage.setItem(
        "pendingBidAmount",
        String(bidAmount)
      );

      console.log(
        "Customer not logged in"
      );

      console.log(
        "Redirecting to Buyer Register"
      );

      navigate("/buyer/register");

      return;
    }

    // =====================================================
    // BID AMOUNT VALIDATION
    // =====================================================

    if (
      !bidAmount ||
      Number(bidAmount) <= 0
    ) {

      alert(
        "Please enter a valid bid amount."
      );

      return;
    }

    // =====================================================
    // CHECK ANIMAL PRICE
    // =====================================================

    if (
      animal.price == null ||
      Number(animal.price) <= 0
    ) {

      alert(
        "Animal price is not available."
      );

      return;
    }

    // =====================================================
    // BIDDING RULE
    // =====================================================
    //
    // Animal price is only the
    // listed/reference price.
    //
    // Bid can be any amount greater than ₹0.
    //
    // Example:
    //
    // Animal Price = ₹10000
    //
    // Customer = ₹8000  -> ALLOWED
    // Customer = ₹10000 -> ALLOWED
    // Customer = ₹12000 -> ALLOWED
    //
    // =====================================================

    if (Number(bidAmount) <= 0) {

      alert(
        "Bid amount must be greater than ₹0."
      );

      return;
    }

    // =====================================================
    // CREATE BID API
    // =====================================================

    try {

      setBidLoading(true);

      // =================================================
      // IMPORTANT FIX
      // bidAmount MUST be passed here
      // =================================================

     const response = await createBid(
  customerId,
  animal.id,
  Number(bidAmount),
);

      console.log(
        "Bid created successfully:",
        response.data
      );

      alert(
        "Bid placed successfully!"
      );

      setBidAmount("");

      // =================================================
      // REFRESH HIGHEST BID
      // =================================================

      await refreshHighestBid();

      // =================================================
      // KEEP BID FORM OPEN
      // =================================================

      setShowBidForm(true);

    } catch (error) {

      console.error(
        "Error creating bid:",
        error
      );

      if (error.response) {

        console.error(
          "Backend Response:",
          error.response.data
        );

        alert(
          error.response.data?.message ||
          error.response.data ||
          "Failed to place bid."
        );

      } else {

        alert(
          "Backend server is not running."
        );

      }

    } finally {

      setBidLoading(false);

    }

  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="container mt-5">

        <div className="text-center">

          <div
            className="spinner-border text-success"
            role="status"
          ></div>

          <p className="mt-3">
            Loading animal details...
          </p>

        </div>

      </div>

    );

  }

  // =====================================================
  // ERROR
  // =====================================================

  if (errorMessage) {

    return (

      <div className="container mt-5">

        <div className="alert alert-danger">

          <strong>Error:</strong>{" "}
          {errorMessage}

        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

      </div>

    );

  }

  // =====================================================
  // ANIMAL NOT FOUND
  // =====================================================

  if (!animal) {

    return (

      <div className="container mt-5">

        <div className="alert alert-warning">

          Animal not found.

        </div>

      </div>

    );

  }

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="container mt-4 mb-5">

      {/* ==================================
          BACK BUTTON
          ================================== */}

      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* ==================================
          MAIN CARD
          ================================== */}

      <div className="card shadow border-0">

        <div className="card-body p-4">

          <h2 className="text-success fw-bold mb-4">
            {animal.animalName}
          </h2>

          {/* ==================================
              ANIMAL PHOTOS
              ================================== */}

          <h5 className="fw-bold mb-3">
            Animal Photos
          </h5>

          <div className="row mb-4">

            {/* ==================================
                FRONT PHOTO
                ================================== */}

            <div className="col-md-4 mb-3">

              <div className="card h-100">

                {animal.frontImageUrl ? (

                  <img
                    src={animal.frontImageUrl}
                    className="card-img-top"
                    alt="Front Animal"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {

                      console.error(
                        "Front image failed:",
                        animal.frontImageUrl
                      );

                      e.currentTarget.style.display =
                        "none";

                    }}
                  />

                ) : (

                  <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{
                      height: "250px",
                    }}
                  >
                    No Front Photo
                  </div>

                )}

                <div className="card-body text-center">

                  <strong>
                    Front Photo
                  </strong>

                </div>

              </div>

            </div>

            {/* ==================================
                SIDE PHOTO
                ================================== */}

            <div className="col-md-4 mb-3">

              <div className="card h-100">

                {animal.sideImageUrl ? (

                  <img
                    src={animal.sideImageUrl}
                    className="card-img-top"
                    alt="Side Animal"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {

                      console.error(
                        "Side image failed:",
                        animal.sideImageUrl
                      );

                      e.currentTarget.style.display =
                        "none";

                    }}
                  />

                ) : (

                  <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{
                      height: "250px",
                    }}
                  >
                    No Side Photo
                  </div>

                )}

                <div className="card-body text-center">

                  <strong>
                    Side Photo
                  </strong>

                </div>

              </div>

            </div>

            {/* ==================================
                BACK PHOTO
                ================================== */}

            <div className="col-md-4 mb-3">

              <div className="card h-100">

                {animal.backImageUrl ? (

                  <img
                    src={animal.backImageUrl}
                    className="card-img-top"
                    alt="Back Animal"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {

                      console.error(
                        "Back image failed:",
                        animal.backImageUrl
                      );

                      e.currentTarget.style.display =
                        "none";

                    }}
                  />

                ) : (

                  <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{
                      height: "250px",
                    }}
                  >
                    No Back Photo
                  </div>

                )}

                <div className="card-body text-center">

                  <strong>
                    Back Photo
                  </strong>

                </div>

              </div>

            </div>

          </div>

          {/* ==================================
              ANIMAL DETAILS
              ================================== */}

          <h5 className="fw-bold text-success mb-3">
            Animal Details
          </h5>

          <div className="row">

            <div className="col-md-6 mb-3">

              <strong>Animal ID:</strong>

              <br />

              {animal.id}

            </div>

            <div className="col-md-6 mb-3">

              <strong>Animal Name:</strong>

              <br />

              {animal.animalName}

            </div>

            <div className="col-md-6 mb-3">

              <strong>Category:</strong>

              <br />

              {animal.category}

            </div>

            <div className="col-md-6 mb-3">

              <strong>Breed:</strong>

              <br />

              {animal.breed}

            </div>

            <div className="col-md-6 mb-3">

              <strong>Age:</strong>

              <br />

              {animal.age}

            </div>

            <div className="col-md-6 mb-3">

              <strong>Gender:</strong>

              <br />

              {animal.gender}

            </div>

            <div className="col-md-6 mb-3">

              <strong>Price:</strong>

              <br />

              <span className="text-success fw-bold">

                ₹ {animal.price}

              </span>

            </div>

            <div className="col-md-6 mb-3">

              <strong>Location:</strong>

              <br />

              {animal.location}

            </div>

            <div className="col-12 mb-3">

              <strong>Description:</strong>

              <p className="mt-2">

                {animal.description ||
                  "No description available."}

              </p>

            </div>

            <div className="col-12">

              <strong>Availability:</strong>

              <span
                className={
                  animal.available
                    ? "badge bg-success ms-2"
                    : "badge bg-danger ms-2"
                }
              >

                {animal.available
                  ? "Available"
                  : "Not Available"}

              </span>

            </div>

            {/* ==========================================
                BUY NOW
                ========================================== */}

            <div className="mt-4 text-center">

              {animal.available ? (

                <button
                  type="button"
                  className="btn btn-success px-4 me-2"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>

              ) : (

                <button
                  type="button"
                  className="btn btn-secondary px-4 me-2"
                  disabled
                >
                  Not Available
                </button>

              )}

              {/* ==========================================
                  PLACE BID
                  ========================================== */}

              {animal.available && (

                <button
                  type="button"
                  className="btn btn-warning px-4"
                  onClick={() => {

                    setShowBidForm(
                      !showBidForm
                    );

                  }}
                >

                  {showBidForm
                    ? "Cancel Bid"
                    : "Place Bid"}

                </button>

              )}

            </div>

            {/* ==========================================
                BID FORM
                ========================================== */}

            {showBidForm &&
              animal.available && (

                <div className="mt-4">

                  <div className="card border-warning">

                    <div className="card-body">

                      <h5 className="fw-bold text-warning">
                        Place Your Bid
                      </h5>

                      {/* =================================
                          LISTED / ANIMAL PRICE
                          ================================= */}

                      <p className="mb-2">

                        Animal Price:{" "}

                        <strong>

                          ₹ {animal.price}

                        </strong>

                      </p>

                      {/* =================================
                          CURRENT HIGHEST BID
                          ================================= */}

                      <p className="mb-3">

                        Current Highest Bid:{" "}

                        <strong className="text-success">

                          {hasExistingBids
                            ? `₹ ${currentHighestBid}`
                            : "No bids yet"}

                        </strong>

                      </p>

                      {/* =================================
                          BIDDING RULE
                          ================================= */}

                      <div className="alert alert-info">

                        <span>

                          You can enter any bid
                          amount greater than{" "}

                          <strong>
                            ₹ 0
                          </strong>

                          .

                          <br />

                          Animal Price ₹{" "}
                          {animal.price} is only the
                          listed/reference price.

                        </span>

                      </div>

                      <div className="row">

                        <div className="col-md-8">

                          <label className="form-label fw-bold">

                            Enter Bid Amount

                          </label>

                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter bid amount"
                            value={bidAmount}
                            min={1}
                            onChange={(e) =>
                              setBidAmount(
                                e.target.value
                              )
                            }
                          />

                        </div>

                        <div className="col-md-4 d-flex align-items-end">

                          <button
                            type="button"
                            className="btn btn-warning w-100"
                            onClick={
                              handlePlaceBid
                            }
                            disabled={
                              bidLoading
                            }
                          >

                            {bidLoading
                              ? "Submitting..."
                              : "Submit Bid"}

                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              )}

          </div>

        </div>

      </div>

    </div>

  );
}

export default AnimalDetails;