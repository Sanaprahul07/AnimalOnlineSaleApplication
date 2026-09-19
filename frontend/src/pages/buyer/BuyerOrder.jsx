import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAnimalById } from "../../services/AnimalService";

function BuyerOrder() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [placingOrder, setPlacingOrder] = useState(false);

  const [order, setOrder] = useState(null);

  // ==========================================
  // GET SELECTED ANIMAL
  // ==========================================

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await getAnimalById(id);

        console.log("Buyer Order - Animal Response:", response.data);

        setAnimal(response.data);
      } catch (error) {
        console.error("Error getting animal for order:", error);

        if (error.response) {
          const backendMessage =
            typeof error.response.data === "string"
              ? error.response.data
              : error.response.data?.message || error.response.data?.error;

          setErrorMessage(backendMessage || "Animal details not found.");
        } else {
          setErrorMessage("Backend server is not running.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async () => {
    setErrorMessage("");

    // ==========================================
    // CHECK CUSTOMER LOGIN
    // ==========================================

    const customerId = localStorage.getItem("customerId");

    if (!customerId) {
      localStorage.setItem("pendingAnimalId", String(id));

      navigate("/buyer/login");

      return;
    }

    // ==========================================
    // CHECK ANIMAL
    // ==========================================

    if (!animal) {
      setErrorMessage("Animal details are not available.");

      return;
    }

    if (!animal.available) {
      setErrorMessage("This animal is already sold or not available.");

      return;
    }

    try {
      setPlacingOrder(true);

      console.log(
        "Creating Order...",
        "Customer ID:",
        customerId,
        "Animal ID:",
        id,
      );

      // ==========================================
      // CREATE ORDER API
      // POST /api/orders/create
      // ==========================================

      const response = await axios.post(
        "http://localhost:8080/api/orders/create",
        null,
        {
          params: {
            buyerId: Number(customerId),
            animalId: Number(id),
          },
        },
      );

      console.log("Order Created Successfully:", response.data);

      setOrder(response.data);
    } catch (error) {
      console.error("Place Order Error:", error);

      if (error.response) {
        const backendMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data?.message || error.response.data?.error;

        setErrorMessage(backendMessage || "Unable to create order.");
      } else {
        setErrorMessage("Backend server is not running.");
      }
    } finally {
      setPlacingOrder(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-success" role="status"></div>

          <p className="mt-3">Loading order details...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (errorMessage && !animal) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{errorMessage}</div>

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    );
  }

  // ==========================================
  // ANIMAL NOT FOUND
  // ==========================================

  if (!animal) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Animal not found.</div>
      </div>
    );
  }

  // ==========================================
  // CHECK AVAILABILITY
  // ==========================================

  if (!animal.available && !order) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          This animal is already sold or not available.
        </div>

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    );
  }

  // ==========================================
  // ORDER CREATED SUCCESSFULLY
  // ==========================================

  if (order) {
    return (
      <div className="container mt-5 mb-5">
        <div className="card shadow border-0">
          <div className="card-body p-5 text-center">
            <div className="mb-3">
              <span className="text-success" style={{ fontSize: "60px" }}>
                ✓
              </span>
            </div>

            <h2 className="text-success fw-bold">Order Created Successfully</h2>

            <p className="text-muted mt-3">
              Your animal order has been created successfully.
            </p>

            <hr />

            <div className="row text-start mt-4">
              <div className="col-md-6 mb-3">
                <strong>Order ID:</strong>
                <br />
                {order.id}
              </div>

              <div className="col-md-6 mb-3">
                <strong>Order Number:</strong>
                <br />
                {order.orderNumber || "-"}
              </div>

              <div className="col-md-6 mb-3">
                <strong>Animal:</strong>
                <br />
                {order.animalName || animal.animalName}
              </div>

              <div className="col-md-6 mb-3">
                <strong>Amount:</strong>
                <br />₹ {order.totalAmount ?? animal.price}
              </div>

              <div className="col-md-6 mb-3">
                <strong>Order Status:</strong>
                <br />
                {order.status || "-"}
              </div>

              <div className="col-md-6 mb-3">
                <strong>Payment Status:</strong>
                <br />
                {order.paymentStatus || "-"}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-success mt-3"
              onClick={() => navigate("/buyer/dashboard")}
            >
              Go to Buyer Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ORDER PAGE
  // ==========================================

  return (
    <div className="container mt-4 mb-5">
      {/* ==================================
                  BACK BUTTON
          ================================== */}

      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* ==================================
                  PAGE TITLE
          ================================== */}

      <h2 className="text-success fw-bold mb-4">Order Animal</h2>

      <div className="row">
        {/* ==================================
                    ANIMAL IMAGE
            ================================== */}

        <div className="col-md-6 mb-4">
          <div className="card shadow">
            {animal.frontImageUrl ? (
              <img
                src={animal.frontImageUrl}
                className="card-img-top"
                alt={animal.animalName}
                style={{
                  height: "400px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light"
                style={{
                  height: "400px",
                }}
              >
                No Animal Photo
              </div>
            )}
          </div>
        </div>

        {/* ==================================
                    ORDER DETAILS
            ================================== */}

        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="text-success fw-bold mb-4">{animal.animalName}</h3>

              <p>
                <strong>Animal ID:</strong> {animal.id}
              </p>

              <p>
                <strong>Category:</strong> {animal.category}
              </p>

              <p>
                <strong>Breed:</strong> {animal.breed}
              </p>

              <p>
                <strong>Age:</strong> {animal.age}
              </p>

              <p>
                <strong>Gender:</strong> {animal.gender}
              </p>

              <p>
                <strong>Location:</strong> {animal.location}
              </p>

              <hr />

              <h5>Price</h5>

              <h3 className="text-success fw-bold">₹ {animal.price}</h3>

              <hr />

              <h5>Order Summary</h5>

              <div className="d-flex justify-content-between mt-3">
                <span>Animal Price</span>

                <span>₹ {animal.price}</span>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <strong>Total Amount</strong>

                <strong className="text-success">₹ {animal.price}</strong>
              </div>

              {/* ==================================
                        ERROR MESSAGE
                  ================================== */}

              {errorMessage && (
                <div className="alert alert-danger mt-3">{errorMessage}</div>
              )}

              {/* ==================================
                        PLACE ORDER
                  ================================== */}

              <button
                className="btn btn-success w-100 mt-4"
                onClick={handlePlaceOrder}
                disabled={placingOrder}
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerOrder;
