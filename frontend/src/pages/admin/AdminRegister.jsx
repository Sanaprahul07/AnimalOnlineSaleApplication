
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  // =====================================================
  // ADMIN REGISTER
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // =================================================
    // VALIDATION
    // =================================================

    if (!formData.adminName.trim()) {
      setErrorMessage("Please enter admin name.");
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Please enter admin email.");
      return;
    }

    if (!formData.mobile.trim()) {
      setErrorMessage("Please enter mobile number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile.trim())) {
      setErrorMessage("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (!formData.password.trim()) {
      setErrorMessage("Please enter password.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must contain at least 6 characters.");
      return;
    }

    if (!formData.confirmPassword.trim()) {
      setErrorMessage("Please confirm password.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // =================================================
    // ADMIN REGISTRATION API
    // =================================================

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/admin/register",
        {
          adminName: formData.adminName.trim(),
          email: formData.email.trim().toLowerCase(),
          mobile: formData.mobile.trim(),
          password: formData.password,
        }
      );

      console.log("Admin Registration Response:", response.data);

      setSuccessMessage(
        response.data?.message || "Admin registration successful."
      );

      // =================================================
      // REDIRECT TO ADMIN LOGIN
      // =================================================

      setTimeout(() => {
        navigate("/admin/login");
      }, 1000);

    } catch (error) {

      console.error("Admin Registration Error:", error);

      if (error.response) {

        console.error(
          "Backend Status:",
          error.response.status
        );

        console.error(
          "Backend Response:",
          error.response.data
        );

        setErrorMessage(
          error.response.data?.message ||
          error.response.data ||
          "Admin registration failed."
        );

      } else if (error.request) {

        setErrorMessage(
          "Unable to connect to backend server."
        );

      } else {

        setErrorMessage(
          error.message || "Admin registration failed."
        );
      }

    } finally {

      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">

      <div
        className="card border-0 shadow"
        style={{
          width: "100%",
          maxWidth: "480px",
          borderRadius: "16px",
        }}
      >

        <div className="card-body p-4 p-md-5">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="text-center mb-4">

            <div
              className="fw-bold text-success"
              style={{
                fontSize: "30px",
              }}
            >
              🐾 AnimalSale
            </div>

            <h3 className="fw-bold mt-3 mb-1">
              Admin Registration
            </h3>

            <p className="text-muted mb-0">
              Create your AnimalSale admin account
            </p>

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {errorMessage && (
            <div
              className="alert alert-danger"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          {/* =================================================
              SUCCESS
          ================================================= */}

          {successMessage && (
            <div
              className="alert alert-success"
              role="alert"
            >
              {successMessage}
            </div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>

            {/* ADMIN NAME */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Admin Name
              </label>

              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter admin name"
                autoComplete="name"
                disabled={loading}
              />

            </div>

            {/* EMAIL */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter admin email"
                autoComplete="email"
                disabled={loading}
              />

            </div>

            {/* MOBILE */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter 10 digit mobile number"
                maxLength="10"
                autoComplete="tel"
                disabled={loading}
              />

            </div>

            {/* PASSWORD */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter password"
                autoComplete="new-password"
                disabled={loading}
              />

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Confirm password"
                autoComplete="new-password"
                disabled={loading}
              />

            </div>

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-semibold"
              disabled={loading}
            >
              {loading
                ? "Registering..."
                : "Register as Admin"}
            </button>

          </form>

          {/* =================================================
              LOGIN
          ================================================= */}

          <div className="text-center mt-4">

            <span className="text-muted">
              Already have an admin account?{" "}
            </span>

            <button
              type="button"
              className="btn btn-link p-0 text-success fw-semibold text-decoration-none"
              onClick={() => navigate("/admin/login")}
              disabled={loading}
            >
              Login
            </button>

          </div>

          {/* =================================================
              BACK TO HOME
          ================================================= */}

          <div className="text-center mt-3">

            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              ← Back to Home
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}

export default AdminRegister;

