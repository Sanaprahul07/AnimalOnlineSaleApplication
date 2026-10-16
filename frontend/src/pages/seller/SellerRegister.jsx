import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../config/api";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import {
  registerSeller,
  resendEmailOtp,
  verifyEmailOtp,
  getSellerSubscriptionPlans,
  submitSellerPayment,
} from "../../services/SellerService";

import "./SellerRegister.css";

// =========================================================
// LOCATION EVENT HANDLER
// =========================================================

function LocationEvents({ onLocationFound, onLocationError }) {
  useMapEvents({
    locationfound: (e) => {
      onLocationFound(e.latlng.lat, e.latlng.lng, e.accuracy);
    },

    locationerror: (e) => {
      onLocationError(e.message || "Unable to get your current location.");
    },
  });

  return null;
}

// =========================================================
// CURRENT LOCATION BUTTON
// =========================================================

function LocateButton({ onStart }) {
  const map = useMap();

  const handleCurrentLocation = () => {
    onStart();

    map.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true,
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
      }}
    >
      <button
        type="button"
        onClick={handleCurrentLocation}
        style={{
          background: "#008577",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          padding: "9px 14px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.20)",
        }}
      >
        📍 Use Current Location
      </button>
    </div>
  );
}

// =========================================================
// SELLER REGISTRATION
// =========================================================

