import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    registerSeller,
    resendEmailOtp,
    verifyEmailOtp
} from "../../services/SellerService";

import "../../styles/seller.css";


function SellerRegister() {

    const navigate = useNavigate();


    // =====================================================
    // SELLER REGISTRATION FORM STATES
    // =====================================================

    const [sellerName, setSellerName] = useState("");

    const [ownerName, setOwnerName] = useState("");

    const [email, setEmail] = useState("");

    const [mobile, setMobile] = useState("");

    const [password, setPassword] = useState("");


    // =====================================================
    // BUSINESS INFORMATION
    // =====================================================

    const [businessName, setBusinessName] = useState("");

    const [farmName, setFarmName] = useState("");


    // =====================================================
    // KYC INFORMATION
    // =====================================================

    const [aadhaarNumber, setAadhaarNumber] = useState("");

    const [panNumber, setPanNumber] = useState("");


    // =====================================================
    // AADHAAR FRONT / BACK IMAGE
    // =====================================================

    const [aadhaarFrontFile, setAadhaarFrontFile] =
        useState(null);

    const [aadhaarBackFile, setAadhaarBackFile] =
        useState(null);


    // =====================================================
    // ADDRESS INFORMATION
    // =====================================================

    const [address, setAddress] = useState("");

    const [city, setCity] = useState("");

    const [state, setState] = useState("");

    const [pincode, setPincode] = useState("");

    const [location, setLocation] = useState("");


    // =====================================================
    // PROFILE IMAGE URL
    // =====================================================

    const [profileImage, setProfileImage] = useState("");


    // =====================================================
    // EMAIL OTP
    // =====================================================

    const [otp, setOtp] = useState("");

    const [otpStep, setOtpStep] = useState(false);


    // =====================================================
    // MESSAGE / ERROR
    // =====================================================

    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    // =====================================================
    // LOADING
    // =====================================================

    const [loading, setLoading] = useState(false);

    const [resendLoading, setResendLoading] =
        useState(false);


    // =====================================================
    // RESET MESSAGE
    // =====================================================

    const resetMessages = () => {

        setError("");

        setMessage("");

    };


    // =====================================================
    // SELLER REGISTER
    // =====================================================

    const handleRegister = async (e) => {

        e.preventDefault();

        resetMessages();


        // =================================================
        // REQUIRED FIELD CHECK
        // =================================================

        if (
            !sellerName.trim() ||
            !ownerName.trim() ||
            !email.trim() ||
            !mobile.trim() ||
            !password ||
            !businessName.trim() ||
            !farmName.trim() ||
            !aadhaarNumber.trim() ||
            !aadhaarFrontFile ||
            !aadhaarBackFile ||
            !panNumber.trim() ||
            !address.trim() ||
            !city.trim() ||
            !state.trim() ||
            !pincode.trim() ||
            !location.trim()
        ) {

            setError(
                "Please fill all required fields and upload both Aadhaar images."
            );

            return;
        }


        // =================================================
        // EMAIL VALIDATION
        // =================================================

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email.trim()
            )
        ) {

            setError(
                "Please enter a valid email address."
            );

            return;
        }


        // =================================================
        // MOBILE VALIDATION
        // =================================================

        if (
            !/^\d{10}$/.test(
                mobile.trim()
            )
        ) {

            setError(
                "Please enter a valid 10 digit mobile number."
            );

            return;
        }


        // =================================================
        // PINCODE VALIDATION
        // =================================================

        if (
            !/^\d{6}$/.test(
                pincode.trim()
            )
        ) {

            setError(
                "Please enter a valid 6 digit pincode."
            );

            return;
        }


        // =================================================
        // AADHAAR NUMBER VALIDATION
        // =================================================

        if (
            !/^\d{12}$/.test(
                aadhaarNumber.trim()
            )
        ) {

            setError(
                "Please enter a valid 12 digit Aadhaar number."
            );

            return;
        }


        // =================================================
        // PAN VALIDATION
        // =================================================

        if (
            !/^[A-Za-z]{5}\d{4}[A-Za-z]$/.test(
                panNumber.trim()
            )
        ) {

            setError(
                "Please enter a valid PAN number."
            );

            return;
        }


        // =================================================
        // PASSWORD VALIDATION
        // =================================================

        if (password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }


        // =================================================
        // AADHAAR IMAGE SIZE
        // =================================================

        if (
            aadhaarFrontFile.size >
                5 * 1024 * 1024 ||

            aadhaarBackFile.size >
                5 * 1024 * 1024
        ) {

            setError(
                "Each Aadhaar image must be 5 MB or smaller."
            );

            return;
        }


        // =================================================
        // AADHAAR IMAGE TYPE
        // =================================================

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];


        if (
            !allowedTypes.includes(
                aadhaarFrontFile.type
            ) ||

            !allowedTypes.includes(
                aadhaarBackFile.type
            )
        ) {

            setError(
                "Aadhaar images must be JPG, PNG or WEBP files."
            );

            return;
        }


        // =================================================
        // SEND REGISTRATION DATA
        // =================================================

        try {

            setLoading(true);


            // =============================================
            // FORM DATA
            // =============================================

            const formData = new FormData();


            // =============================================
            // PERSONAL INFORMATION
            // =============================================

            formData.append(
                "sellerName",
                sellerName.trim()
            );


            formData.append(
                "ownerName",
                ownerName.trim()
            );


            formData.append(
                "email",
                email.trim().toLowerCase()
            );


            formData.append(
                "mobile",
                mobile.trim()
            );


            formData.append(
                "password",
                password
            );


            // =============================================
            // BUSINESS INFORMATION
            // =============================================

            formData.append(
                "businessName",
                businessName.trim()
            );


            formData.append(
                "farmName",
                farmName.trim()
            );


            // =============================================
            // KYC INFORMATION
            // =============================================

            formData.append(
                "aadhaarNumber",
                aadhaarNumber.trim()
            );


            formData.append(
                "panNumber",
                panNumber.trim().toUpperCase()
            );


            // =============================================
            // ADDRESS INFORMATION
            // =============================================

            formData.append(
                "address",
                address.trim()
            );


            formData.append(
                "city",
                city.trim()
            );


            formData.append(
                "state",
                state.trim()
            );


            formData.append(
                "pincode",
                pincode.trim()
            );


            formData.append(
                "location",
                location.trim()
            );


            // =============================================
            // PROFILE IMAGE
            // =============================================

            formData.append(
                "profileImage",
                profileImage.trim()
            );


            // =============================================
            // AADHAAR FRONT IMAGE
            // =============================================

            formData.append(
                "aadhaarFrontFile",
                aadhaarFrontFile
            );


            // =============================================
            // AADHAAR BACK IMAGE
            // =============================================

            formData.append(
                "aadhaarBackFile",
                aadhaarBackFile
            );


            // =============================================
            // CALL SELLER REGISTER API
            // =============================================

            await registerSeller(formData);


            // =============================================
            // REGISTRATION SUCCESS
            // OTP IS NOW SENT BY BACKEND
            // =============================================

            setOtpStep(true);

            setOtp("");

            setMessage(
                `OTP sent to ${email.trim().toLowerCase()}. Please verify your email.`
            );


        } catch (err) {

            console.error(
                "Seller Registration Error:",
                err
            );


            setError(

                err.response?.data?.message ||

                (
                    typeof err.response?.data ===
                    "string"

                        ? err.response.data

                        : "Seller Registration Failed."
                )
            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // VERIFY EMAIL OTP
    // =====================================================

    const handleVerifyOtp = async (e) => {

        e.preventDefault();

        resetMessages();


        // =================================================
        // OTP VALIDATION
        // =================================================

        if (!/^\d{6}$/.test(otp)) {

            setError(
                "Please enter a valid 6 digit OTP."
            );

            return;
        }


        // =================================================
        // VERIFY OTP
        // =================================================

        try {

            setLoading(true);


            await verifyEmailOtp(
                email.trim().toLowerCase(),
                otp
            );


            // =============================================
            // SUCCESS
            // =============================================

            setMessage(
                "Email verified successfully. Opening Seller Login..."
            );


            // =============================================
            // OPEN SELLER LOGIN
            // =============================================

            setTimeout(() => {

                navigate(
                    "/seller/login",
                    {
                        replace: true
                    }
                );

            }, 1000);


        } catch (err) {

            console.error(
                "Seller Email OTP Error:",
                err
            );


            setError(

                err.response?.data?.message ||

                (
                    typeof err.response?.data ===
                    "string"

                        ? err.response.data

                        : "Invalid or expired OTP."
                )
            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // RESEND OTP
    // =====================================================

    const handleResendOtp = async () => {

        resetMessages();


        // =================================================
        // EMAIL CHECK
        // =================================================

        if (!email.trim()) {

            setError(
                "Seller email is missing. Please register again."
            );

            return;
        }


        try {

            setResendLoading(true);


            await resendEmailOtp(
                email.trim().toLowerCase()
            );


            setOtp("");


            setMessage(
                `A new OTP was sent to ${email.trim().toLowerCase()}.`
            );


        } catch (err) {

            console.error(
                "Resend OTP Error:",
                err
            );


            setError(

                err.response?.data?.message ||

                (
                    typeof err.response?.data ===
                    "string"

                        ? err.response.data

                        : "Unable to resend OTP."
                )
            );


        } finally {

            setResendLoading(false);

        }

    };


    // =====================================================
    // INPUT STYLE
    // =====================================================

    const inputStyle = {
        backgroundColor: "#f8fbff"
    };


    // =====================================================
    // REGISTER FORM
    // =====================================================

    const renderRegisterFace = () => (

        <div className="seller-register-face seller-register-front">

            <div className="card border-0 shadow-lg h-100 seller-register-card">


                {/* =========================================
                        HEADER
                ========================================= */}

                <div
                    className="text-center text-white p-4 seller-card-header"
                >

                    <div
                        className="mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center seller-header-icon"
                    >
                        👨‍🌾
                    </div>


                    <h3 className="fw-bold mb-1">
                        Seller Registration
                    </h3>


                    <p className="mb-0 opacity-75">
                        Create your seller account
                    </p>

                </div>


                {/* =========================================
                        FORM BODY
                ========================================= */}

                <div className="card-body p-4 p-md-5">


                    {/* ERROR */}

                    {error && !otpStep && (

                        <div className="alert alert-danger">
                            ⚠️ {error}
                        </div>

                    )}


                    {/* SUCCESS */}

                    {message && !otpStep && (

                        <div className="alert alert-success">
                            ✅ {message}
                        </div>

                    )}


                    <form
                        onSubmit={handleRegister}
                        autoComplete="off"
                    >


                        {/* =================================
                                PERSONAL INFORMATION
                        ================================= */}

                        <h5 className="text-success fw-bold mb-3">
                            Personal Information
                        </h5>


                        {/* SELLER NAME */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Seller Name *
                            </label>

                            <input
                                type="text"
                                name="sellerName"
                                className="form-control"
                                style={inputStyle}
                                value={sellerName}
                                onChange={(e) =>
                                    setSellerName(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter seller name"
                                autoComplete="off"
                            />

                        </div>


                        {/* OWNER NAME */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Owner Name *
                            </label>

                            <input
                                type="text"
                                name="ownerName"
                                className="form-control"
                                style={inputStyle}
                                value={ownerName}
                                onChange={(e) =>
                                    setOwnerName(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter owner name"
                                autoComplete="off"
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Email Address *
                            </label>

                            <input
                                type="email"
                                name="sellerEmail"
                                className="form-control"
                                style={inputStyle}
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter email address"
                                autoComplete="off"
                            />

                            <small className="text-muted">
                                OTP will be sent to this email.
                            </small>

                        </div>


                        {/* MOBILE */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Mobile Number *
                            </label>

                            <input
                                type="text"
                                name="sellerMobile"
                                className="form-control"
                                style={inputStyle}
                                value={mobile}
                                onChange={(e) =>
                                    setMobile(
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        )
                                    )
                                }
                                maxLength={10}
                                placeholder="Enter 10 digit mobile number"
                                autoComplete="off"
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Password *
                            </label>

                            <input
                                type="password"
                                name="sellerPassword"
                                className="form-control"
                                style={inputStyle}
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Create password"
                                autoComplete="new-password"
                            />

                            <small className="text-muted">
                                Minimum 6 characters.
                            </small>

                        </div>


                        {/* =================================
                                BUSINESS INFORMATION
                        ================================= */}

                        <h5 className="text-success fw-bold mt-4 mb-3">
                            Business Information
                        </h5>


                        {/* BUSINESS NAME */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Business Name *
                            </label>

                            <input
                                type="text"
                                name="businessName"
                                className="form-control"
                                style={inputStyle}
                                value={businessName}
                                onChange={(e) =>
                                    setBusinessName(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter business name"
                                autoComplete="off"
                            />

                        </div>


                        {/* FARM NAME */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Farm Name *
                            </label>

                            <input
                                type="text"
                                name="farmName"
                                className="form-control"
                                style={inputStyle}
                                value={farmName}
                                onChange={(e) =>
                                    setFarmName(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter farm name"
                                autoComplete="off"
                            />

                        </div>


                        {/* =================================
                                KYC INFORMATION
                        ================================= */}

                        <h5 className="text-success fw-bold mt-4 mb-3">
                            KYC Information
                        </h5>


                        {/* AADHAAR NUMBER */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Aadhaar Number *
                            </label>

                            <input
                                type="text"
                                name="aadhaarNumber"
                                className="form-control"
                                style={inputStyle}
                                value={aadhaarNumber}
                                onChange={(e) =>
                                    setAadhaarNumber(
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        )
                                    )
                                }
                                maxLength={12}
                                placeholder="Enter 12 digit Aadhaar number"
                                autoComplete="off"
                            />

                        </div>


                        {/* AADHAAR FRONT */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Aadhaar Front Photo *
                            </label>

                            <input
                                type="file"
                                name="aadhaarFrontFile"
                                className="form-control"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) =>
                                    setAadhaarFrontFile(
                                        e.target.files?.[0] ||
                                        null
                                    )
                                }
                            />


                            {aadhaarFrontFile && (

                                <small className="text-success d-block mt-1">

                                    Selected:
                                    {" "}
                                    {aadhaarFrontFile.name}

                                </small>

                            )}

                        </div>


                        {/* AADHAAR BACK */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Aadhaar Back Photo *
                            </label>

                            <input
                                type="file"
                                name="aadhaarBackFile"
                                className="form-control"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) =>
                                    setAadhaarBackFile(
                                        e.target.files?.[0] ||
                                        null
                                    )
                                }
                            />


                            {aadhaarBackFile && (

                                <small className="text-success d-block mt-1">

                                    Selected:
                                    {" "}
                                    {aadhaarBackFile.name}

                                </small>

                            )}

                        </div>


                        {/* PAN */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                PAN Number *
                            </label>

                            <input
                                type="text"
                                name="panNumber"
                                className="form-control"
                                style={inputStyle}
                                value={panNumber}
                                onChange={(e) =>
                                    setPanNumber(
                                        e.target.value.toUpperCase()
                                    )
                                }
                                maxLength={10}
                                placeholder="ABCDE1234F"
                                autoComplete="off"
                            />

                        </div>


                        {/* =================================
                                ADDRESS INFORMATION
                        ================================= */}

                        <h5 className="text-success fw-bold mt-4 mb-3">
                            Address Information
                        </h5>


                        {/* ADDRESS */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Address *
                            </label>

                            <textarea
                                name="address"
                                className="form-control"
                                style={inputStyle}
                                value={address}
                                onChange={(e) =>
                                    setAddress(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter complete address"
                                rows="2"
                                autoComplete="off"
                            />

                        </div>


                        {/* CITY + STATE */}

                        <div className="row">


                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">
                                    City *
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    style={inputStyle}
                                    value={city}
                                    onChange={(e) =>
                                        setCity(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter city"
                                    autoComplete="off"
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">
                                    State *
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    className="form-control"
                                    style={inputStyle}
                                    value={state}
                                    onChange={(e) =>
                                        setState(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter state"
                                    autoComplete="off"
                                />

                            </div>

                        </div>


                        {/* PINCODE */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Pincode *
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                className="form-control"
                                style={inputStyle}
                                value={pincode}
                                onChange={(e) =>
                                    setPincode(
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        )
                                    )
                                }
                                maxLength={6}
                                placeholder="Enter 6 digit pincode"
                                autoComplete="off"
                            />

                        </div>


                        {/* SELLER LOCATION */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Seller Location *
                            </label>

                            <input
                                type="text"
                                name="sellerLocation"
                                className="form-control"
                                style={inputStyle}
                                value={location}
                                onChange={(e) =>
                                    setLocation(
                                        e.target.value
                                    )
                                }
                                placeholder="Example: Beed, Maharashtra"
                                autoComplete="off"
                            />

                        </div>


                        {/* PROFILE IMAGE URL */}

                        <div className="mb-4">

                            <label className="form-label fw-semibold">
                                Profile Image URL
                            </label>

                            <input
                                type="text"
                                name="profileImage"
                                className="form-control"
                                style={inputStyle}
                                value={profileImage}
                                onChange={(e) =>
                                    setProfileImage(
                                        e.target.value
                                    )
                                }
                                placeholder="Optional profile image URL"
                                autoComplete="off"
                            />

                        </div>


                        {/* =================================
                                REGISTER BUTTON
                        ================================= */}

                        <button
                            type="submit"
                            className="btn w-100 text-white fw-bold py-3 seller-primary-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Sending OTP..."
                                : "Create Seller Account →"
                            }

                        </button>

                    </form>


                    {/* =================================
                            LOGIN LINK
                    ================================= */}

                    <div className="text-center mt-4">

                        <span className="text-muted">
                            Already have a seller account?{" "}
                        </span>

                        <Link
                            to="/seller/login"
                            className="text-success fw-bold text-decoration-none"
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );


    // =====================================================
    // OTP SCREEN
    // =====================================================

    const renderOtpFace = () => (

        <div className="seller-register-face seller-register-back">

            <div className="card border-0 shadow-lg h-100 seller-register-card seller-otp-card">


                {/* =========================================
                        OTP HEADER
                ========================================= */}

                <div
                    className="text-center text-white p-4 seller-card-header"
                >

                    <div
                        className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center seller-header-icon"
                    >
                        📧
                    </div>


                    <h3 className="fw-bold mb-1">
                        Verify Your Email
                    </h3>


                    <p className="mb-0 opacity-75">
                        Email OTP Verification
                    </p>

                </div>


                {/* =========================================
                        OTP BODY
                ========================================= */}

                <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-center">


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


                    {/* EMAIL */}

                    <div className="text-center mb-4">

                        <p className="text-muted mb-2">
                            OTP has been sent to:
                        </p>


                        <strong className="text-success text-break">
                            {email}
                        </strong>

                    </div>


                    {/* OTP FORM */}

                    <form onSubmit={handleVerifyOtp}>


                        <div className="mb-4">

                            <label className="form-label fw-semibold">
                                Enter 6 Digit OTP *
                            </label>


                            <input
                                type="text"
                                name="emailOtp"
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
                                style={{
                                    fontSize: "22px",
                                    letterSpacing: "8px",
                                    fontWeight: "bold",
                                    backgroundColor: "#f8fbff"
                                }}
                            />

                        </div>


                        {/* VERIFY BUTTON */}

                        <button
                            type="submit"
                            className="btn w-100 text-white fw-bold py-3 seller-primary-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Verifying..."
                                : "Verify Email ✓"
                            }

                        </button>

                    </form>


                    {/* RESEND OTP */}

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
                                : "Resend OTP"
                            }

                        </button>

                    </div>


                    {/* LOGIN */}

                    <div className="text-center mt-4">

                        <Link
                            to="/seller/login"
                            className="text-success text-decoration-none"
                        >
                            Go to Seller Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );


    // =====================================================
    // MAIN SELLER REGISTER PAGE
    // =====================================================

    return (

        <div className="min-vh-100 d-flex align-items-center justify-content-center seller-register-page">

            <div className="container">

                <div className="row justify-content-center align-items-start">


                    {/* =================================================
                            LEFT SIDE
                            THIS SIDE WILL NEVER ROTATE
                    ================================================= */}

                    <div className="col-lg-5 mb-4 mb-lg-0">

                        <div className="pe-lg-5 seller-register-left">


                            {/* BRAND */}

                            <h1 className="fw-bold mb-1 seller-brand">
                                🐄 AnimalSale
                            </h1>


                            <p className="text-muted">
                                Buy & Sell Animals Online
                            </p>


                            {/* TITLE */}

                            <h2 className="fw-bold mt-4 seller-register-title">
                                Become a Seller 🚜
                            </h2>


                            <p className="text-muted mt-3 seller-register-description">
                                Create your seller account and start
                                listing your animals on AnimalSale.
                            </p>


                            {/* FEATURE 1 */}

                            <div className="d-flex align-items-center mb-3 mt-4">

                                <div className="seller-feature-icon seller-feature-green">
                                    🐄
                                </div>

                                <div>

                                    <strong>
                                        List Your Animals
                                    </strong>

                                    <small className="d-block text-muted">
                                        Add cows, buffaloes, goats and more
                                    </small>

                                </div>

                            </div>


                            {/* FEATURE 2 */}

                            <div className="d-flex align-items-center mb-3">

                                <div className="seller-feature-icon seller-feature-blue">
                                    📸
                                </div>

                                <div>

                                    <strong>
                                        Upload Animal Photos
                                    </strong>

                                    <small className="d-block text-muted">
                                        Show buyers your animals clearly
                                    </small>

                                </div>

                            </div>


                            {/* FEATURE 3 */}

                            <div className="d-flex align-items-center">

                                <div className="seller-feature-icon seller-feature-orange">
                                    📈
                                </div>

                                <div>

                                    <strong>
                                        Manage Your Listings
                                    </strong>

                                    <small className="d-block text-muted">
                                        Control your animals from dashboard
                                    </small>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                            RIGHT SIDE
                            ONLY THIS SIDE WILL ROTATE
                    ================================================= */}

                    <div className="col-lg-6 col-md-10 seller-register-right">

                        <div
                            className={`seller-flip-wrapper ${
                                otpStep
                                    ? "is-flipped"
                                    : ""
                            }`}
                        >

                            <div className="seller-flip-inner">

                                {/* REGISTER */}

                                {renderRegisterFace()}


                                {/* OTP */}

                                {renderOtpFace()}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default SellerRegister;