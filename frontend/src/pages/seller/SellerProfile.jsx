import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUserCircle,
    FaEdit,
    FaSave,
    FaTimes,
    FaLock,
    FaMapMarkerAlt,
    FaStore,
    FaIdCard,
    FaCheckCircle,
    FaClock,
    FaShieldAlt
} from "react-icons/fa";

import {
    getSellerById,
    updateSeller
} from "../../services/SellerService";


function SellerProfile() {

    const navigate = useNavigate();

    // =====================================================
    // SELLER ID
    // =====================================================

    const sellerId = localStorage.getItem("sellerId");


    // =====================================================
    // STATES
    // =====================================================

    const [seller, setSeller] = useState(null);

    const [formData, setFormData] = useState({
        sellerName: "",
        businessName: "",
        ownerName: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        location: "",
        farmName: "",
        aadhaarNumber: "",
        panNumber: "",
        profileImage: ""
    });

    const [editMode, setEditMode] = useState(false);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    // =====================================================
    // LOAD SELLER PROFILE
    // =====================================================

    const loadSellerProfile = async () => {

        try {

            setLoading(true);
            setError("");

            if (!sellerId) {

                setError(
                    "Seller ID not found. Please login again."
                );

                return;
            }


            console.log(
                "Logged Seller ID:",
                sellerId
            );


            const response =
                await getSellerById(sellerId);


            console.log(
                "Seller Profile:",
                response.data
            );


            const data = response.data;


            // =====================================================
            // SAVE SELLER
            // =====================================================

            setSeller(data);


            // =====================================================
            // SET FORM DATA
            // =====================================================

            setFormData({

                sellerName:
                    data.sellerName || "",

                businessName:
                    data.businessName || "",

                ownerName:
                    data.ownerName || "",

                email:
                    data.email || "",

                mobile:
                    data.mobile || "",

                address:
                    data.address || "",

                city:
                    data.city || "",

                state:
                    data.state || "",

                pincode:
                    data.pincode || "",

                location:
                    data.location || "",

                farmName:
                    data.farmName || "",

                aadhaarNumber:
                    data.aadhaarNumber || "",

                panNumber:
                    data.panNumber || "",

                profileImage:
                    data.profileImage || ""

            });


        } catch (err) {

            console.error(
                "Seller Profile Error:",
                err
            );


            if (
                err.response &&
                err.response.data
            ) {

                setError(
                    err.response.data.message ||
                    "Unable to load seller profile."
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
    // LOAD PROFILE WHEN PAGE OPENS
    // =====================================================

    useEffect(() => {

        loadSellerProfile();

    }, [sellerId]);


    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((previousData) => ({

            ...previousData,

            [name]: value

        }));

    };


    // =====================================================
    // EDIT PROFILE
    // =====================================================

    const handleEdit = () => {

        setEditMode(true);

        setMessage("");

        setError("");

    };


    // =====================================================
    // CANCEL EDIT
    // =====================================================

    const handleCancel = () => {

        setEditMode(false);

        setMessage("");

        setError("");

        loadSellerProfile();

    };


    // =====================================================
    // MASK AADHAAR
    // =====================================================

    const getMaskedAadhaar = (aadhaar) => {

        if (!aadhaar) {
            return "Not Available";
        }


        const cleanAadhaar =
            aadhaar.replace(/\s/g, "");


        if (cleanAadhaar.length <= 4) {

            return cleanAadhaar;

        }


        const lastFour =
            cleanAadhaar.slice(-4);


        return `XXXX XXXX ${lastFour}`;

    };


    // =====================================================
    // MASK PAN
    // =====================================================

    const getMaskedPan = (pan) => {

        if (!pan) {
            return "Not Available";
        }


        if (pan.length <= 4) {
            return pan;
        }


        return `******${pan.slice(-4)}`;

    };


    // =====================================================
    // UPDATE PROFILE
    // =====================================================

    const handleUpdate = async (e) => {

        e.preventDefault();


        if (!sellerId) {

            setError(
                "Seller ID not found. Please login again."
            );

            return;
        }


        // =====================================================
        // VALIDATION
        // =====================================================

        if (!formData.sellerName.trim()) {

            setError(
                "Seller Name is required."
            );

            return;
        }


        if (!formData.mobile.trim()) {

            setError(
                "Mobile Number is required."
            );

            return;
        }


        setSaving(true);

        setError("");

        setMessage("");


        try {

            // =====================================================
            // IMPORTANT
            //
            // EMAIL NOT SENT
            // AADHAAR NOT SENT
            // PAN NOT SENT
            // PASSWORD NOT SENT
            //
            // These fields cannot be changed from profile.
            // =====================================================

            const updateData = {

                sellerName:
                    formData.sellerName,

                businessName:
                    formData.businessName,

                ownerName:
                    formData.ownerName,

                mobile:
                    formData.mobile,

                address:
                    formData.address,

                city:
                    formData.city,

                state:
                    formData.state,

                pincode:
                    formData.pincode,

                location:
                    formData.location,

                farmName:
                    formData.farmName,

                profileImage:
                    formData.profileImage

            };


            console.log(
                "Seller Profile Update Data:",
                updateData
            );


            // =====================================================
            // UPDATE API
            // =====================================================

            const response =
                await updateSeller(
                    sellerId,
                    updateData
                );


            console.log(
                "Seller Updated:",
                response.data
            );


            // =====================================================
            // UPDATE SELLER STATE
            // =====================================================

            setSeller(
                response.data
            );


            // =====================================================
            // UPDATE FORM
            // =====================================================

            const updatedData =
                response.data;


            setFormData({

                sellerName:
                    updatedData.sellerName || "",

                businessName:
                    updatedData.businessName || "",

                ownerName:
                    updatedData.ownerName || "",

                email:
                    updatedData.email || "",

                mobile:
                    updatedData.mobile || "",

                address:
                    updatedData.address || "",

                city:
                    updatedData.city || "",

                state:
                    updatedData.state || "",

                pincode:
                    updatedData.pincode || "",

                location:
                    updatedData.location || "",

                farmName:
                    updatedData.farmName || "",

                aadhaarNumber:
                    updatedData.aadhaarNumber || "",

                panNumber:
                    updatedData.panNumber || "",

                profileImage:
                    updatedData.profileImage || ""

            });


            // =====================================================
            // EXIT EDIT MODE
            // =====================================================

            setEditMode(false);


            setMessage(
                "Seller profile updated successfully!"
            );


        } catch (err) {

            console.error(
                "Seller Update Error:",
                err
            );


            if (
                err.response &&
                err.response.data
            ) {

                setError(
                    err.response.data.message ||
                    "Unable to update seller profile."
                );

            } else {

                setError(
                    "Unable to connect to server."
                );

            }

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loading) {

        return (

            <div
                style={{
                    height: "calc(100vh - 65px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f5f7f9"
                }}
            >

                <div className="text-center">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    />

                    <p className="mt-3 text-muted">
                        Loading Seller Profile...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR SCREEN
    // =====================================================

    if (error && !seller) {

        return (

            <div className="container-fluid p-5">

                <div className="alert alert-danger">
                    {error}
                </div>


                <button
                    className="btn btn-success"
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    Login Again
                </button>

            </div>

        );

    }


    // =====================================================
    // MAIN PROFILE DASHBOARD
    // =====================================================

    return (

        <div
            style={{
                height: "calc(100vh - 65px)",
                overflowY: "auto",
                overflowX: "hidden",
                background: "#f4f7f6",
                padding: "28px"
            }}
        >


            {/* =================================================
                PROFILE HEADER
            ================================================= */}

            <div
                className="card border-0 shadow-sm mb-4"
                style={{
                    borderRadius: "18px",
                    overflow: "hidden"
                }}
            >

                {/* TOP GREEN AREA */}

                <div
                    style={{
                        height: "125px",
                        background:
                            "linear-gradient(135deg, #087f5b, #20c997)"
                    }}
                />


                {/* PROFILE HEADER BODY */}

                <div
                    style={{
                        padding: "0 30px 25px 30px",
                        position: "relative"
                    }}
                >

                    {/* =================================================
                        PROFILE IMAGE
                        ONLY ONE TIME
                    ================================================= */}

                    <div
                        style={{
                            position: "absolute",
                            top: "-65px",
                            left: "30px"
                        }}
                    >

                        {formData.profileImage ? (

                            <img
                                src={formData.profileImage}
                                alt="Seller"
                                style={{
                                    width: "130px",
                                    height: "130px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "6px solid white",
                                    boxShadow:
                                        "0 5px 20px rgba(0,0,0,0.18)"
                                }}
                                onError={(e) => {

                                    e.currentTarget.style.display =
                                        "none";

                                    e.currentTarget.nextSibling.style.display =
                                        "flex";

                                }}
                            />

                        ) : (

                            <div
                                style={{
                                    width: "130px",
                                    height: "130px",
                                    borderRadius: "50%",
                                    border: "6px solid white",
                                    background: "#e9ecef",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow:
                                        "0 5px 20px rgba(0,0,0,0.18)"
                                }}
                            >

                                <FaUserCircle
                                    size={75}
                                    color="#adb5bd"
                                />

                            </div>

                        )}

                        {/* FALLBACK IMAGE */}

                        <div
                            style={{
                                width: "130px",
                                height: "130px",
                                borderRadius: "50%",
                                border: "6px solid white",
                                background: "#e9ecef",
                                display: "none",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow:
                                    "0 5px 20px rgba(0,0,0,0.18)"
                            }}
                        >

                            <FaUserCircle
                                size={75}
                                color="#adb5bd"
                            />

                        </div>

                    </div>


                    {/* HEADER INFORMATION */}

                    <div
                        className="d-flex justify-content-between align-items-end"
                        style={{
                            paddingTop: "78px"
                        }}
                    >

                        <div>

                            <h2
                                className="fw-bold mb-1"
                                style={{
                                    color: "#212529"
                                }}
                            >

                                {seller?.sellerName ||
                                    "Seller"}

                            </h2>


                            <p
                                className="text-muted mb-2"
                            >

                                <FaStore
                                    className="me-2"
                                />

                                {seller?.businessName ||
                                    "Seller Business"}

                            </p>


                            <span
                                className="badge rounded-pill"
                                style={{
                                    background:
                                        seller?.status === "active"
                                            ? "#d1e7dd"
                                            : "#fff3cd",
                                    color:
                                        seller?.status === "active"
                                            ? "#0f5132"
                                            : "#664d03",
                                    padding:
                                        "8px 14px"
                                }}
                            >

                                {seller?.status ||
                                    "Pending"}

                            </span>

                        </div>


                        {/* EDIT BUTTON */}

                        {!editMode && (

                            <button
                                type="button"
                                className="btn btn-success px-4"
                                onClick={handleEdit}
                                style={{
                                    borderRadius: "10px"
                                }}
                            >

                                <FaEdit
                                    className="me-2"
                                />

                                Edit Profile

                            </button>

                        )}

                    </div>


                    {/* PROFILE IMAGE CHANGE */}

                    {editMode && (

                        <div
                            className="mt-4 p-3"
                            style={{
                                background: "#f8f9fa",
                                borderRadius: "12px"
                            }}
                        >

                            <label
                                className="form-label fw-semibold"
                            >

                                Change Profile Photo

                            </label>


                            <input
                                type="text"
                                name="profileImage"
                                className="form-control"
                                placeholder="Enter profile image URL"
                                value={
                                    formData.profileImage
                                }
                                onChange={
                                    handleChange
                                }
                            />


                            <small className="text-muted">

                                Profile photo is stored using
                                the image URL.

                            </small>

                        </div>

                    )}

                </div>

            </div>


            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {message && (

                <div
                    className="alert alert-success border-0 shadow-sm"
                    style={{
                        borderRadius: "10px"
                    }}
                >

                    <FaCheckCircle
                        className="me-2"
                    />

                    {message}

                </div>

            )}


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

                <div
                    className="alert alert-danger border-0 shadow-sm"
                    style={{
                        borderRadius: "10px"
                    }}
                >

                    {error}

                </div>

            )}


            {/* =================================================
                STATUS CARDS
            ================================================= */}

            <div className="row g-3 mb-4">


                {/* ACCOUNT STATUS */}

                <div className="col-md-4">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "14px"
                        }}
                    >

                        <div className="card-body">

                            <div
                                className="d-flex align-items-center"
                            >

                                <div
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "12px",
                                        background: "#d1e7dd",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >

                                    <FaShieldAlt
                                        color="#198754"
                                    />

                                </div>


                                <div className="ms-3">

                                    <small
                                        className="text-muted"
                                    >
                                        Account Status
                                    </small>

                                    <h6
                                        className="fw-bold mb-0"
                                    >
                                        {seller?.status ||
                                            "N/A"}
                                    </h6>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* KYC STATUS */}

                <div className="col-md-4">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "14px"
                        }}
                    >

                        <div className="card-body">

                            <div
                                className="d-flex align-items-center"
                            >

                                <div
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "12px",
                                        background: "#cff4fc",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >

                                    <FaIdCard
                                        color="#0dcaf0"
                                    />

                                </div>


                                <div className="ms-3">

                                    <small
                                        className="text-muted"
                                    >
                                        KYC Status
                                    </small>

                                    <h6
                                        className="fw-bold mb-0"
                                    >
                                        {seller?.kycStatus ||
                                            "N/A"}
                                    </h6>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* APPROVAL STATUS */}

                <div className="col-md-4">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "14px"
                        }}
                    >

                        <div className="card-body">

                            <div
                                className="d-flex align-items-center"
                            >

                                <div
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "12px",
                                        background: "#fff3cd",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >

                                    <FaClock
                                        color="#ffc107"
                                    />

                                </div>


                                <div className="ms-3">

                                    <small
                                        className="text-muted"
                                    >
                                        Approval Status
                                    </small>

                                    <h6
                                        className="fw-bold mb-0"
                                    >
                                        {seller?.approvalStatus ||
                                            "N/A"}
                                    </h6>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                MAIN PROFILE CARD
            ================================================= */}

            <div
                className="card border-0 shadow-sm"
                style={{
                    borderRadius: "18px"
                }}
            >

                <div className="card-body p-4">

                    <form
                        onSubmit={handleUpdate}
                    >


                        {/* =================================================
                            PERSONAL INFORMATION
                        ================================================= */}

                        <div className="section-title">

                            <h5 className="fw-bold mb-1">

                                Personal Information

                            </h5>

                            <p className="text-muted small">

                                Basic seller account information

                            </p>

                        </div>


                        <div className="row g-4">


                            {/* SELLER NAME */}

                            <div className="col-md-6">

                                <label
                                    className="form-label fw-semibold"
                                >
                                    Seller Name
                                </label>


                                <input
                                    type="text"
                                    name="sellerName"
                                    className="form-control"
                                    value={
                                        formData.sellerName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={!editMode}
                                />

                            </div>


                            {/* OWNER NAME */}

                            <div className="col-md-6">

                                <label
                                    className="form-label fw-semibold"
                                >
                                    Owner Name
                                </label>


                                <input
                                    type="text"
                                    name="ownerName"
                                    className="form-control"
                                    value={
                                        formData.ownerName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={!editMode}
                                />

                            </div>


                            {/* EMAIL LOCKED */}

                            <div className="col-md-6">

                                <label
                                    className="form-label fw-semibold"
                                >

                                    Email

                                    <FaLock
                                        size={11}
                                        className="ms-2 text-muted"
                                    />

                                </label>


                                <input
                                    type="email"
                                    className="form-control bg-light"
                                    value={
                                        formData.email
                                    }
                                    disabled
                                />


                                <small
                                    className="text-muted"
                                >
                                    Email cannot be changed.
                                </small>

                            </div>


                            {/* MOBILE */}

                            <div className="col-md-6">

                                <label
                                    className="form-label fw-semibold"
                                >
                                    Mobile Number
                                </label>


                                <input
                                    type="text"
                                    name="mobile"
                                    className="form-control"
                                    value={
                                        formData.mobile
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={!editMode}
                                />

                            </div>

                        </div>


                        <hr className="my-5" />


                        {/* =================================================
                            BUSINESS INFORMATION
                        ================================================= */}

                        <div className="section-title">

                            <h5 className="fw-bold mb-1">

                                Business Information

                            </h5>

                            <p className="text-muted small">

                                Seller farm and business details

                            </p>

                        </div>


                        <div className="row g-4">


                            {/* BUSINESS NAME */}

                            <div className="col-md-6">

                                <label
                                    className="form-label fw-semibold"
                                >
                                    Business Name
                                </label>


                                <input
                                    type="text"
                                    name="businessName"
                                    className="form-control"
                                    value={
                                        formData.businessName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={!editMode}
                                />

                            </div>


                            {/* FARM NAME */}

                            <div className="col-md-6">

                                <label
                                    className="form-label fw-semibold"
                                >
                                    Farm Name
                                </label>


                                <input
                                    type="text"
                                    name="farmName"
                                    className="form-control"
                                    value={
                                        formData.farmName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={!editMode}
                                />

                            </div>

                        </div>


                        <hr className="my-5" />


                        {/* =================================================
                            ADDRESS INFORMATION
                        ================================================= */}

                        <div className="section-title">

                            <h5 className="fw-bold mb-1">

                                Address Information

                            </h5>

                            <p className="text-muted small">

                                Seller business and farm location

                            </p>

                        </div>


                        <div className="row g-4">


                            {/* ADDRESS */}

                            <div className="col-12">

                                <label
                                    className="form-label fw-semibold"
                                >
                                    Address
                                </label>


                                <textarea
                                    name="address"
                                    className="form-control"
                                    rows="3"
                                    value={
                                        formData.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={!editMode}
                                />

                            </div>


                            {/* CITY */}

                            <div className="col-md-4">

                                <label
                                    className="form-label fw-semibold"
                                >
                                    City
                                </label>


                                <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    value={
                                        formData.city
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={!editMode}
                                />

                            </div>


                            {/* STATE */}

                            <div className="col-md-4">

                                <label
                                    className="form-label fw-semibold"
                                >
                                    State
                                </label>


                                <input
                                    type="text"
                                    name="state"
                                    className="form-control"
                                    value={
                                        formData.state
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={!editMode}
                                />

                            </div>


                            {/* PINCODE */}

                            <div className="col-md-4">

                                <label
                                    className="form-label fw-semibold"
                                >
                                    Pincode
                                </label>


                                <input
                                    type="text"
                                    name="pincode"
                                    className="form-control"
                                    value={
                                        formData.pincode
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={!editMode}
                                />

                            </div>


                            {/* LOCATION */}

                            <div className="col-12">

                                <label
                                    className="form-label fw-semibold"
                                >

                                    <FaMapMarkerAlt
                                        className="me-2 text-success"
                                    />

                                    Location

                                </label>


                                <input
                                    type="text"
                                    name="location"
                                    className="form-control"
                                    value={
                                        formData.location
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={!editMode}
                                />

                            </div>

                        </div>


                        <hr className="my-5" />


                        {/* =================================================
                            KYC INFORMATION
                        ================================================= */}

                        <div className="section-title">

                            <h5 className="fw-bold mb-1">

                                KYC & Government Information

                            </h5>

                            <p className="text-muted small">

                                Government identity information
                                is protected and cannot be edited.

                            </p>

                        </div>


                        <div className="row g-4">


                            {/* AADHAAR LOCKED */}

                            <div className="col-md-6">

                                <label
                                    className="form-label fw-semibold"
                                >

                                    Aadhaar Number

                                    <FaLock
                                        size={11}
                                        className="ms-2 text-muted"
                                    />

                                </label>


                                <input
                                    type="text"
                                    className="form-control bg-light"
                                    value={
                                        getMaskedAadhaar(
                                            formData.aadhaarNumber
                                        )
                                    }
                                    disabled
                                />


                                <small
                                    className="text-muted"
                                >

                                    Only the last 4 digits are
                                    displayed for security.

                                </small>

                            </div>


                            {/* PAN LOCKED */}

                            <div className="col-md-6">

                                <label
                                    className="form-label fw-semibold"
                                >

                                    PAN Number

                                    <FaLock
                                        size={11}
                                        className="ms-2 text-muted"
                                    />

                                </label>


                                <input
                                    type="text"
                                    className="form-control bg-light"
                                    value={
                                        getMaskedPan(
                                            formData.panNumber
                                        )
                                    }
                                    disabled
                                />


                                <small
                                    className="text-muted"
                                >

                                    PAN cannot be changed
                                    from seller profile.

                                </small>

                            </div>

                        </div>


                        {/* =================================================
                            ACTION BUTTONS
                        ================================================= */}

                        {editMode && (

                            <>

                                <hr className="my-5" />


                                <div
                                    className="d-flex justify-content-end gap-3"
                                >

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4"
                                        onClick={
                                            handleCancel
                                        }
                                        disabled={saving}
                                        style={{
                                            borderRadius: "10px"
                                        }}
                                    >

                                        <FaTimes
                                            className="me-2"
                                        />

                                        Cancel

                                    </button>


                                    <button
                                        type="submit"
                                        className="btn btn-success px-4"
                                        disabled={saving}
                                        style={{
                                            borderRadius: "10px"
                                        }}
                                    >

                                        <FaSave
                                            className="me-2"
                                        />

                                        {saving
                                            ? "Saving..."
                                            : "Save Changes"
                                        }

                                    </button>

                                </div>

                            </>

                        )}

                    </form>

                </div>

            </div>


            {/* =================================================
                BOTTOM SPACE
            ================================================= */}

            <div
                style={{
                    height: "30px"
                }}
            />

        </div>

    );

}


export default SellerProfile;