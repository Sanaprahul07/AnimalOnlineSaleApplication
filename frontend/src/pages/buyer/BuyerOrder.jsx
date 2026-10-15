import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnimalById } from "../../services/AnimalService";
import { createOrder } from "../../services/OrderService";

function BuyerOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [order, setOrder] = useState(null);

  // Load selected animal
  useEffect(() => {
    let isMounted = true;

    const fetchAnimal = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await getAnimalById(id);

        if (isMounted) {
          setAnimal(response.data);
        }
      } catch (error) {
        console.error("Error getting animal for order:", error);

        const data = error.response?.data;
        const message =
          typeof data === "string" ? data : data?.message || data?.error;

        if (isMounted) {
          setErrorMessage(message || "Unable to load animal details.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAnimal();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const animalPrice = Number(animal?.price || 0);

  // Display estimate using the existing backend 5% commission rule.
  const commission = animalPrice * 0.05;
  const estimatedTotal = animalPrice + commission;

  // Create order at the listed asking price.
  const handlePlaceOrder = async () => {
    if (placingOrder) {
      return;
    }

    setErrorMessage("");

    const customerId = localStorage.getItem("customerId");

    if (!customerId) {
      localStorage.setItem("pendingAnimalId", String(id));
      navigate("/buyer/login");
      return;
    }

    if (!animal) {
      setErrorMessage("Animal details are not available.");
      return;
    }

    if (!animal.available) {
      setErrorMessage("This animal is already sold or not available.");
      return;
    }

    if (!Number.isFinite(animalPrice) || animalPrice <= 0) {
      setErrorMessage("The animal asking price is invalid.");
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await createOrder(customerId, id);

      if (!response.data) {
        throw new Error("The server did not return order details.");
      }

      console.log("Order created successfully:", response.data);
      setOrder(response.data);
    } catch (error) {
      console.error("Place order error:", error);

      const data = error.response?.data;
      const backendMessage =
        typeof data === "string" ? data : data?.message || data?.error;

      setErrorMessage(
        backendMessage ||
          error.message ||
          "Unable to create the order. Please try again.",
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-success" role="status" />
        <p className="mt-3">Loading order details...</p>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {errorMessage || "Animal details not found."}
        </div>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  // Order confirmation
  if (order) {
    const confirmedTotal =
      order.totalAmount != null ? Number(order.totalAmount) : estimatedTotal;

    return (
      <div className="container mt-5 mb-5">
        <div className="card shadow border-0">
          <div className="card-body p-5 text-center">
            <div className="text-success mb-3" style={{ fontSize: "60px" }}>
              ✓
            </div>

            <h2 className="text-success fw-bold">Order Created Successfully</h2>

            <p className="text-muted mt-3">
              Your order has been created. The seller can process the order
              according to the order status.
            </p>

            <hr />

            <div className="row text-start mt-4">
              <div className="col-md-6 mb-3">
                <strong>Order ID:</strong>
                <div>{order.id ?? "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Order Number:</strong>
                <div>{order.orderNumber || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Animal:</strong>
                <div>{order.animalName || animal.animalName}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Total Amount:</strong>
                <div className="text-success fw-bold">
                  ₹ {formatPrice(confirmedTotal)}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Order Status:</strong>
                <div>{order.status || "PENDING"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Payment Status:</strong>
                <div>{order.paymentStatus || "PENDING"}</div>
              </div>
            </div>

            <button
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

  if (!animal.available) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          This animal is already sold or not available.
        </div>

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="text-success fw-bold mb-4">Buy Animal</h2>

      <div className="row">
        {/* Animal image */}
        <div className="col-md-6 mb-4">
          <div className="card shadow h-100">
            {animal.frontImageUrl ? (
              <img
                src={animal.frontImageUrl}
                className="card-img-top"
                alt={animal.animalName || "Animal"}
                style={{
                  height: "400px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light"
                style={{ height: "400px" }}
              >
                No Animal Photo
              </div>
            )}

            <div className="card-body">
              <h4 className="text-success fw-bold">{animal.animalName}</h4>

              <p>
                <strong>Animal ID:</strong> {animal.id}
              </p>

              <p>
                <strong>Category:</strong> {animal.category || "-"}
              </p>

              <p>
                <strong>Breed:</strong> {animal.breed || "-"}
              </p>

              <p>
                <strong>Age:</strong> {animal.age ?? "-"}
              </p>

              <p>
                <strong>Gender:</strong> {animal.gender || "-"}
              </p>

              <p>
                <strong>Location:</strong> {animal.location || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Checkout summary */}
        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3">Order Summary</h4>

              <div className="alert alert-info">
                You are buying this animal at the seller's listed asking price.
                No bid or offer is created by Buy Now.
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Animal Asking Price</span>
                <strong>₹ {formatPrice(animalPrice)}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Service Commission (5%)</span>
                <span>₹ {formatPrice(commission)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <strong>Estimated Total</strong>
                <strong className="text-success fs-5">
                  ₹ {formatPrice(estimatedTotal)}
                </strong>
              </div>

              <small className="text-muted d-block mt-2">
                The final total is determined by the backend when the order is
                created.
              </small>

              {errorMessage && (
                <div className="alert alert-danger mt-3">{errorMessage}</div>
              )}

              <button
                type="button"
                className="btn btn-success w-100 mt-4"
                onClick={handlePlaceOrder}
                disabled={placingOrder}
              >
                {placingOrder ? "Creating Order..." : "Confirm Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerOrder;
