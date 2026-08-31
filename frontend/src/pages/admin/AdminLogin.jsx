
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
  };

  // =====================================================
  // ADMIN LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    // ===================================================
    // VALIDATION
    // ===================================================

    if (!formData.email.trim()) {
      setErrorMessage("Please enter admin email.");
      return;
    }

    if (!formData.password.trim()) {
      setErrorMessage("Please enter password.");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // ADMIN LOGIN API
      // IMPORTANT:
      // Do NOT use /api/auth/login here.
      // =================================================

      const response = await axios.post(
        "http://localhost:8080/api/admin/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      console.log("Admin Login Response:", response.data);

      const admin = response.data;

      // =================================================
      // ADMIN ROLE CHECK
      // =================================================

      const role = admin?.role?.toLowerCase() || "";

      if (role !== "admin") {
        setErrorMessage(
          "Access denied. This account is not an admin account."
        );
        return;
      }

      // =================================================
      // SAVE ADMIN LOGIN DATA
      // =================================================

      localStorage.setItem(
        "adminId",
        String(admin.id)
      );

      localStorage.setItem(
        "adminLogin",
        "true"
      );

      localStorage.setItem(
        "adminEmail",
        admin.email || ""
      );

      localStorage.setItem(
        "adminName",
        admin.adminName || "Admin"
      );

      localStorage.setItem(
        "adminRole",
        admin.role || "ADMIN"
      );

      // =================================================
      // ADMIN DASHBOARD
      // =================================================

      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Admin Login Error:", error);

      // =================================================
      // BACKEND ERROR
      // =================================================

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
            "Invalid admin email or password."
        );

      } else if (error.request) {

        setErrorMessage(
          "Unable to connect to backend server."
        );

      } else {

        setErrorMessage(
          error.message || "Admin login failed."
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
          maxWidth: "430px",
          borderRadius: "16px",
        }}
      >

        <div className="card-body p-4 p-md-5">

          {/* BRAND */}

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
              Admin Login
            </h3>

            <p className="text-muted mb-0">
              Login to manage the AnimalSale platform
            </p>

          </div>

          {/* ERROR */}

          {errorMessage && (
            <div
              className="alert alert-danger"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          {/* FORM */}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Admin Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter admin email"
                autoComplete="username"
                disabled={loading}
              />

            </div>

            {/* PASSWORD */}

            <div className="mb-4">

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
                autoComplete="current-password"
                disabled={loading}
              />

            </div>

            {/* LOGIN */}

            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-semibold"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login as Admin"}
            </button>

          </form>

          {/* ADMIN REGISTER */}

          <div className="text-center mt-3">

            <span className="text-muted">
              Don't have an admin account?
            </span>{" "}

            <button
              type="button"
              className="btn btn-link p-0 text-success fw-semibold text-decoration-none"
              onClick={() => navigate("/admin/register")}
              disabled={loading}
            >
              Register
            </button>

          </div>

          {/* BACK */}

          <div className="text-center mt-4">

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

export default AdminLogin;

