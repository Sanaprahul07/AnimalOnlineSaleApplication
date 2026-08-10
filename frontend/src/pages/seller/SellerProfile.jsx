import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SellerProfile() {

    const [seller, setSeller] = useState(null);


    // =====================================
    // LOAD SELLER INFORMATION
    // =====================================

    useEffect(() => {

        const sellerEmail =
            localStorage.getItem("sellerEmail");

        const sellerLoggedIn =
            localStorage.getItem("sellerLoggedIn");


        if (
            sellerLoggedIn === "true" &&
            sellerEmail
        ) {

            setSeller({

                sellerName: "Seller",

                email: sellerEmail,

                mobile: "Not Available",

                status: "Active"

            });

        }

    }, []);


    return (

        <div className="container-fluid">

            {/* =====================================
                PAGE HEADER
            ===================================== */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        My Profile
                    </h2>

                    <p className="text-muted mb-0">
                        Manage your seller account information
                    </p>

                </div>


                <Link
                    to="/seller/dashboard"
                    className="btn btn-outline-success"
                >
                    ← Dashboard
                </Link>

            </div>


            {/* =====================================
                PROFILE SECTION
            ===================================== */}

            <div className="row">


                {/* =================================
                    PROFILE CARD
                ================================= */}

                <div className="col-lg-4 mb-4">

                    <div
                        className="card border-0 shadow-sm text-center h-100"
                        style={{
                            borderRadius: "16px"
                        }}
                    >

                        <div className="card-body p-4">


                            {/* Profile Image */}

                            <div
                                className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                                style={{
                                    width: "110px",
                                    height: "110px",
                                    background:
                                        "linear-gradient(135deg, #087f5b, #20a66a)",
                                    color: "white",
                                    fontSize: "45px"
                                }}
                            >
                                👨‍🌾
                            </div>


                            {/* Seller Name */}

                            <h4 className="fw-bold mt-3 mb-1">

                                {seller?.sellerName ||
                                    "Seller"}

                            </h4>


                            {/* Seller Role */}

                            <p className="text-muted mb-3">
                                Animal Seller
                            </p>


                            {/* Status */}

                            <span className="badge bg-success px-3 py-2">

                                ● Active Seller

                            </span>


                            <hr className="my-4" />


                            {/* Seller Information */}

                            <div className="text-start">

                                <div className="mb-3">

                                    <small className="text-muted d-block">
                                        Seller ID
                                    </small>

                                    <strong>
                                        SELLER-001
                                    </strong>

                                </div>


                                <div className="mb-3">

                                    <small className="text-muted d-block">
                                        Account Status
                                    </small>

                                    <strong className="text-success">
                                        Active
                                    </strong>

                                </div>


                                <div>

                                    <small className="text-muted d-block">
                                        Member Since
                                    </small>

                                    <strong>
                                        2026
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================
                    PROFILE DETAILS
                ================================= */}

                <div className="col-lg-8">

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "16px"
                        }}
                    >

                        {/* Card Header */}

                        <div
                            className="card-header text-white border-0 p-3"
                            style={{
                                background:
                                    "linear-gradient(135deg, #087f5b, #20a66a)",
                                borderRadius:
                                    "16px 16px 0 0"
                            }}
                        >

                            <h5 className="mb-0 fw-bold">
                                Seller Information
                            </h5>

                        </div>


                        {/* Card Body */}

                        <div className="card-body p-4">


                            {/* =================================
                                SELLER NAME
                            ================================= */}

                            <div className="row mb-4">

                                <div className="col-md-6">

                                    <label className="form-label text-muted">
                                        Seller Name
                                    </label>

                                    <div className="form-control bg-light">
                                        {seller?.sellerName ||
                                            "Seller"}
                                    </div>

                                </div>


                                {/* EMAIL */}

                                <div className="col-md-6">

                                    <label className="form-label text-muted">
                                        Email Address
                                    </label>

                                    <div className="form-control bg-light">

                                        {seller?.email ||
                                            "Not Available"}

                                    </div>

                                </div>

                            </div>


                            {/* =================================
                                MOBILE + STATUS
                            ================================= */}

                            <div className="row mb-4">

                                <div className="col-md-6">

                                    <label className="form-label text-muted">
                                        Mobile Number
                                    </label>

                                    <div className="form-control bg-light">

                                        {seller?.mobile ||
                                            "Not Available"}

                                    </div>

                                </div>


                                <div className="col-md-6">

                                    <label className="form-label text-muted">
                                        Account Status
                                    </label>

                                    <div className="form-control bg-light text-success fw-semibold">

                                        ● Active

                                    </div>

                                </div>

                            </div>


                            {/* =================================
                                LOCATION
                            ================================= */}

                            <div className="mb-4">

                                <label className="form-label text-muted">
                                    Location
                                </label>

                                <div className="form-control bg-light">

                                    📍 Maharashtra, India

                                </div>

                            </div>


                            {/* =================================
                                ACTION BUTTONS
                            ================================= */}

                            <div className="d-flex gap-2 flex-wrap">

                                <button
                                    className="btn btn-success px-4"
                                    disabled
                                >
                                    ✏️ Edit Profile
                                </button>


                                <Link
                                    to="/seller/animals"
                                    className="btn btn-outline-success px-4"
                                >
                                    🐄 My Animals
                                </Link>

                            </div>


                            {/* Future Feature */}

                            <div className="alert alert-info mt-4 mb-0">

                                <strong>
                                    Coming Next:
                                </strong>

                                <span className="ms-2">
                                    Profile editing will be connected
                                    with the Seller Update API.
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================
                ACCOUNT INFORMATION
            ===================================== */}

            <div className="row mt-4">

                <div className="col-12">

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "16px"
                        }}
                    >

                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-3">
                                Seller Account
                            </h5>


                            <div className="row">

                                <div className="col-md-4 mb-3">

                                    <div className="p-3 bg-light rounded">

                                        <small className="text-muted d-block">
                                            Total Animals
                                        </small>

                                        <h4 className="fw-bold text-success mb-0">
                                            0
                                        </h4>

                                    </div>

                                </div>


                                <div className="col-md-4 mb-3">

                                    <div className="p-3 bg-light rounded">

                                        <small className="text-muted d-block">
                                            Available Animals
                                        </small>

                                        <h4 className="fw-bold text-primary mb-0">
                                            0
                                        </h4>

                                    </div>

                                </div>


                                <div className="col-md-4 mb-3">

                                    <div className="p-3 bg-light rounded">

                                        <small className="text-muted d-block">
                                            Orders
                                        </small>

                                        <h4 className="fw-bold text-warning mb-0">
                                            0
                                        </h4>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default SellerProfile;