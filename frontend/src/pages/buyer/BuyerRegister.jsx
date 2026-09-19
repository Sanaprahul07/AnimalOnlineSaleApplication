import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BuyerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==============================
    // VALIDATION
    // ==============================

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

      // ==============================
      // CUSTOMER REGISTER API
      // ==============================

      const response = await axios.post(
        "http://localhost:8080/api/customer/register",
        {
          customerName: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }
      );

      console.log("Customer Registration Response:", response.data);

      // ==============================
      // REGISTRATION SUCCESS
      // ==============================

      alert("Registration successful. Please login.");

      navigate("/buyer/login");

    } catch (error) {
      console.error("Buyer Registration Error:", error);

      const backendMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message ||
            error.response?.data?.error;

      setError(
        backendMessage || "Unable to register buyer account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Buyer Registration
              </h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* BUYER NAME */}

                <div className="mb-3">
                  <label className="form-label">
                    Buyer Name
                  </label>

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

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

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

                <div className="mb-3">
                  <label className="form-label">
                    Mobile Number
                  </label>

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

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                </div>

                {/* REGISTER */}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>

              </form>

              {/* LOGIN */}

              <div className="text-center mt-3">

                <span>
                  Already have an account?{" "}
                </span>

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
    </div>
  );
}

export default BuyerRegister;