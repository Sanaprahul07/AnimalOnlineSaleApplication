import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerSeller } from "../../services/SellerService";

function SellerRegister() {

    const navigate = useNavigate();

    // ==========================================
    // PERSONAL INFORMATION
    // ==========================================

    const [sellerName, setSellerName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    // ==========================================
    // BUSINESS INFORMATION
    // ==========================================

    const [businessName, setBusinessName] = useState("");
    const [farmName, setFarmName] = useState("");

    // ==========================================
    // KYC INFORMATION
    // ==========================================

    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [panNumber, setPanNumber] = useState("");

    // ==========================================
    // ADDRESS INFORMATION
    // ==========================================

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    // ==========================================
    // LOCATION
    // ==========================================

    const [location, setLocation] = useState("");

    // ==========================================
    // PROFILE IMAGE
    // ==========================================

    const [profileImage, setProfileImage] = useState("");

    // ==========================================
    // MESSAGE
    // ==========================================

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // ==========================================
    // REGISTER SELLER
    // ==========================================

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        // ==========================================
        // REQUIRED FIELD VALIDATION
        // ==========================================

        if (
            !sellerName.trim() ||
            !ownerName.trim() ||
            !email.trim() ||
            !mobile.trim() ||
            !password.trim() ||
            !businessName.trim() ||
            !farmName.trim() ||
            !aadhaarNumber.trim() ||
            !panNumber.trim() ||
            !address.trim() ||
            !city.trim() ||
            !state.trim() ||
            !pincode.trim() ||
            !location.trim()
        ) {

            setError("Please fill all required fields.");
            return;
        }

        // ==========================================
        // MOBILE VALIDATION
        // ==========================================

        if (!/^[0-9]{10}$/.test(mobile)) {

            setError(
                "Please enter a valid 10 digit mobile number."
            );

            return;
        }

        // ==========================================
        // PINCODE VALIDATION
        // ==========================================

        if (!/^[0-9]{6}$/.test(pincode)) {

            setError(
                "Please enter a valid 6 digit pincode."
            );

            return;
        }

        // ==========================================
        // AADHAAR VALIDATION
        // ==========================================

        if (!/^[0-9]{12}$/.test(aadhaarNumber)) {

            setError(
                "Please enter a valid 12 digit Aadhaar number."
            );

            return;
        }

        // ==========================================
        // PAN VALIDATION
        // ==========================================

        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {

            setError(
                "Please enter a valid PAN number."
            );

            return;
        }

        // ==========================================
        // PASSWORD VALIDATION
        // ==========================================

        if (password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }

        try {

            setLoading(true);

            // ==========================================
            // SELLER DATA
            // ==========================================

            const sellerData = {

                sellerName: sellerName.trim(),

                ownerName: ownerName.trim(),

                email: email.trim(),

                mobile: mobile.trim(),

                password: password,

                businessName: businessName.trim(),

                farmName: farmName.trim(),

                aadhaarNumber: aadhaarNumber.trim(),

                panNumber: panNumber.trim().toUpperCase(),

                address: address.trim(),

                city: city.trim(),

                state: state.trim(),

                pincode: pincode.trim(),

                location: location.trim(),

                profileImage: profileImage.trim()

            };

            console.log(
                "Seller Registration Data:",
                sellerData
            );

            // ==========================================
            // CALL BACKEND API
            // ==========================================

            const response =
                await registerSeller(sellerData);

            console.log(
                "Seller Registration Response:",
                response.data
            );

            // ==========================================
            // SUCCESS MESSAGE
            // ==========================================

            setMessage(
                "Seller Registration Successful!"
            );

            // ==========================================
            // CLEAR FORM
            // ==========================================

            setSellerName("");
            setOwnerName("");
            setEmail("");
            setMobile("");
            setPassword("");

            setBusinessName("");
            setFarmName("");

            setAadhaarNumber("");
            setPanNumber("");

            setAddress("");
            setCity("");
            setState("");
            setPincode("");

            setLocation("");
            setProfileImage("");

            // ==========================================
            // REDIRECT TO LOGIN
            // ==========================================

            setTimeout(() => {

                navigate("/seller/login");

            }, 1500);

        } catch (error) {

            console.error(
                "Seller Registration Error:",
                error
            );

            // ==========================================
            // BACKEND ERROR
            // ==========================================

            if (
                error.response &&
                error.response.data
            ) {

                setError(
                    error.response.data.message ||
                    "Seller Registration Failed."
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

                <div className="row justify-content-center">

                    {/* ==========================================
                        LEFT SIDE
                    ========================================== */}

                    <div className="col-lg-5 mb-4 mb-lg-0">

                        <div className="pe-lg-5">

                            <h1
                                className="fw-bold mb-1"
                                style={{
                                    color: "#087f5b",
                                    fontSize: "38px"
                                }}
                            >
                                🐄 AnimalSale
                            </h1>

                            <p className="text-muted">
                                Buy & Sell Animals Online
                            </p>

                            <h2
                                className="fw-bold mt-4"
                                style={{
                                    fontSize: "34px",
                                    color: "#222"
                                }}
                            >
                                Become a Seller 🚜
                            </h2>

                            <p
                                className="text-muted mt-3"
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.7"
                                }}
                            >
                                Create your seller account and
                                start listing your animals on
                                AnimalSale.
                            </p>

                            {/* FEATURE 1 */}

                            <div className="d-flex align-items-center mb-3 mt-4">

                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        backgroundColor: "#dff7ec",
                                        fontSize: "22px"
                                    }}
                                >
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

                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        backgroundColor: "#e6f0ff",
                                        fontSize: "22px"
                                    }}
                                >
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

                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        backgroundColor: "#fff0d9",
                                        fontSize: "22px"
                                    }}
                                >
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

                    {/* ==========================================
                        REGISTRATION CARD
                    ========================================== */}

                    <div className="col-lg-6 col-md-10">

                        <div
                            className="card border-0 shadow-lg"
                            style={{
                                borderRadius: "20px",
                                overflow: "hidden"
                            }}
                        >

                            {/* HEADER */}

                            <div
                                className="text-center text-white p-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #087f5b, #20a66a)"
                                }}
                            >

                                <div
                                    className="mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "65px",
                                        height: "65px",
                                        backgroundColor:
                                            "rgba(255,255,255,0.18)",
                                        fontSize: "30px"
                                    }}
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

                            {/* BODY */}

                            <div className="card-body p-4 p-md-5">

                                {/* SUCCESS */}

                                {message && (

                                    <div className="alert alert-success">

                                        ✅ {message}

                                    </div>

                                )}

                                {/* ERROR */}

                                {error && (

                                    <div className="alert alert-danger">

                                        ⚠️ {error}

                                    </div>

                                )}

                                <form onSubmit={handleRegister}>

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
                                            className="form-control"
                                            placeholder="Enter seller name"
                                            value={sellerName}
                                            onChange={(e) =>
                                                setSellerName(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    {/* OWNER NAME */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Owner Name *
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter owner name"
                                            value={ownerName}
                                            onChange={(e) =>
                                                setOwnerName(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    {/* EMAIL */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Email Address *
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter email address"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    {/* MOBILE */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Mobile Number *
                                        </label>

                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Enter 10 digit mobile number"
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
                                        />

                                    </div>

                                    {/* PASSWORD */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Password *
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Create password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <small className="text-muted">
                                            Minimum 6 characters
                                        </small>

                                    </div>

                                    {/* =================================
                                        BUSINESS INFORMATION
                                    ================================= */}

                                    <h5 className="text-success fw-bold mb-3">
                                        Business Information
                                    </h5>

                                    {/* BUSINESS NAME */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Business Name *
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter business name"
                                            value={businessName}
                                            onChange={(e) =>
                                                setBusinessName(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    {/* FARM NAME */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Farm Name *
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter farm name"
                                            value={farmName}
                                            onChange={(e) =>
                                                setFarmName(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    {/* =================================
                                        KYC INFORMATION
                                    ================================= */}

                                    <h5 className="text-success fw-bold mb-3">
                                        KYC Information
                                    </h5>

                                    {/* AADHAAR */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Aadhaar Number *
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter 12 digit Aadhaar number"
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
                                        />

                                    </div>

                                    {/* PAN */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            PAN Number *
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="ABCDE1234F"
                                            value={panNumber}
                                            onChange={(e) =>
                                                setPanNumber(
                                                    e.target.value
                                                        .toUpperCase()
                                                )
                                            }
                                            maxLength={10}
                                        />

                                    </div>

                                    {/* =================================
                                        ADDRESS INFORMATION
                                    ================================= */}

                                    <h5 className="text-success fw-bold mb-3">
                                        Address Information
                                    </h5>

                                    {/* ADDRESS */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Address *
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            placeholder="Enter complete address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(
                                                    e.target.value
                                                )
                                            }
                                        ></textarea>

                                    </div>

                                    <div className="row">

                                        {/* CITY */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                City *
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter city"
                                                value={city}
                                                onChange={(e) =>
                                                    setCity(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                        {/* STATE */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                State *
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter state"
                                                value={state}
                                                onChange={(e) =>
                                                    setState(
                                                        e.target.value
                                                    )
                                                }
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
                                            className="form-control"
                                            placeholder="Enter 6 digit pincode"
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
                                        />

                                    </div>

                                    {/* =================================
                                        LOCATION
                                    ================================= */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            📍 Seller Location *
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Example: Beed, Maharashtra"
                                            value={location}
                                            onChange={(e) =>
                                                setLocation(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <small className="text-muted">
                                            Enter your farm/business location.
                                        </small>

                                    </div>

                                    {/* =================================
                                        PROFILE INFORMATION
                                    ================================= */}

                                    <h5 className="text-success fw-bold mb-3">
                                        Profile Information
                                    </h5>

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Profile Image URL
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter profile image URL"
                                            value={profileImage}
                                            onChange={(e) =>
                                                setProfileImage(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <small className="text-muted">
                                            Optional
                                        </small>

                                    </div>

                                    {/* =================================
                                        REGISTER BUTTON
                                    ================================= */}

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

                                                Creating Account...
                                            </>

                                        ) : (

                                            <>
                                                Create Seller Account

                                                <span className="ms-2">
                                                    →
                                                </span>
                                            </>

                                        )}

                                    </button>

                                </form>

                                {/* =================================
                                    LOGIN
                                ================================= */}

                                <div className="d-flex align-items-center my-4">

                                    <div className="flex-grow-1 border-top"></div>

                                    <span className="px-3 text-muted small">
                                        OR
                                    </span>

                                    <div className="flex-grow-1 border-top"></div>

                                </div>

                                <div className="text-center">

                                    <p className="text-muted mb-2">
                                        Already have a seller account?
                                    </p>

                                    <Link
                                        to="/seller/login"
                                        className="btn btn-outline-success w-100 fw-semibold py-2"
                                        style={{
                                            borderRadius: "10px"
                                        }}
                                    >
                                        Login to Seller Account
                                    </Link>

                                </div>

                                {/* =================================
                                    HOME
                                ================================= */}

                                <div className="text-center mt-4">

                                    <Link
                                        to="/"
                                        className="text-decoration-none text-muted small"
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

export default SellerRegister;