function SellerRegister() {
  const navigate = useNavigate();

  // =========================================================
  // SELLER INFORMATION
  // =========================================================

  const [sellerName, setSellerName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [farmName, setFarmName] = useState("");

  // =========================================================
  // KYC
  // =========================================================

  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [aadhaarFrontFile, setAadhaarFrontFile] = useState(null);
  const [aadhaarBackFile, setAadhaarBackFile] = useState(null);

  // =========================================================
  // ADDRESS
  // =========================================================

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState("");

  // =========================================================
  // GEO LOCATION
  // =========================================================

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationAccuracy, setLocationAccuracy] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  // =========================================================
  // PROFILE IMAGE
  // =========================================================

  const [profileImage, setProfileImage] = useState(null);

  // =========================================================
  // SUBSCRIPTION
  // =========================================================

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [plansLoading, setPlansLoading] = useState(false);

  // =========================================================
  // PAYMENT
  // =========================================================

  const [transactionId, setTransactionId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  // =========================================================
  // OTP
  // =========================================================

  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);

  // =========================================================
  // COMMON
  // =========================================================

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Field-specific validation messages
  const [fieldErrors, setFieldErrors] = useState({});

  // =========================================================
  // FIELD ERROR HELPERS
  // =========================================================

  const clearFieldError = (field) => {
    setFieldErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const showFieldError = (field, text) => {
    setFieldErrors((previous) => ({
      ...previous,
      [field]: text,
    }));
  };

  // =========================================================
  // IMAGE VALIDATION
  // =========================================================

  const validateImageFile = (file, fieldName) => {
    if (!file) {
      return `Please upload ${fieldName}.`;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return `${fieldName} must be JPG, PNG or WEBP.`;
    }

    if (file.size > 5 * 1024 * 1024) {
      return `${fieldName} must be 5MB or smaller.`;
    }

    return "";
  };

  // =========================================================
  // LOAD ACTIVE SUBSCRIPTION PLANS
  // =========================================================

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setPlansLoading(true);
        setError("");

        const response = await getSellerSubscriptionPlans();
        const plans = response.data || [];

        setSubscriptionPlans(plans);

        if (plans.length > 0) {
          setSelectedPlanId(String(plans[0].id));
        }
      } catch (err) {
        console.error("Subscription Plan Error:", err);

        setError(
          err?.response?.data?.message || "Unable to load subscription plans.",
        );
      } finally {
        setPlansLoading(false);
      }
    };

    loadPlans();
  }, []);

  // =========================================================
  // SELECTED PLAN
  // =========================================================

  const selectedPlan = subscriptionPlans.find(
    (plan) => String(plan.id) === String(selectedPlanId),
  );

  // =========================================================
  // PAYMENT QR IMAGE
  // =========================================================

  const getPaymentQrImage = () => {
    if (!selectedPlan) {
      return null;
    }

    if (selectedPlan.durationMonths === 6) {
      return "/admin-qr.png";
    }

    if (selectedPlan.durationMonths === 12) {
      return "/admin-qr.png999.png";
    }

    return null;
  };

  // =========================================================
  // PAYMENT SCREENSHOT VALIDATION
  // =========================================================

  const handlePaymentScreenshotChange = (e) => {
    const file = e.target.files?.[0] || null;

    setError("");
    setPaymentScreenshot(null);
    clearFieldError("paymentScreenshot");

    if (!file) {
      return;
    }

    const validationError = validateImageFile(file, "payment screenshot");

    if (validationError) {
      showFieldError("paymentScreenshot", validationError);
      e.target.value = "";
      return;
    }

    setPaymentScreenshot(file);
  };

  // =========================================================
  // GEO LOCATION START
  // =========================================================

  const handleLocationStart = () => {
    setLocationLoading(true);
    setError("");
    clearFieldError("location");
  };

  // =========================================================
  // GEO LOCATION FOUND
  // =========================================================

  const handleLocationFound = (foundLatitude, foundLongitude, accuracy) => {
    const formattedLatitude = foundLatitude.toFixed(6);
    const formattedLongitude = foundLongitude.toFixed(6);

    setLatitude(formattedLatitude);
    setLongitude(formattedLongitude);

    setLocation(
      `Latitude: ${formattedLatitude}, Longitude: ${formattedLongitude}`,
    );

    setLocationAccuracy(accuracy);
    setLocationLoading(false);
    setError("");
    clearFieldError("location");
  };

  // =========================================================
  // GEO LOCATION ERROR
  // =========================================================

  const handleLocationError = (locationErrorMessage) => {
    setLocationLoading(false);

    const text =
      locationErrorMessage ||
      "Unable to get your current location. Please allow browser location permission.";

    showFieldError("location", text);
    setError(text);
  };

  // =========================================================
  // VALIDATE ALL REGISTRATION FIELDS
  // =========================================================

  const validateRegistrationFields = () => {
    const errors = {};

    // Subscription
    if (!selectedPlanId) {
      errors.selectedPlanId = "Please select a subscription plan.";
    } else if (!selectedPlan) {
      errors.selectedPlanId = "Selected subscription plan is not available.";
    }

    // Basic information
    if (!sellerName.trim()) {
      errors.sellerName = "Please enter seller name.";
    } else if (sellerName.trim().length < 2) {
      errors.sellerName = "Seller name must contain at least 2 characters.";
    }

    if (!email.trim()) {
      errors.email = "Please enter email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!mobile.trim()) {
      errors.mobile = "Please enter mobile number.";
    } else if (!/^[0-9]{10}$/.test(mobile.trim())) {
      errors.mobile = "Mobile number must contain exactly 10 digits.";
    } else if (!/^[6-9][0-9]{9}$/.test(mobile.trim())) {
      errors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (!password) {
      errors.password = "Please enter password.";
    } else if (password.trim().length < 6) {
      errors.password =
        "Password must contain at least 6 non-space characters.";
    }

    // Business information
    if (!businessName.trim()) {
      errors.businessName = "Please enter business name.";
    }

    // if (!farmName.trim()) {
    //   errors.farmName = "Please enter farm name.";
    // }

    // KYC information
    if (!aadhaarNumber.trim()) {
      errors.aadhaarNumber = "Please enter Aadhaar number.";
    } else if (!/^[0-9]{12}$/.test(aadhaarNumber.trim())) {
      errors.aadhaarNumber = "Aadhaar number must contain exactly 12 digits.";
    }

    if (!panNumber.trim()) {
      errors.panNumber = "Please enter PAN number.";
    } else if (
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNumber.trim().toUpperCase())
    ) {
      errors.panNumber = "Invalid PAN format. Example: ABCDE1234F.";
    }

    const frontError = validateImageFile(
      aadhaarFrontFile,
      "Aadhaar front image",
    );

    if (frontError) {
      errors.aadhaarFrontFile = frontError;
    }

    const backError = validateImageFile(aadhaarBackFile, "Aadhaar back image");

    if (backError) {
      errors.aadhaarBackFile = backError;
    }

    // Address information
    if (!address.trim()) {
      errors.address = "Please enter address.";
    }

    if (!city.trim()) {
      errors.city = "Please enter city.";
    }

    if (!state.trim()) {
      errors.state = "Please enter state.";
    }

    if (!district.trim()) {
      errors.district = "Please enter district.";
    }

    if (!subDistrict.trim()) {
      errors.subDistrict = "Please enter sub district.";
    }

    if (!village.trim()) {
      errors.village = "Please enter village.";
    }

    if (!pincode.trim()) {
      errors.pincode = "Please enter pincode.";
    } else if (!/^[0-9]{6}$/.test(pincode.trim())) {
      errors.pincode = "Pincode must contain exactly 6 digits.";
    }

    // if (!location.trim()) {
    //   errors.location = "Please use the 'Use Current Location' button.";
    // }

    // Profile image is optional, but validate it when selected.
    if (profileImage) {
      const profileError = validateImageFile(profileImage, "profile image");

      if (profileError) {
        errors.profileImage = profileError;
      }
    }

    // Payment

    // Transaction ID is optional.
    // If entered, it must contain at least 4 characters.
    if (transactionId.trim() && transactionId.trim().length < 4) {
      errors.transactionId =
        "UTR / Transaction Number must contain at least 4 characters.";
    }

    // Payment Screenshot remains mandatory
    const paymentError = validateImageFile(
      paymentScreenshot,
      "payment screenshot",
    );

    if (paymentError) {
      errors.paymentScreenshot = paymentError;
    }

    return errors;
  };

  // =========================================================
  // SELLER REGISTRATION + PAYMENT
  // =========================================================

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setFieldErrors({});

    const validationErrors = validateRegistrationFields();
    const errorKeys = Object.keys(validationErrors);

    if (errorKeys.length > 0) {
      setFieldErrors(validationErrors);
      setError(validationErrors[errorKeys[0]]);

      // Focus the first field that needs attention.
      window.setTimeout(() => {
        const firstInvalidField = document.querySelector(
          `[name="${errorKeys[0]}"]`,
        );

        firstInvalidField?.focus();

        firstInvalidField?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 0);

      return;
    }

    if (subscriptionPlans.length === 0) {
      setError("No active subscription plans available.");
      return;
    }

    // =======================================================
    // CREATE SELLER FORM DATA
    // =======================================================

    const formData = new FormData();

    formData.append("sellerName", sellerName.trim());
    formData.append("businessName", businessName.trim());
    formData.append("farmName", farmName.trim());
    formData.append("email", email.trim().toLowerCase());
    formData.append("mobile", mobile.trim());
    formData.append("password", password);
    formData.append("address", address.trim());
    formData.append("city", city.trim());
    formData.append("state", state.trim());
    formData.append("district", district.trim());
    formData.append("subDistrict", subDistrict.trim());
    formData.append("village", village.trim());
    formData.append("pincode", pincode.trim());
    formData.append("location", location.trim());

    // GEO LOCATION DATA
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    // KYC DATA
    formData.append("aadhaarNumber", aadhaarNumber.trim());
    formData.append("panNumber", panNumber.trim().toUpperCase());
    formData.append("aadhaarFrontFile", aadhaarFrontFile);
    formData.append("aadhaarBackFile", aadhaarBackFile);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    // SUBSCRIPTION PLAN ID
    formData.append("subscriptionPlanId", selectedPlanId);

    // =======================================================
    // REGISTER SELLER
    // =======================================================

    try {
      setLoading(true);

      const response = await registerSeller(formData);
      const sellerData = response.data;

      if (!sellerData || !sellerData.id) {
        setError(
          "Seller registration completed, but seller ID was not returned.",
        );
        return;
      }

      const sellerId = sellerData.id;

      // =====================================================
      // GET CREATED SELLER SUBSCRIPTION
      // =====================================================

      let subscriptionId = null;

      try {
        const subscriptionResponse = await fetch(
          apiUrl(`/api/seller/subscriptions/current/${sellerId}`),
        );

        if (subscriptionResponse.ok) {
          const subscriptionData = await subscriptionResponse.json();

          subscriptionId = subscriptionData?.id || null;
        }
      } catch (subscriptionError) {
        console.error("Subscription Fetch Error:", subscriptionError);
      }

      // SUBSCRIPTION ID VALIDATION
      if (!subscriptionId) {
        setError(
          "Seller registered, but subscription information could not be found.",
        );
        return;
      }

      // =====================================================
      // SUBMIT PAYMENT
      // =====================================================

      await submitSellerPayment(
        sellerId,
        subscriptionId,
        transactionId.trim(),
        paymentScreenshot,
      );

      // Existing backend sends the registration Email OTP.
      // Do not call resendEmailOtp() here.

      setOtp("");
      setOtpStep(true);

      setMessage(
        `Registration and payment submitted successfully. OTP has been sent to ${email
          .trim()
          .toLowerCase()}.`,
      );
    } catch (err) {
      console.error("Seller Registration / Payment Error:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Seller registration failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // VERIFY EMAIL OTP
  // =========================================================

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    clearFieldError("otp");

    if (!otp.trim()) {
      const text = "Please enter OTP.";
      showFieldError("otp", text);
      setError(text);
      return;
    }

    if (!/^[0-9]{6}$/.test(otp.trim())) {
      const text = "OTP must contain exactly 6 digits.";
      showFieldError("otp", text);
      setError(text);
      return;
    }

    try {
      setLoading(true);

      await verifyEmailOtp(email.trim().toLowerCase(), otp.trim());

      setMessage(
        "Email verified successfully. Your seller account is now pending Admin approval.",
      );

      setOtp("");

      window.setTimeout(() => {
        navigate("/seller/registration-success");
      }, 1500);
    } catch (err) {
      console.error("OTP Verification Error:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Invalid OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // RESEND OTP
  // =========================================================

  const handleResendOtp = async () => {
    setError("");
    setMessage("");

    try {
      setResendLoading(true);

      await resendEmailOtp(email.trim().toLowerCase());

      setMessage(`OTP sent again to ${email.trim().toLowerCase()}.`);
    } catch (err) {
      console.error("Resend OTP Error:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Unable to resend OTP.",
      );
    } finally {
      setResendLoading(false);
    }
  };

  // =========================================================
  // FIELD ERROR DISPLAY
  // =========================================================

  const FieldError = ({ field }) =>
    fieldErrors[field] ? (
      <small
        className="field-validation-error"
        style={{
          display: "block",
          color: "#dc3545",
          marginTop: "5px",
          fontSize: "13px",
        }}
      >
        {fieldErrors[field]}
      </small>
    ) : null;

  // =========================================================
  // OTP PAGE
  // =========================================================

  if (otpStep) {
    return (
      <div className="seller-register-page">
        <div className="seller-register-layout">
          <aside className="seller-info-panel">
            <div className="seller-brand">
              <div className="seller-brand-name">🐄 AnimalSale</div>
              <div className="seller-brand-tagline">
                Buy & Sell Healthy Animals Online
              </div>
            </div>

            <div className="seller-info-content">
              <h1>Become a Seller</h1>

              <p>
                Create your seller account and start selling healthy animals
                online.
              </p>

              <div className="seller-info-list">
                <div className="seller-info-item">
                  <span>✓</span>
                  <div>
                    <strong>Sell Animals Online</strong>
                    <small>List your healthy animals for customers.</small>
                  </div>
                </div>

                <div className="seller-info-item">
                  <span>✓</span>
                  <div>
                    <strong>Manage Your Animals</strong>
                    <small>
                      Easily add, update and manage your animal listings.
                    </small>
                  </div>
                </div>

                <div className="seller-info-item">
                  <span>✓</span>
                  <div>
                    <strong>Reach More Customers</strong>
                    <small>Connect your animals with interested buyers.</small>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="seller-form-panel">
            <div className="seller-register-card otp-card">
              <div className="seller-card-header">
                <h2>Email Verification</h2>
                <p>Enter the OTP sent to</p>
                <strong>{email}</strong>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              {message && <div className="alert alert-success">{message}</div>}

              <form onSubmit={handleVerifyOtp}>
                <div className="form-group">
                  <label>Enter OTP *</label>

                  <input
                    name="otp"
                    type="text"
                    className="form-control"
                    value={otp}
                    maxLength="6"
                    inputMode="numeric"
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, ""));
                      clearFieldError("otp");
                    }}
                    placeholder="Enter 6 digit OTP"
                  />

                  <FieldError field="otp" />
                </div>

                <button
                  type="submit"
                  className="register-button"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>

              <button
                type="button"
                className="resend-button"
                onClick={handleResendOtp}
                disabled={resendLoading}
              >
                {resendLoading ? "Sending..." : "Resend OTP"}
              </button>

              <div className="text-center mt-4">
                <Link to="/" className="text-decoration-none text-muted">
                  ← Back to AnimalSale
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN SELLER REGISTRATION PAGE
  // =========================================================

  return (
    <div className="seller-register-page">
      <div className="seller-register-layout">
        {/* LEFT SIDE - ANIMAL SALE INFORMATION */}

        <aside className="seller-info-panel">
          <div className="seller-brand">
            <div className="seller-brand-name">🐄 AnimalSale</div>
            <div className="seller-brand-tagline">
              Buy & Sell Healthy Animals Online
            </div>
          </div>

          <div className="seller-info-content">
            <h1>Become a Seller</h1>

            <p>
              Create your seller account and start selling healthy animals
              online.
            </p>

            <div className="seller-info-list">
              <div className="seller-info-item">
                <span>✓</span>
                <div>
                  <strong>Sell Animals Online</strong>
                  <small>List your healthy animals for customers.</small>
                </div>
              </div>

              <div className="seller-info-item">
                <span>✓</span>
                <div>
                  <strong>Manage Your Animals</strong>
                  <small>
                    Easily add, update and manage your animal listings.
                  </small>
                </div>
              </div>

              <div className="seller-info-item">
                <span>✓</span>
                <div>
                  <strong>Reach More Customers</strong>
                  <small>Connect your animals with interested buyers.</small>
                </div>
              </div>
            </div>

            <div className="seller-info-note">
              <strong>Why become a seller?</strong>
              <p>
                Join AnimalSale and showcase your animals to customers looking
                for healthy livestock.
              </p>
            </div>
          </div>

          <div className="seller-info-login">
            <span>Already have an account?</span>
            <Link to="/seller/login">Login</Link>
          </div>
        </aside>

        {/* RIGHT SIDE - SELLER REGISTRATION */}

        <main className="seller-form-panel">
          <div className="seller-register-card">
            <div className="seller-card-header">
              <h2>Seller Registration</h2>
              <p>Create your seller account</p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {message && (
              <div className="alert alert-success" role="status">
                {message}
              </div>
            )}

            <form onSubmit={handleRegister} noValidate>
              {/* BASIC INFORMATION */}

              <section className="form-section">
                <h3>Basic Information</h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Seller Name *</label>
                    <input
                      name="sellerName"
                      type="text"
                      className="form-control"
                      value={sellerName}
                      onChange={(e) => {
                        setSellerName(e.target.value);
                        clearFieldError("sellerName");
                      }}
                      placeholder="Enter seller name"
                    />
                    <FieldError field="sellerName" />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError("email");
                      }}
                      placeholder="Enter email"
                    />
                    <FieldError field="email" />
                  </div>

                  <div className="form-group">
                    <label>Mobile *</label>
                    <input
                      name="mobile"
                      type="text"
                      inputMode="numeric"
                      className="form-control"
                      value={mobile}
                      maxLength="10"
                      onChange={(e) => {
                        setMobile(e.target.value.replace(/\D/g, ""));
                        clearFieldError("mobile");
                      }}
                      placeholder="Enter 10 digit mobile"
                    />
                    <FieldError field="mobile" />
                  </div>

                  <div className="form-group">
                    <label>Password *</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearFieldError("password");
                      }}
                      placeholder="Enter password"
                    />
                    <FieldError field="password" />
                  </div>
                </div>
              </section>

              {/* BUSINESS INFORMATION */}

              <section className="form-section">
                <h3>Business Information</h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Business Name *</label>
                    <input
                      name="businessName"
                      type="text"
                      className="form-control"
                      value={businessName}
                      onChange={(e) => {
                        setBusinessName(e.target.value);
                        clearFieldError("businessName");
                      }}
                      placeholder="Enter business name"
                    />
                    <FieldError field="businessName" />
                  </div>

                  <div className="form-group">
                    <label>Farm Name (Optional)</label>
                    <input
                      name="farmName"
                      type="text"
                      className="form-control"
                      value={farmName}
                      onChange={(e) => {
                        setFarmName(e.target.value);
                        clearFieldError("farmName");
                      }}
                      placeholder="Enter farm name"
                    />
                    <FieldError field="farmName" />
                  </div>
                </div>
              </section>

              {/* KYC INFORMATION */}

              <section className="form-section">
                <h3>KYC Information</h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Aadhaar Number *</label>
                    <input
                      name="aadhaarNumber"
                      type="text"
                      inputMode="numeric"
                      className="form-control"
                      value={aadhaarNumber}
                      maxLength="12"
                      onChange={(e) => {
                        setAadhaarNumber(e.target.value.replace(/\D/g, ""));
                        clearFieldError("aadhaarNumber");
                      }}
                      placeholder="Enter 12 digit Aadhaar"
                    />
                    <FieldError field="aadhaarNumber" />
                  </div>

                  <div className="form-group">
                    <label>PAN Number *</label>
                    <input
                      name="panNumber"
                      type="text"
                      className="form-control"
                      value={panNumber}
                      maxLength="10"
                      onChange={(e) => {
                        setPanNumber(e.target.value.toUpperCase());
                        clearFieldError("panNumber");
                      }}
                      placeholder="Enter PAN number"
                    />
                    <FieldError field="panNumber" />
                  </div>

                  <div className="form-group">
                    <label>Aadhaar Front *</label>
                    <input
                      name="aadhaarFrontFile"
                      type="file"
                      className="form-control"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setAadhaarFrontFile(file);
                        clearFieldError("aadhaarFrontFile");

                        if (file) {
                          const fileError = validateImageFile(
                            file,
                            "Aadhaar front image",
                          );

                          if (fileError) {
                            showFieldError("aadhaarFrontFile", fileError);
                            setAadhaarFrontFile(null);
                            e.target.value = "";
                          }
                        }
                      }}
                    />
                    <small>JPG, PNG or WEBP. Max 5MB.</small>
                    <FieldError field="aadhaarFrontFile" />
                  </div>

                  <div className="form-group">
                    <label>Aadhaar Back *</label>
                    <input
                      name="aadhaarBackFile"
                      type="file"
                      className="form-control"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setAadhaarBackFile(file);
                        clearFieldError("aadhaarBackFile");

                        if (file) {
                          const fileError = validateImageFile(
                            file,
                            "Aadhaar back image",
                          );

                          if (fileError) {
                            showFieldError("aadhaarBackFile", fileError);
                            setAadhaarBackFile(null);
                            e.target.value = "";
                          }
                        }
                      }}
                    />
                    <small>JPG, PNG or WEBP. Max 5MB.</small>
                    <FieldError field="aadhaarBackFile" />
                  </div>
                </div>
              </section>

              {/* ADDRESS INFORMATION */}

              <section className="form-section">
                <h3>Address Information</h3>

                <div className="form-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      clearFieldError("address");
                    }}
                    placeholder="Enter address"
                    rows="3"
                  />
                  <FieldError field="address" />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      name="city"
                      type="text"
                      className="form-control"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        clearFieldError("city");
                      }}
                      placeholder="Enter city"
                    />
                    <FieldError field="city" />
                  </div>

                  <div className="form-group">
                    <label>State *</label>
                    <input
                      name="state"
                      type="text"
                      className="form-control"
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        clearFieldError("state");
                      }}
                      placeholder="Enter state"
                    />
                    <FieldError field="state" />
                  </div>

                  <div className="form-group">
                    <label>District *</label>
                    <input
                      name="district"
                      type="text"
                      className="form-control"
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        clearFieldError("district");
                      }}
                      placeholder="Enter district"
                    />
                    <FieldError field="district" />
                  </div>

                  <div className="form-group">
                    <label>Sub District *</label>
                    <input
                      name="subDistrict"
                      type="text"
                      className="form-control"
                      value={subDistrict}
                      onChange={(e) => {
                        setSubDistrict(e.target.value);
                        clearFieldError("subDistrict");
                      }}
                      placeholder="Enter sub district"
                    />
                    <FieldError field="subDistrict" />
                  </div>

                  <div className="form-group">
                    <label>Village *</label>
                    <input
                      name="village"
                      type="text"
                      className="form-control"
                      value={village}
                      onChange={(e) => {
                        setVillage(e.target.value);
                        clearFieldError("village");
                      }}
                      placeholder="Enter village"
                    />
                    <FieldError field="village" />
                  </div>

                  <div className="form-group">
                    <label>Pincode *</label>
                    <input
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      className="form-control"
                      value={pincode}
                      maxLength="6"
                      onChange={(e) => {
                        setPincode(e.target.value.replace(/\D/g, ""));
                        clearFieldError("pincode");
                      }}
                      placeholder="Enter 6 digit pincode"
                    />
                    <FieldError field="pincode" />
                  </div>
                </div>

                {/* LEAFLET GEO LOCATION */}

                <div className="form-group" style={{ marginTop: "20px" }}>
                  <label>Seller Location (Optional)</label>

                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "350px",
                      border: "1px solid #dddddd",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <MapContainer
                      center={[20.5937, 78.9629]}
                      zoom={5}
                      scrollWheelZoom={true}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      <LocationEvents
                        onLocationFound={handleLocationFound}
                        onLocationError={handleLocationError}
                      />

                      <LocateButton onStart={handleLocationStart} />

                      {latitude && longitude && (
                        <CircleMarker
                          center={[Number(latitude), Number(longitude)]}
                          radius={10}
                          pathOptions={{
                            color: "#008577",
                            fillColor: "#009688",
                            fillOpacity: 0.8,
                          }}
                        />
                      )}
                    </MapContainer>
                  </div>

                  {locationLoading && (
                    <div className="alert alert-info mt-3">
                      Detecting your current location...
                    </div>
                  )}

                  {!locationLoading && latitude && longitude && (
                    <div className="alert alert-success mt-3">
                      <strong>Seller location selected successfully.</strong>

                      <div
                        style={{
                          fontSize: "13px",
                          marginTop: "5px",
                        }}
                      >
                        Latitude: {latitude}
                        <br />
                        Longitude: {longitude}
                      </div>

                      {locationAccuracy && (
                        <div
                          style={{
                            fontSize: "12px",
                            marginTop: "5px",
                          }}
                        >
                          Accuracy: approximately {Math.round(locationAccuracy)}{" "}
                          meters
                        </div>
                      )}
                    </div>
                  )}

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Location (Optional)</label>
                      <input
                        name="location"
                        type="text"
                        className="form-control"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                          clearFieldError("location");
                        }}
                        placeholder="Use current location"
                      />
                      <FieldError field="location" />
                    </div>

                    <div className="form-group">
                      <label>Latitude</label>
                      <input
                        type="text"
                        className="form-control"
                        value={latitude}
                        readOnly
                        placeholder="Latitude"
                      />
                    </div>

                    <div className="form-group">
                      <label>Longitude</label>
                      <input
                        type="text"
                        className="form-control"
                        value={longitude}
                        readOnly
                        placeholder="Longitude"
                      />
                    </div>
                  </div>

                  <small style={{ color: "#666666" }}>
                    Click <strong>"Use Current Location"</strong> and allow
                    browser location permission.
                  </small>
                </div>
              </section>

              {/* PROFILE IMAGE - OPTIONAL */}

              <section className="form-section">
                <h3>Profile Image</h3>

                <div className="form-group">
                  <input
                    name="profileImage"
                    type="file"
                    className="form-control"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setProfileImage(file);
                      clearFieldError("profileImage");

                      if (file) {
                        const fileError = validateImageFile(
                          file,
                          "profile image",
                        );

                        if (fileError) {
                          showFieldError("profileImage", fileError);
                          setProfileImage(null);
                          e.target.value = "";
                        }
                      }
                    }}
                  />
                  <small>Optional. JPG, PNG or WEBP. Max 5MB.</small>
                  <FieldError field="profileImage" />
                </div>
              </section>

              {/* SUBSCRIPTION PLANS */}

              <section className="form-section subscription-section">
                <h3>Select Subscription Plan *</h3>

                {plansLoading ? (
                  <div className="plan-loading">
                    Loading subscription plans...
                  </div>
                ) : subscriptionPlans.length === 0 ? (
                  <div className="alert alert-warning">
                    No active subscription plans available.
                  </div>
                ) : (
                  <div className="subscription-grid">
                    {subscriptionPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`subscription-plan-card ${
                          String(selectedPlanId) === String(plan.id)
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedPlanId(String(plan.id));
                          clearFieldError("selectedPlanId");
                        }}
                      >
                        <div className="plan-radio">
                          <input
                            type="radio"
                            name="subscriptionPlan"
                            checked={String(selectedPlanId) === String(plan.id)}
                            onChange={() => {
                              setSelectedPlanId(String(plan.id));
                              clearFieldError("selectedPlanId");
                            }}
                          />
                        </div>

                        <div className="plan-content">
                          <div className="plan-title-row">
                            <h4>{plan.planName}</h4>

                            <span>
                              {plan.durationMonths === 12
                                ? "1 Year"
                                : `${plan.durationMonths} Months`}
                            </span>
                          </div>

                          <div className="plan-price">₹{plan.price}</div>

                          <p>
                            {plan.description ||
                              `Access all seller features for ${plan.durationMonths} months.`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <FieldError field="selectedPlanId" />
              </section>

              {/* PAYMENT DETAILS */}

              <section className="form-section payment-section">
                <h3>Payment Details</h3>

                <div className="payment-instruction">
                  <strong>Scan & Pay</strong>
                  <span>Scan the Admin QR and complete the payment.</span>
                </div>

                {selectedPlan && getPaymentQrImage() && (
                  <div className="qr-container">
                    <img
                      src={getPaymentQrImage()}
                      alt={`${selectedPlan.planName} Payment QR`}
                    />
                  </div>
                )}

                {selectedPlan && (
                  <div className="pay-amount">
                    Pay Exactly:
                    <strong>₹{selectedPlan.price}</strong>
                  </div>
                )}

                <div className="form-group">
                  <label>UTR / Transaction Number (Optional)</label>
                  <input
                    name="transactionId"
                    type="text"
                    className="form-control"
                    value={transactionId}
                    onChange={(e) => {
                      setTransactionId(e.target.value);
                      clearFieldError("transactionId");
                    }}
                    placeholder="Enter UTR / Transaction Number"
                  />
                  <FieldError field="transactionId" />
                </div>

                <div className="form-group">
                  <label>Payment Screenshot *</label>
                  <input
                    name="paymentScreenshot"
                    type="file"
                    className="form-control"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePaymentScreenshotChange}
                  />
                  <small>JPG, PNG or WEBP. Max 5MB.</small>
                  <FieldError field="paymentScreenshot" />
                </div>
              </section>

              {/* REGISTER BUTTON */}

              <button
                type="submit"
                className="register-button"
                disabled={
                  loading || plansLoading || subscriptionPlans.length === 0
                }
              >
                {loading ? "Registering Seller..." : "Register Seller"}
              </button>

              <div className="mobile-login-link">
                Already have an account?
                <Link to="/seller/login">Login</Link>
              </div>

              {/* BACK TO ANIMALSALE */}

              <div className="text-center mt-4">
                <Link to="/" className="text-decoration-none text-muted">
                  ← Back to AnimalSale
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SellerRegister;
