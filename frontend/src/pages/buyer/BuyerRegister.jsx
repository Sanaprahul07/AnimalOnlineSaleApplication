import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BuyerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // TEXT FIELD CHANGE
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // PROFILE IMAGE CHANGE
  // =====================================================

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setProfileImage(null);
      return;
    }

    // =================================================
    // ALLOWED IMAGE TYPES
    // =================================================

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Profile image must be JPG, JPEG, PNG or WEBP.");

      e.target.value = "";
      setProfileImage(null);

      return;
    }

    // =================================================
    // MAXIMUM IMAGE SIZE - 10 MB
    // =================================================

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Profile image size must not exceed 10 MB.");

      e.target.value = "";
      setProfileImage(null);

      return;
    }

    setError("");
    setProfileImage(file);
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // =================================================
    // EXISTING VALIDATION
    // =================================================

    if (!formData.name.trim()) {
      setError("Please enter buyer name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter email.");
      return;
    }

    if (!formData.mobile.trim()) {
      setError("Please enter mobile number.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter password.");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // FORM DATA
      // =================================================

      const registrationData = new FormData();

      registrationData.append("customerName", formData.name);

      registrationData.append("email", formData.email);

      registrationData.append("mobile", formData.mobile);

      registrationData.append("address", formData.address);

      registrationData.append("city", formData.city);

      registrationData.append("state", formData.state);

      registrationData.append("pincode", formData.pincode);

      registrationData.append("password", formData.password);

      // =================================================
      // OPTIONAL PROFILE IMAGE
      // =================================================

      if (profileImage) {
        registrationData.append("profileImage", profileImage);
      }

      // =================================================
      // CUSTOMER REGISTER API
      // =================================================

      const response = await axios.post(
        "http://localhost:8080/api/customer/register",
        registrationData,
      );

      console.log("Customer Registration Response:", response.data);

      // =================================================
      // SUCCESS
      // =================================================

      alert("Registration successful. Please login.");

      navigate("/buyer/login");
    } catch (error) {
      console.error("Buyer Registration Error:", error);

      const backendMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || error.response?.data?.error;

      setError(backendMessage || "Unable to register buyer account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f7f6",
        padding: "30px 15px",
      }}
    >
      <div
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.10)",
        }}
      >
        <div className="row g-0">
          {/* =================================================
              LEFT BUYER INFORMATION PANEL
          ================================================= */}

          <div
            className="col-lg-4"
            style={{
              background: "linear-gradient(160deg, #007f7f, #006666)",
              color: "#ffffff",
              padding: "38px 30px",
              minHeight: "760px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {/* =================================================
                BRAND
            ================================================= */}

            <div className="mb-5">
              <h3
                className="fw-bold mb-1"
                style={{
                  fontSize: "24px",
                }}
              >
                🐄 AnimalSale
              </h3>

              <small>Buy & Sell Healthy Animals Online</small>
            </div>

            {/* =================================================
                TITLE
            ================================================= */}

            <div className="mb-4">
              <h2
                className="fw-bold mb-2"
                style={{
                  fontSize: "28px",
                }}
              >
                Create Your Buyer Account
              </h2>

              <p
                className="mb-0"
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                Join AnimalSale and find healthy animals from trusted sellers.
              </p>
            </div>

            {/* =================================================
                BENEFITS
            ================================================= */}

            <div className="mb-4">
              <div className="d-flex align-items-start mb-3">
                <span
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    color: "#007f7f",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    marginRight: "10px",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>

                <div>
                  <strong>Browse Healthy Animals</strong>

                  <div
                    style={{
                      fontSize: "12px",
                      marginTop: "3px",
                    }}
                  >
                    Explore animals listed by sellers.
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <span
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    color: "#007f7f",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    marginRight: "10px",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>

                <div>
                  <strong>Chat With Sellers</strong>

                  <div
                    style={{
                      fontSize: "12px",
                      marginTop: "3px",
                    }}
                  >
                    Discuss animal details directly.
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <span
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    color: "#007f7f",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    marginRight: "10px",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>

                <div>
                  <strong>Make Offers & Buy</strong>

                  <div
                    style={{
                      fontSize: "12px",
                      marginTop: "3px",
                    }}
                  >
                    Make offers and purchase animals securely.
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                WHY BUY FROM ANIMALSALE
            ================================================= */}

            <div
              style={{
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "7px",
                padding: "15px",
                marginTop: "10px",
              }}
            >
              <h6 className="fw-bold mb-2">Why become a buyer?</h6>

              <p
                className="mb-0"
                style={{
                  fontSize: "12px",
                  lineHeight: "1.5",
                }}
              >
                Find suitable animals, communicate with sellers and make better
                buying decisions through AnimalSale.
              </p>
            </div>

            {/* =================================================
                LOGIN
            ================================================= */}

            <div
              style={{
                marginTop: "auto",
                fontSize: "13px",
              }}
            >
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/buyer/login")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "#ffffff",
                  textDecoration: "underline",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </div>
          </div>

          {/* =================================================
              RIGHT REGISTRATION PANEL
          ================================================= */}

          <div
            className="col-lg-8"
            style={{
              padding: "0 28px 30px",
            }}
          >
            {/* =================================================
                HEADER
            ================================================= */}

            <div
              style={{
                margin: "0 -28px 25px",
                padding: "15px 20px",
                background: "#009688",
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              <h4 className="fw-bold mb-1">Buyer Registration</h4>

              <small>Create your buyer account</small>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}

              <div className="mb-4">
                <h6
                  className="fw-bold"
                  style={{
                    color: "#008577",
                    borderBottom: "1px solid #dddddd",
                    paddingBottom: "8px",
                  }}
                >
                  Basic Information
                </h6>

                <div className="row">
                  {/* BUYER NAME */}

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Buyer Name *</label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter buyer name"
                    />
                  </div>

                  {/* EMAIL */}

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </div>

                  {/* MOBILE */}

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mobile Number *</label>

                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                    />
                  </div>

                  {/* PASSWORD */}

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password *</label>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />
                  </div>
                </div>
              </div>

              {/* =================================================
                  ADDRESS INFORMATION
              ================================================= */}

              <div className="mb-4">
                <h6
                  className="fw-bold"
                  style={{
                    color: "#008577",
                    borderBottom: "1px solid #dddddd",
                    paddingBottom: "8px",
                  }}
                >
                  Address Information
                </h6>

                <div className="row">
                  {/* ADDRESS */}

                  <div className="col-12 mb-3">
                    <label className="form-label">Address</label>

                    <textarea
                      name="address"
                      className="form-control"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                      rows="3"
                    />
                  </div>

                  {/* CITY */}

                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>

                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </div>

                  {/* STATE */}

                  <div className="col-md-6 mb-3">
                    <label className="form-label">State</label>

                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />
                  </div>

                  {/* PINCODE */}

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pincode</label>

                    <input
                      type="text"
                      name="pincode"
                      className="form-control"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter 6 digit pincode"
                    />
                  </div>
                </div>
              </div>

              {/* =================================================
                  PROFILE INFORMATION
              ================================================= */}

              <div className="mb-4">
                <h6
                  className="fw-bold"
                  style={{
                    color: "#008577",
                    borderBottom: "1px solid #dddddd",
                    paddingBottom: "8px",
                  }}
                >
                  Profile Information
                </h6>

                <div className="row">
                  <div className="col-12 mb-2">
                    <label className="form-label">
                      Profile Image{" "}
                      <span className="text-muted">(Optional)</span>
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleProfileImageChange}
                    />

                    <small className="text-muted">
                      JPG, JPEG, PNG or WEBP. Maximum size: 10 MB.
                    </small>
                  </div>
                </div>
              </div>

              {/* =================================================
                  REGISTER + BACK BUTTON
              ================================================= */}

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn flex-grow-1"
                  style={{
                    background: "#008577",
                    color: "#ffffff",
                    fontWeight: "600",
                    padding: "11px",
                    borderRadius: "6px",
                  }}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate(-1)}
                  style={{
                    padding: "11px 22px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  ← Back
                </button>
              </div>
            </form>

            {/* =================================================
                LOGIN
            ================================================= */}

            <div className="text-center mt-3">
              <span>Already have an account? </span>

              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => navigate("/buyer/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerRegister;
