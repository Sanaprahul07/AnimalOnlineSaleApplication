import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  registerSeller,
  resendEmailOtp,
  verifyEmailOtp,
  getSellerSubscriptionPlans,
  submitSellerPayment,
} from "../../services/SellerService";

import "./SellerRegister.css";

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
  // ONLY NEW REQUIREMENT
  // =========================================================

  const getPaymentQrImage = () => {
    if (!selectedPlan) {
      return null;
    }

    // 6 Months Plan
    if (selectedPlan.durationMonths === 6) {
      return "/admin-qr.png";
    }

    // 12 Months / 1 Year Plan
    if (selectedPlan.durationMonths === 12) {
      return "/admin-qr.png999.png";
    }

    return null;
  };

  // =========================================================
  // IMAGE VALIDATION
  // =========================================================

  const validateImageFile = (file, fieldName) => {
    if (!file) {
      return `${fieldName} is required.`;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return `${fieldName} must be JPG, PNG or WEBP.`;
    }

    if (file.size > 5 * 1024 * 1024) {
      return `${fieldName} must be less than 5MB.`;
    }

    return "";
  };

  // =========================================================
  // PAYMENT SCREENSHOT
  // =========================================================

  const handlePaymentScreenshotChange = (e) => {
    const file = e.target.files?.[0] || null;

    setError("");
    setPaymentScreenshot(null);

    if (!file) {
      return;
    }

    const validationError = validateImageFile(file, "Payment screenshot");

    if (validationError) {
      setError(validationError);
      e.target.value = "";
      return;
    }

    setPaymentScreenshot(file);
  };

  // =========================================================
  // SELLER REGISTRATION + PAYMENT
  // =========================================================

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // =======================================================
    // SUBSCRIPTION VALIDATION
    // =======================================================

    if (!selectedPlanId) {
      setError("Please select a subscription plan.");
      return;
    }

    if (!selectedPlan) {
      setError("Selected subscription plan is not available.");
      return;
    }

    // =======================================================
    // BASIC VALIDATION
    // =======================================================

    if (!sellerName.trim()) {
      setError("Please enter seller name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter email.");
      return;
    }

    if (!mobile.trim()) {
      setError("Please enter mobile number.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter password.");
      return;
    }

    if (!businessName.trim()) {
      setError("Please enter business name.");
      return;
    }

    if (!farmName.trim()) {
      setError("Please enter farm name.");
      return;
    }

    if (!aadhaarNumber.trim()) {
      setError("Please enter Aadhaar number.");
      return;
    }

    if (!panNumber.trim()) {
      setError("Please enter PAN number.");
      return;
    }

    if (!address.trim()) {
      setError("Please enter address.");
      return;
    }

    if (!city.trim()) {
      setError("Please enter city.");
      return;
    }

    if (!state.trim()) {
      setError("Please enter state.");
      return;
    }

    if (!district.trim()) {
      setError("Please enter district.");
      return;
    }

    if (!subDistrict.trim()) {
      setError("Please enter sub district.");
      return;
    }

    if (!village.trim()) {
      setError("Please enter village.");
      return;
    }

    if (!pincode.trim()) {
      setError("Please enter pincode.");
      return;
    }

    if (!location.trim()) {
      setError("Please enter location.");
      return;
    }

    // =======================================================
    // EMAIL VALIDATION
    // =======================================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // =======================================================
    // MOBILE VALIDATION
    // =======================================================

    if (!/^[0-9]{10}$/.test(mobile.trim())) {
      setError("Mobile number must be 10 digits.");
      return;
    }

    // =======================================================
    // PINCODE VALIDATION
    // =======================================================

    if (!/^[0-9]{6}$/.test(pincode.trim())) {
      setError("Pincode must be 6 digits.");
      return;
    }

    // =======================================================
    // AADHAAR VALIDATION
    // =======================================================

    if (!/^[0-9]{12}$/.test(aadhaarNumber.trim())) {
      setError("Aadhaar number must be 12 digits.");
      return;
    }

    // =======================================================
    // PAN VALIDATION
    // =======================================================

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber.trim().toUpperCase())) {
      setError("Please enter a valid PAN number.");
      return;
    }

    // =======================================================
    // PASSWORD VALIDATION
    // =======================================================

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // =======================================================
    // AADHAAR FRONT
    // =======================================================

    const frontError = validateImageFile(
      aadhaarFrontFile,
      "Aadhaar front image",
    );

    if (frontError) {
      setError(frontError);
      return;
    }

    // =======================================================
    // AADHAAR BACK
    // =======================================================

    const backError = validateImageFile(aadhaarBackFile, "Aadhaar back image");

    if (backError) {
      setError(backError);
      return;
    }

    // =======================================================
    // PAYMENT VALIDATION
    // =======================================================

    if (!transactionId.trim()) {
      setError("Please enter UTR / Transaction Number.");
      return;
    }

    if (transactionId.trim().length < 4) {
      setError("Please enter a valid UTR / Transaction Number.");
      return;
    }

    if (!paymentScreenshot) {
      setError("Please upload payment screenshot.");
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

    formData.append("aadhaarNumber", aadhaarNumber.trim());

    formData.append("panNumber", panNumber.trim().toUpperCase());

    formData.append("aadhaarFrontFile", aadhaarFrontFile);

    formData.append("aadhaarBackFile", aadhaarBackFile);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    // =======================================================
    // SUBSCRIPTION PLAN ID
    // =======================================================

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
          `http://localhost:8080/api/seller/subscriptions/current/${sellerId}`,
        );

        if (subscriptionResponse.ok) {
          const subscriptionData = await subscriptionResponse.json();

          subscriptionId = subscriptionData?.id || null;
        }
      } catch (subscriptionError) {
        console.error("Subscription Fetch Error:", subscriptionError);
      }

      // =====================================================
      // SUBSCRIPTION ID VALIDATION
      // =====================================================

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

      // =====================================================
      // IMPORTANT
      // =====================================================
      // DO NOT CALL resendEmailOtp() HERE.
      //
      // Existing seller registration backend already sends
      // the Email OTP during registration.
      //
      // Therefore only ONE OTP is sent.
      // =====================================================

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

    if (!otp.trim()) {
      setError("Please enter OTP.");
      return;
    }

    if (otp.trim().length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    try {
      setLoading(true);

      await verifyEmailOtp(email.trim().toLowerCase(), otp.trim());

      setMessage("Email verified successfully. Redirecting to seller login...");

      setTimeout(() => {
        navigate("/seller/login", {
          replace: true,
        });
      }, 1000);
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
  // OTP PAGE
  // =========================================================

  if (otpStep) {
    return (
      <div className="seller-register-page">
        <div className="seller-register-layout">
          {/* LEFT SIDE */}
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

          {/* RIGHT SIDE */}
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
                    type="text"
                    className="form-control otp-input"
                    value={otp}
                    maxLength="6"
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6 digit OTP"
                  />
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
        {/* ===================================================
            LEFT SIDE - ANIMAL SALE INFORMATION
        =================================================== */}

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

        {/* ===================================================
            RIGHT SIDE - SELLER REGISTRATION
        =================================================== */}

        <main className="seller-form-panel">
          <div className="seller-register-card">
            {/* HEADER */}

            <div className="seller-card-header">
              <h2>Seller Registration</h2>

              <p>Create your seller account</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {message && <div className="alert alert-success">{message}</div>}

            <form onSubmit={handleRegister}>
              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}

              <section className="form-section">
                <h3>Basic Information</h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Seller Name *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      placeholder="Enter seller name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>

                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={mobile}
                      maxLength="10"
                      onChange={(e) =>
                        setMobile(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter 10 digit mobile"
                    />
                  </div>

                  <div className="form-group">
                    <label>Password *</label>

                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                  </div>
                </div>
              </section>

              {/* =================================================
                  BUSINESS INFORMATION
              ================================================= */}

              <section className="form-section">
                <h3>Business Information</h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Business Name *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Enter business name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Farm Name *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      placeholder="Enter farm name"
                    />
                  </div>
                </div>
              </section>

              {/* =================================================
                  KYC INFORMATION
              ================================================= */}

              <section className="form-section">
                <h3>KYC Information</h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Aadhaar Number *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={aadhaarNumber}
                      maxLength="12"
                      onChange={(e) =>
                        setAadhaarNumber(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter 12 digit Aadhaar"
                    />
                  </div>

                  <div className="form-group">
                    <label>PAN Number *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={panNumber}
                      maxLength="10"
                      onChange={(e) =>
                        setPanNumber(e.target.value.toUpperCase())
                      }
                      placeholder="Enter PAN number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Aadhaar Front *</label>

                    <input
                      type="file"
                      className="form-control"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) =>
                        setAadhaarFrontFile(e.target.files?.[0] || null)
                      }
                    />

                    <small>JPG, PNG or WEBP. Max 5MB.</small>
                  </div>

                  <div className="form-group">
                    <label>Aadhaar Back *</label>

                    <input
                      type="file"
                      className="form-control"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) =>
                        setAadhaarBackFile(e.target.files?.[0] || null)
                      }
                    />

                    <small>JPG, PNG or WEBP. Max 5MB.</small>
                  </div>
                </div>
              </section>

              {/* =================================================
                  ADDRESS INFORMATION
              ================================================= */}

              <section className="form-section">
                <h3>Address Information</h3>

                <div className="form-group">
                  <label>Address *</label>

                  <textarea
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                    rows="3"
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>City *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="form-group">
                    <label>State *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Enter state"
                    />
                  </div>

                  <div className="form-group">
                    <label>District *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Enter district"
                    />
                  </div>

                  <div className="form-group">
                    <label>Sub District *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={subDistrict}
                      onChange={(e) => setSubDistrict(e.target.value)}
                      placeholder="Enter sub district"
                    />
                  </div>

                  <div className="form-group">
                    <label>Village *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      placeholder="Enter village"
                    />
                  </div>

                  <div className="form-group">
                    <label>Pincode *</label>

                    <input
                      type="text"
                      className="form-control"
                      value={pincode}
                      maxLength="6"
                      onChange={(e) =>
                        setPincode(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter 6 digit pincode"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Location *</label>

                  <input
                    type="text"
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                  />
                </div>
              </section>

              {/* =================================================
                  PROFILE IMAGE
              ================================================= */}

              <section className="form-section">
                <h3>Profile Image</h3>

                <div className="form-group">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) =>
                      setProfileImage(e.target.files?.[0] || null)
                    }
                  />

                  <small>JPG, PNG or WEBP. Max 5MB.</small>
                </div>
              </section>

              {/* =================================================
                  SUBSCRIPTION PLANS
              ================================================= */}

              <section className="form-section subscription-section">
                <h3>Select Subscription Plan</h3>

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
                        onClick={() => setSelectedPlanId(String(plan.id))}
                      >
                        <div className="plan-radio">
                          <input
                            type="radio"
                            name="subscriptionPlan"
                            checked={String(selectedPlanId) === String(plan.id)}
                            onChange={() => setSelectedPlanId(String(plan.id))}
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
              </section>

              {/* =================================================
                  PAYMENT
              ================================================= */}

              <section className="form-section payment-section">
                <h3>Payment Details</h3>

                <div className="payment-instruction">
                  <strong>Scan & Pay</strong>

                  <span>Scan the Admin QR and complete the payment.</span>
                </div>

                {/* =================================================
                    DYNAMIC QR CODE
                    6 MONTHS -> admin-qr.png
                    12 MONTHS -> admin-qr.png999.png
                ================================================= */}

                {selectedPlan && getPaymentQrImage() && (
                  <div className="qr-container">
                    <img
                      src={getPaymentQrImage()}
                      alt={`${selectedPlan.planName} Payment QR`}
                    />
                  </div>
                )}

                {/* =================================================
                    DYNAMIC PRICE
                    PRICE COMES FROM DATABASE
                ================================================= */}

                {selectedPlan && (
                  <div className="pay-amount">
                    Pay Exactly:
                    <strong>₹{selectedPlan.price}</strong>
                  </div>
                )}

                <div className="form-group">
                  <label>UTR / Transaction Number</label>

                  <input
                    type="text"
                    className="form-control"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Enter UTR / Transaction Number"
                  />
                </div>

                <div className="form-group">
                  <label>Payment Screenshot *</label>

                  <input
                    type="file"
                    className="form-control"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePaymentScreenshotChange}
                  />

                  <small>JPG, PNG or WEBP. Max 5MB.</small>
                </div>
              </section>

              {/* =================================================
                  REGISTER BUTTON
              ================================================= */}

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
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SellerRegister;
