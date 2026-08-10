import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginSeller } from "../../services/SellerService";

function SellerLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    // =====================================
    // SELLER LOGIN
    // =====================================

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        // =====================================
        // VALIDATION
        // =====================================

        if (!email.trim()) {

            setError("Please enter seller email.");

            return;
        }

        if (!password.trim()) {

            setError("Please enter password.");

            return;
        }


        try {

            setLoading(true);


            // =====================================
            // LOGIN DATA
            // =====================================

            const loginData = {

                email: email.trim(),

                password: password

            };


            console.log("=================================");
            console.log("SELLER LOGIN STARTED");
            console.log("Email:", email.trim());
            console.log("=================================");


            // =====================================
            // CALL BACKEND
            // =====================================

            const response = await loginSeller(loginData);


            console.log("SELLER LOGIN RESPONSE:");
            console.log(response.data);


            // =====================================
            // CHECK RESPONSE
            // =====================================

            if (!response.data) {

                setError(
                    "Seller login failed. No seller data received."
                );

                return;
            }


            // =====================================
            // GET SELLER ID
            // =====================================

            const sellerId = response.data.id;


            console.log(
                "Logged-in Seller ID:",
                sellerId
            );


            // =====================================
            // SAVE SELLER INFORMATION
            // =====================================

            localStorage.setItem(
                "seller",
                JSON.stringify(response.data)
            );


            localStorage.setItem(
                "sellerId",
                sellerId
            );


            localStorage.setItem(
                "sellerEmail",
                response.data.email || email.trim()
            );


            localStorage.setItem(
                "sellerLoggedIn",
                "true"
            );


            console.log(
                "Seller information saved successfully."
            );


            // =====================================
            // SUCCESS MESSAGE
            // =====================================

            setMessage(
                "Seller Login Successful!"
            );


            // =====================================
            // GO TO SELLER DASHBOARD
            // =====================================

            console.log(
                "Opening Seller Dashboard..."
            );


            // Small delay so success message can appear
            setTimeout(() => {

                navigate(
                    "/seller/dashboard",
                    {
                        replace: true
                    }
                );

            }, 500);


        } catch (error) {

            console.error(
                "SELLER LOGIN ERROR:",
                error
            );


            // =====================================
            // BACKEND ERROR
            // =====================================

            if (error.response) {

                console.error(
                    "Backend Status:",
                    error.response.status
                );

                console.error(
                    "Backend Response:",
                    error.response.data
                );


                setError(
                    error.response.data?.message ||
                    "Invalid seller email or password."
                );


            } else {

                setError(
                    "Unable to connect to backend server."
                );

            }


        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // UI
    // =====================================

    return (

        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background:
                    "linear-gradient(135deg, #eefbf3 0%, #f8fbff 50%, #fff8ed 100%)",
                padding: "40px 15px"
            }}
        >

            <div className="container">

                <div className="row justify-content-center align-items-center">


                    {/* =================================
                            LEFT SIDE
                    ================================= */}

                    <div className="col-lg-5 mb-4 mb-lg-0">

                        <div className="pe-lg-5">


                            {/* LOGO */}

                            <div className="mb-4">

                                <h1
                                    className="fw-bold mb-1"
                                    style={{
                                        color: "#087f5b",
                                        fontSize: "38px"
                                    }}
                                >
                                    🐄 AnimalSale
                                </h1>

                                <p className="text-muted mb-0">
                                    Buy & Sell Animals Online
                                </p>

                            </div>


                            {/* HEADING */}

                            <h2
                                className="fw-bold"
                                style={{
                                    fontSize: "34px",
                                    color: "#222"
                                }}
                            >
                                Welcome Back, Seller! 👋
                            </h2>


                            <p
                                className="text-muted mt-3"
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.7"
                                }}
                            >
                                Login to your seller account and manage
                                your animals, listings and sales from one
                                simple dashboard.
                            </p>


                            {/* FEATURES */}

                            <div className="mt-4">


                                <div className="d-flex align-items-center mb-3">

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            backgroundColor: "#dff7ec"
                                        }}
                                    >
                                        🐄
                                    </div>

                                    <div>

                                        <strong>
                                            Manage Your Animals
                                        </strong>

                                        <small className="d-block text-muted">
                                            Add and manage your animal listings
                                        </small>

                                    </div>

                                </div>


                                <div className="d-flex align-items-center mb-3">

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            backgroundColor: "#e5efff"
                                        }}
                                    >
                                        📊
                                    </div>

                                    <div>

                                        <strong>
                                            Seller Dashboard
                                        </strong>

                                        <small className="d-block text-muted">
                                            Track your listings and activity
                                        </small>

                                    </div>

                                </div>


                                <div className="d-flex align-items-center">

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            backgroundColor: "#fff0d6"
                                        }}
                                    >
                                        🔒
                                    </div>

                                    <div>

                                        <strong>
                                            Secure Account
                                        </strong>

                                        <small className="d-block text-muted">
                                            Your seller account stays protected
                                        </small>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                            LOGIN CARD
                    ================================= */}

                    <div className="col-lg-5">

                        <div
                            className="card border-0 shadow-lg"
                            style={{
                                borderRadius: "20px",
                                overflow: "hidden"
                            }}
                        >


                            {/* HEADER */}

                            <div
                                className="text-white text-center p-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #087f5b, #20c997)"
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "45px"
                                    }}
                                >
                                    🐄
                                </div>

                                <h2 className="fw-bold mb-1">
                                    Seller Login
                                </h2>

                                <p className="mb-0">
                                    Access your seller account
                                </p>

                            </div>


                            {/* BODY */}

                            <div className="card-body p-4">


                                {/* SUCCESS MESSAGE */}

                                {message && (

                                    <div className="alert alert-success">

                                        {message}

                                    </div>

                                )}


                                {/* ERROR MESSAGE */}

                                {error && (

                                    <div className="alert alert-danger">

                                        {error}

                                    </div>

                                )}


                                <form onSubmit={handleLogin}>


                                    {/* EMAIL */}

                                    <div className="mb-4">

                                        <label className="form-label fw-bold">

                                            Email Address

                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">
                                                📧
                                            </span>

                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter seller email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* PASSWORD */}

                                    <div className="mb-4">

                                        <label className="form-label fw-bold">

                                            Password

                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">
                                                🔒
                                            </span>

                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* LOGIN BUTTON */}

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 py-3 fw-bold"
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Logging in..."
                                            : "Login to Seller Account →"
                                        }

                                    </button>

                                </form>


                                {/* OR */}

                                <div className="d-flex align-items-center my-4">

                                    <hr className="flex-grow-1" />

                                    <span className="mx-3 text-muted">
                                        OR
                                    </span>

                                    <hr className="flex-grow-1" />

                                </div>


                                {/* REGISTER */}

                                <div className="text-center">

                                    <p className="text-muted mb-2">
                                        Don't have a seller account?
                                    </p>

                                    <Link
                                        to="/seller/register"
                                        className="btn btn-outline-success w-100 fw-semibold"
                                    >
                                        Create Seller Account
                                    </Link>

                                </div>


                                {/* HOME */}

                                <div className="text-center mt-4">

                                    <Link
                                        to="/"
                                        className="text-decoration-none text-muted"
                                    >
                                        ← Back to AnimalSale
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

export default SellerLogin;