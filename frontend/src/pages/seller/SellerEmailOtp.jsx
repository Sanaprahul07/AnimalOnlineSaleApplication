import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
    verifyEmailOtp,
    resendEmailOtp
} from "../../services/SellerService";

function SellerEmailOtp() {
    const navigate = useNavigate();
    const location = useLocation();

    // =====================================================
    // GET EMAIL FROM SELLER REGISTRATION
    // =====================================================

    const email = location.state?.email || "";

    // =====================================================
    // OTP STATE
    // =====================================================

    const [otp, setOtp] = useState("");

    // =====================================================
    // MESSAGE STATE
    // =====================================================

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // =====================================================
    // LOADING STATE
    // =====================================================

    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    // =====================================================
    // VERIFY OTP
    // =====================================================

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        // -------------------------------------------------
        // EMAIL CHECK
        // -------------------------------------------------

        if (!email) {
            setError(
                "Seller email is missing. Please register again."
            );
            return;
        }

        // -------------------------------------------------
        // OTP CHECK
        // -------------------------------------------------

        if (!/^[0-9]{6}$/.test(otp)) {
            setError(
                "Please enter a valid 6 digit OTP."
            );
            return;
        }

        try {
            setLoading(true);

            // -------------------------------------------------
            // VERIFY OTP API
            // -------------------------------------------------

            const response = await verifyEmailOtp(
                email,
                otp
            );

            console.log(
                "Email OTP Verification Response:",
                response.data
            );

            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            setMessage(
                "Email verified successfully. Seller registration completed."
            );

            // -------------------------------------------------
            // GO TO SELLER LOGIN
            // -------------------------------------------------

            setTimeout(() => {
                navigate("/seller/login");
            }, 1500);

        } catch (err) {

            console.error(
                "Email OTP Verification Error:",
                err
            );

            // -------------------------------------------------
            // BACKEND ERROR
            // -------------------------------------------------

            if (
                err.response &&
                err.response.data
            ) {
                setError(
                    err.response.data.message ||
                    "Invalid or expired OTP."
                );
            } else {
                setError(
                    "Unable to connect to server."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // RESEND OTP
    // =====================================================

    const handleResendOtp = async () => {

        setMessage("");
        setError("");

        if (!email) {
            setError(
                "Seller email is missing. Please register again."
            );
            return;
        }

        try {

            setResendLoading(true);

            const response =
                await resendEmailOtp(email);

            console.log(
                "Resend OTP Response:",
                response.data
            );

            setMessage(
                "A new OTP has been sent to your email."
            );

        } catch (err) {

            console.error(
                "Resend OTP Error:",
                err
            );

            if (
                err.response &&
                err.response.data
            ) {
                setError(
                    err.response.data.message ||
                    "Unable to resend OTP."
                );
            } else {
                setError(
                    "Unable to connect to server."
                );
            }

        } finally {
            setResendLoading(false);
        }
    };

    // =====================================================
    // PAGE UI
    // =====================================================

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background:
                    "linear-gradient(135deg, #eefbf3 0%, #f8fbff 50%, #fff8ed 100%)",
                padding: "30px 15px"
            }}
        >

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-5 col-md-7 col-sm-10">

                        <div
                            className="card border-0 shadow-lg"
                            style={{
                                borderRadius: "20px",
                                overflow: "hidden"
                            }}
                        >

                            {/* =================================================
                                HEADER
                            ================================================= */}

                            <div
                                className="text-center text-white p-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #087f5b, #20a66a)"
                                }}
                            >

                                <div
                                    className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        backgroundColor:
                                            "rgba(255,255,255,0.18)",
                                        fontSize: "32px"
                                    }}
                                >
                                    📧
                                </div>

                                <h3 className="fw-bold mb-1">
                                    Verify Your Email
                                </h3>

                                <p className="mb-0 opacity-75">
                                    Seller Email OTP Verification
                                </p>

                            </div>

                            {/* =================================================
                                BODY
                            ================================================= */}

                            <div className="card-body p-4 p-md-5">

                                {/* SUCCESS MESSAGE */}

                                {message && (
                                    <div className="alert alert-success">
                                        ✅ {message}
                                    </div>
                                )}

                                {/* ERROR MESSAGE */}

                                {error && (
                                    <div className="alert alert-danger">
                                        ⚠️ {error}
                                    </div>
                                )}

                                {/* =================================================
                                    EMAIL INFORMATION
                                ================================================= */}

                                <div className="text-center mb-4">

                                    <p className="text-muted mb-2">
                                        OTP has been sent to:
                                    </p>

                                    <strong
                                        className="text-success"
                                        style={{
                                            wordBreak: "break-word"
                                        }}
                                    >
                                        {email ||
                                            "Your registered email"}
                                    </strong>

                                </div>

                                {/* =================================================
                                    OTP FORM
                                ================================================= */}

                                <form onSubmit={handleVerifyOtp}>

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Enter 6 Digit OTP *
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control text-center"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) =>
                                                setOtp(
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                    )
                                                )
                                            }
                                            maxLength={6}
                                            inputMode="numeric"
                                            autoComplete="one-time-code"
                                            autoFocus
                                            style={{
                                                fontSize: "22px",
                                                letterSpacing: "8px",
                                                fontWeight: "bold"
                                            }}
                                        />

                                        <small className="text-muted">
                                            Enter the 6 digit OTP received
                                            on your email.
                                        </small>

                                    </div>

                                    {/* =================================================
                                        VERIFY BUTTON
                                    ================================================= */}

                                    <button
                                        type="submit"
                                        className="btn w-100 text-white fw-bold py-3"
                                        disabled={loading}
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #087f5b, #20a66a)",
                                            border: "none",
                                            borderRadius: "10px",
                                            fontSize: "16px"
                                        }}
                                    >

                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                ></span>

                                                Verifying OTP...
                                            </>
                                        ) : (
                                            <>
                                                Verify Email OTP

                                                <span className="ms-2">
                                                    ✓
                                                </span>
                                            </>
                                        )}

                                    </button>

                                </form>

                                {/* =================================================
                                    RESEND OTP
                                ================================================= */}

                                <div className="text-center mt-4">

                                    <p className="text-muted mb-2">
                                        Didn't receive the OTP?
                                    </p>

                                    <button
                                        type="button"
                                        className="btn btn-outline-success"
                                        onClick={handleResendOtp}
                                        disabled={resendLoading}
                                    >

                                        {resendLoading
                                            ? "Sending..."
                                            : "Resend OTP"}

                                    </button>

                                </div>

                                {/* =================================================
                                    SELLER LOGIN
                                ================================================= */}

                                <div className="text-center mt-4">

                                    <Link
                                        to="/seller/login"
                                        className="text-decoration-none text-success fw-semibold"
                                    >
                                        Go to Seller Login
                                    </Link>

                                </div>

                                {/* =================================================
                                    BACK TO REGISTRATION
                                ================================================= */}

                                <div className="text-center mt-3">

                                    <Link
                                        to="/seller/register"
                                        className="text-decoration-none text-muted small"
                                    >
                                        ← Back to Registration
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

export default SellerEmailOtp;