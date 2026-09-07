
import { useNavigate } from "react-router-dom";

function SellerRegistrationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center"
         style={{ minHeight: "100vh" }}>

      <div
        className="card shadow p-5 text-center"
        style={{ maxWidth: "550px", width: "100%" }}
      >
        <div style={{ fontSize: "60px" }}>✅</div>

        <h2 className="text-success mt-3">
          Registration Successful
        </h2>

        <p className="mt-3 mb-2">
          Your email has been verified successfully.
        </p>

        <p className="text-muted">
          Your seller account is now <strong>pending Admin approval</strong>.
          You can login after your account is approved by Admin.
        </p>

        <button
          className="btn btn-success mt-3"
          onClick={() => navigate("/seller/login")}
        >
          Go to Seller Login
        </button>
      </div>
    </div>
  );
}

export default SellerRegistrationSuccess;