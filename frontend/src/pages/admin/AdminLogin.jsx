import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
            [name]: value
        }));

        setErrorMessage("");
    };

    // =====================================================
    // ADMIN LOGIN
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");

        // ---------------------------------------------
        // VALIDATION
        // ---------------------------------------------

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

            // ---------------------------------------------
            // EXISTING BACKEND LOGIN API
            // ---------------------------------------------

            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    email: formData.email.trim(),
                    password: formData.password
                }
            );

            console.log("Admin Login Response:", response.data);

            // ---------------------------------------------
            // CHECK ROLE
            // ---------------------------------------------

            const user = response.data;

            const role = user?.role?.toLowerCase() || "";

            if (role !== "admin") {
                setErrorMessage(
                    "Access denied. This account is not an admin account."
                );
                return;
            }

            // ---------------------------------------------
            // SAVE ADMIN LOGIN DATA
            // ---------------------------------------------

            localStorage.setItem(
                "adminId",
                String(user.id)
            );

            localStorage.setItem(
                "adminLogin",
                "true"
            );

            localStorage.setItem(
                "adminEmail",
                user.email || ""
            );

            localStorage.setItem(
                "adminName",
                user.fullName || "Admin"
            );

            localStorage.setItem(
                "adminRole",
                user.role || "ADMIN"
            );

            // ---------------------------------------------
            // GO TO ADMIN DASHBOARD
            // ---------------------------------------------

            navigate("/admin/dashboard");

        } catch (error) {
            console.error("Admin Login Error:", error);

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
                    "Invalid email or password."
                );
            } else if (error.request) {
                setErrorMessage(
                    "Unable to connect to backend server."
                );
            } else {
                setErrorMessage(
                    error.message ||
                    "Admin login failed."
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
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3"
        >
            <div
                className="card border-0 shadow"
                style={{
                    width: "100%",
                    maxWidth: "430px",
                    borderRadius: "16px"
                }}
            >
                <div className="card-body p-4 p-md-5">

                    {/* =====================================
                        BRAND
                    ===================================== */}

                    <div className="text-center mb-4">

                        <div
                            className="fw-bold text-success"
                            style={{
                                fontSize: "30px"
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

                    {/* =====================================
                        ERROR
                    ===================================== */}

                    {errorMessage && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                        >
                            {errorMessage}
                        </div>
                    )}

                    {/* =====================================
                        FORM
                    ===================================== */}

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

                    {/* =====================================
                        BACK
                    ===================================== */}

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