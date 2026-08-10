import { useEffect, useState } from "react";
import { getAnimalsBySeller } from "../../services/AnimalService";

function SellerDashboard() {

    // =====================================
    // DASHBOARD STATES
    // =====================================

    const [totalAnimals, setTotalAnimals] = useState(0);
    const [availableAnimals, setAvailableAnimals] = useState(0);

    // Orders APIs अजून तयार नसल्यामुळे
    // सध्या 0 ठेवत आहोत.
    const [orders, setOrders] = useState(0);
    const [cancelledOrders, setCancelledOrders] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================
    // LOAD DASHBOARD DATA
    // =====================================

    function loadDashboardData() {

        // -------------------------------------
        // Current logged-in seller
        // -------------------------------------
        // Development / testing मध्ये sellerId = 9
        const sellerId = 9;

        setLoading(true);
        setError("");

        // -------------------------------------
        // Get Seller Animals
        // -------------------------------------

        getAnimalsBySeller(sellerId)

            .then((response) => {

                console.log(
                    "Dashboard Seller Animals:",
                    response.data
                );

                const animals = response.data || [];


                // -------------------------------------
                // TOTAL ANIMALS
                // -------------------------------------

                setTotalAnimals(animals.length);


                // -------------------------------------
                // AVAILABLE ANIMALS
                // -------------------------------------

                const availableCount = animals.filter(
                    (animal) => animal.available === true
                ).length;

                setAvailableAnimals(availableCount);


                // -------------------------------------
                // Orders
                // -------------------------------------
                // Order API अजून तयार नाही
                setOrders(0);

                setCancelledOrders(0);

            })

            .catch((error) => {

                console.error(
                    "Error loading dashboard data:",
                    error
                );

                setError(
                    "Unable to load dashboard data."
                );

                setTotalAnimals(0);
                setAvailableAnimals(0);

            })

            .finally(() => {

                setLoading(false);

            });
    }


    // =====================================
    // PAGE LOAD
    // =====================================

    useEffect(() => {

        loadDashboardData();

    }, []);


    // =====================================
    // UI
    // =====================================

    return (

        <div className="container-fluid p-4">

            {/* =========================
                    PAGE HEADER
            ========================= */}

            <div className="mb-4">

                <h2 className="fw-bold text-success">
                    Seller Dashboard
                </h2>

                <p className="text-muted">
                    Welcome to Animal Online Sale Seller Panel.
                </p>

            </div>


            {/* =========================
                    ERROR MESSAGE
            ========================= */}

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            {/* =========================
                    LOADING
            ========================= */}

            {loading && (

                <div className="text-center mb-4">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    >
                    </div>

                    <p className="mt-2">
                        Loading dashboard...
                    </p>

                </div>

            )}


            {/* =========================
                    DASHBOARD CARDS
            ========================= */}

            <div className="row g-4">


                {/* =========================
                        TOTAL ANIMALS
                ========================= */}

                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">

                    <div
                        className="card border-0 shadow-lg h-100"
                        style={{
                            borderRadius: "15px",
                            overflow: "hidden"
                        }}
                    >

                        <div
                            className="card-header text-white border-0"
                            style={{
                                background:
                                    "linear-gradient(135deg, #198754, #20c997)",
                                padding: "20px"
                            }}
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <h5 className="mb-0 fw-bold">
                                    Total Animals
                                </h5>

                                <span
                                    style={{
                                        fontSize: "35px"
                                    }}
                                >
                                    🐄
                                </span>

                            </div>

                        </div>


                        <div className="card-body p-4">

                            <h1 className="fw-bold text-success">

                                {loading ? "..." : totalAnimals}

                            </h1>

                            <p className="text-muted mb-0">

                                Total animals listed by you

                            </p>

                        </div>

                    </div>

                </div>


                {/* =========================
                        AVAILABLE ANIMALS
                ========================= */}

                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">

                    <div
                        className="card border-0 shadow-lg h-100"
                        style={{
                            borderRadius: "15px",
                            overflow: "hidden"
                        }}
                    >

                        <div
                            className="card-header text-white border-0"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0d6efd, #0dcaf0)",
                                padding: "20px"
                            }}
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <h5 className="mb-0 fw-bold">
                                    Available Animals
                                </h5>

                                <span
                                    style={{
                                        fontSize: "35px"
                                    }}
                                >
                                    🐐
                                </span>

                            </div>

                        </div>


                        <div className="card-body p-4">

                            <h1 className="fw-bold text-primary">

                                {loading ? "..." : availableAnimals}

                            </h1>

                            <p className="text-muted mb-0">

                                Animals currently available

                            </p>

                        </div>

                    </div>

                </div>


                {/* =========================
                        ORDERS
                ========================= */}

                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">

                    <div
                        className="card border-0 shadow-lg h-100"
                        style={{
                            borderRadius: "15px",
                            overflow: "hidden"
                        }}
                    >

                        <div
                            className="card-header text-white border-0"
                            style={{
                                background:
                                    "linear-gradient(135deg, #fd7e14, #ffc107)",
                                padding: "20px"
                            }}
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <h5 className="mb-0 fw-bold">
                                    Orders
                                </h5>

                                <span
                                    style={{
                                        fontSize: "35px"
                                    }}
                                >
                                    🛒
                                </span>

                            </div>

                        </div>


                        <div className="card-body p-4">

                            <h1 className="fw-bold text-warning">

                                {orders}

                            </h1>

                            <p className="text-muted mb-0">

                                Total customer orders

                            </p>

                        </div>

                    </div>

                </div>


                {/* =========================
                        CANCELLED ORDERS
                ========================= */}

                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">

                    <div
                        className="card border-0 shadow-lg h-100"
                        style={{
                            borderRadius: "15px",
                            overflow: "hidden"
                        }}
                    >

                        <div
                            className="card-header text-white border-0"
                            style={{
                                background:
                                    "linear-gradient(135deg, #dc3545, #ff6b6b)",
                                padding: "20px"
                            }}
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <h5 className="mb-0 fw-bold">
                                    Cancelled Orders
                                </h5>

                                <span
                                    style={{
                                        fontSize: "35px"
                                    }}
                                >
                                    ❌
                                </span>

                            </div>

                        </div>


                        <div className="card-body p-4">

                            <h1 className="fw-bold text-danger">

                                {cancelledOrders}

                            </h1>

                            <p className="text-muted mb-0">

                                Total cancelled orders

                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                    QUICK ACTIONS
            ========================= */}

            <div className="mt-5">

                <h4 className="fw-bold mb-3">
                    Quick Actions
                </h4>


                <div className="row g-3">


                    {/* ADD ANIMAL */}

                    <div className="col-md-4">

                        <a
                            href="/seller/add-animal"
                            className="btn btn-success w-100 p-3 shadow-sm"
                        >

                            ➕ Add New Animal

                        </a>

                    </div>


                    {/* MY ANIMALS */}

                    <div className="col-md-4">

                        <a
                            href="/seller/animals"
                            className="btn btn-primary w-100 p-3 shadow-sm"
                        >

                            🐄 View My Animals

                        </a>

                    </div>


                    {/* PROFILE */}

                    <div className="col-md-4">

                        <a
                            href="/seller/profile"
                            className="btn btn-dark w-100 p-3 shadow-sm"
                        >

                            👤 Manage Profile

                        </a>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default SellerDashboard;