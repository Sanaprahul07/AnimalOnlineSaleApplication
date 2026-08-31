import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { forgotSellerPassword } from "../../services/SellerService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // =====================================================
  // RESET PASSWORD
  // =====================================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");

    setMessage("");

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!email.trim()) {
      setError("Please enter your registered email.");
      return;
    }

    if (!newPassword.trim()) {
      setError("Please enter new password.");
      return;
    }

    if (!confirmPassword.trim()) {
      setError("Please confirm your new password.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // =====================================================
    // CALL BACKEND API
    // =====================================================

    try {
      setLoading(true);

      const response = await forgotSellerPassword(email.trim(), newPassword);

      // =====================================================
      // SUCCESS
      // =====================================================

      setMessage(response.data || "Password updated successfully.");

      // =====================================================
      // GO TO SELLER LOGIN - QUICK ACTION
      // =====================================================

      navigate("/seller/login");
    } catch (error) {
      console.error("Forgot Password Error:", error);

      // =====================================================
      // BACKEND ERROR
      // =====================================================

      if (error.response) {
        setError(error.response.data || "Unable to reset password.");
      } else {
        setError("Unable to connect to backend server.");
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(135deg, #eefbf3 0%, #f8fbff 50%, #fff8ed 100%)",
        padding: "40px 15px",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              {/* ================================
                  HEADER
              ================================= */}

              <div
                className="text-white text-center p-4"
                style={{
                  background: "linear-gradient(135deg, #087f5b, #20c997)",
                }}
              >
                <div
                  style={{
                    fontSize: "45px",
                  }}
                >
                  🔐
                </div>

                <h2 className="fw-bold mb-1">Forgot Password</h2>

                <p className="mb-0">Reset your seller account password</p>
              </div>

              {/* ================================
                  BODY
              ================================= */}

              <div className="card-body p-4">
                {/* SUCCESS MESSAGE */}

                {message && (
                  <div className="alert alert-success">{message}</div>
                )}

                {/* ERROR MESSAGE */}

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleResetPassword}>
                  {/* EMAIL */}

                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      Registered Email Address
                    </label>

                    <div className="input-group">
                      <span className="input-group-text">📧</span>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </div>

                    <small className="text-muted">
                      Enter the same email used during seller registration.
                    </small>
                  </div>

                  {/* NEW PASSWORD */}

                  <div className="mb-4">
                    <label className="form-label fw-bold">New Password</label>

                    <div className="input-group">
                      <span className="input-group-text">🔒</span>

                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>

                  {/* CONFIRM PASSWORD */}

                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      Confirm New Password
                    </label>

                    <div className="input-group">
                      <span className="input-group-text">🔒</span>

                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>

                  {/* RESET PASSWORD */}

                  <button
                    type="submit"
                    className="btn btn-success w-100 py-3 fw-bold"
                    disabled={loading}
                  >
                    {loading ? "Updating Password..." : "Reset Password"}
                  </button>
                </form>

                {/* BACK TO LOGIN */}

                <div className="text-center mt-4">
                  <Link
                    to="/seller/login"
                    className="text-decoration-none"
                    style={{
                      color: "#087f5b",
                      fontWeight: "600",
                    }}
                  >
                    ← Back to Seller Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
