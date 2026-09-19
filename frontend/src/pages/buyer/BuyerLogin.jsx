import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BuyerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/customer/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Customer Login Response:", response.data);

      // =====================================================
      // SAVE CUSTOMER ID
      // =====================================================

      if (response.data?.id) {
        localStorage.setItem(
          "customerId",
          String(response.data.id)
        );
      }

      // =====================================================
      // RETURN TO SELECTED ANIMAL
      // =====================================================

      const pendingAnimalId =
        localStorage.getItem("pendingAnimalId");

      if (pendingAnimalId) {
        localStorage.removeItem("pendingAnimalId");

        navigate(`/animal/${pendingAnimalId}`);
        return;
      }

      // =====================================================
      // NORMAL BUYER LOGIN
      // =====================================================

      navigate("/buyer/dashboard");

    } catch (error) {
      console.error("Buyer Login Error:", error);

      const backendMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message ||
            error.response?.data?.error;

      setError(
        backendMessage || "Unable to login buyer account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">

          <div className="card shadow-sm border-0">

            <div className="card-body p-4">

              <h2 className="text-center fw-bold mb-2">
                Buyer Login
              </h2>

              <p className="text-center text-muted mb-4">
                Login to your buyer account
              </p>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

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
                    placeholder="Enter your email"
                  />
                </div>

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
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

              </form>

              <div className="text-center mt-3">

                <span>
                  Don't have an account?{" "}
                </span>

                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() =>
                    navigate("/buyer/register")
                  }
                >
                  Register
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default BuyerLogin;