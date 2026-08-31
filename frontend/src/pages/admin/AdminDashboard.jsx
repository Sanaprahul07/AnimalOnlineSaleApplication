import { useNavigate } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";


function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f7f8fc"
            }}
        >
            {/* =====================================================
                ADMIN SIDEBAR
            ===================================================== */}
            <AdminSidebar />

            {/* =====================================================
                MAIN AREA
            ===================================================== */}
            <div
                style={{
                    marginLeft: "250px",
                    width: "calc(100% - 250px)",
                    minHeight: "100vh"
                }}
            >
                {/* =================================================
                    TOP HEADER
                ================================================= */}
                <div
                    className="bg-white border-bottom d-flex justify-content-between align-items-center px-4 py-3"
                    style={{
                        minHeight: "70px"
                    }}
                >
                    <div className="d-flex align-items-center gap-3">
                        <button
                            type="button"
                            className="btn btn-light"
                        >
                            ☰
                        </button>

                        <div>
                            <div className="fw-bold fs-5">
                                Welcome, Admin 👋
                            </div>

                            <small className="text-muted">
                                Manage your AnimalSale platform
                            </small>
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <button
                            type="button"
                            className="btn btn-light position-relative"
                            onClick={() =>
                                navigate("/admin/notifications")
                            }
                        >
                            🔔

                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            >
                                5
                            </span>
                        </button>

                        <div className="d-flex align-items-center gap-2">
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    width: "38px",
                                    height: "38px",
                                    backgroundColor: "#e8f5e9"
                                }}
                            >
                                👤
                            </div>

                            <div>
                                <div className="fw-semibold">
                                    Admin
                                </div>

                                <small className="text-muted">
                                    Administrator
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =================================================
                    PAGE CONTENT
                ================================================= */}
                <div className="p-4">
                    {/* =================================================
                        PAGE TITLE
                    ================================================= */}
                    <div className="mb-4">
                        <h2 className="fw-bold mb-1">
                            Admin Dashboard
                        </h2>

                        <p className="text-muted mb-0">
                            Overview of your AnimalSale platform.
                        </p>
                    </div>

                    {/* =================================================
                        SUMMARY CARDS
                    ================================================= */}
                    <div className="row g-3 mb-4">
                        {/* SELLERS */}
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "14px"
                                }}
                            >
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <small className="text-muted">
                                                Total Sellers
                                            </small>

                                            <h3 className="fw-bold mt-2 mb-1">
                                                128
                                            </h3>

                                            <small className="text-success">
                                                +12 this month
                                            </small>
                                        </div>

                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                backgroundColor: "#e8f1ff",
                                                fontSize: "22px"
                                            }}
                                        >
                                            👨‍🌾
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BUYERS */}
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "14px"
                                }}
                            >
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <small className="text-muted">
                                                Total Buyers
                                            </small>

                                            <h3 className="fw-bold mt-2 mb-1">
                                                356
                                            </h3>

                                            <small className="text-success">
                                                +25 this month
                                            </small>
                                        </div>

                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                backgroundColor: "#eaf8ee",
                                                fontSize: "22px"
                                            }}
                                        >
                                            👤
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ANIMALS */}
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "14px"
                                }}
                            >
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <small className="text-muted">
                                                Total Animals
                                            </small>

                                            <h3 className="fw-bold mt-2 mb-1">
                                                542
                                            </h3>

                                            <small className="text-success">
                                                +40 this month
                                            </small>
                                        </div>

                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                backgroundColor: "#f0eaff",
                                                fontSize: "22px"
                                            }}
                                        >
                                            🐄
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ORDERS */}
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "14px"
                                }}
                            >
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <small className="text-muted">
                                                Total Orders
                                            </small>

                                            <h3 className="fw-bold mt-2 mb-1">
                                                216
                                            </h3>

                                            <small className="text-success">
                                                +18 this month
                                            </small>
                                        </div>

                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                backgroundColor: "#fff4df",
                                                fontSize: "22px"
                                            }}
                                        >
                                            📦
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        REGISTRATION + QUICK ACTIONS
                    ================================================= */}
                    <div className="row g-4 mb-4">
                        {/* REGISTRATION OVERVIEW */}
                        <div className="col-xl-8">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "14px"
                                }}
                            >
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="fw-bold mb-0">
                                            Registration Overview
                                        </h5>

                                        <small className="text-muted">
                                            This month
                                        </small>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <div
                                                className="rounded p-4 text-center"
                                                style={{
                                                    backgroundColor: "#eef6ff"
                                                }}
                                            >
                                                <div className="fw-bold fs-2 text-primary">
                                                    128
                                                </div>

                                                <div className="text-muted">
                                                    Sellers
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div
                                                className="rounded p-4 text-center"
                                                style={{
                                                    backgroundColor: "#effaf1"
                                                }}
                                            >
                                                <div className="fw-bold fs-2 text-success">
                                                    356
                                                </div>

                                                <div className="text-muted">
                                                    Buyers
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div
                                                className="rounded p-4 text-center"
                                                style={{
                                                    backgroundColor: "#fff7e8"
                                                }}
                                            >
                                                <div className="fw-bold fs-2 text-warning">
                                                    58
                                                </div>

                                                <div className="text-muted">
                                                    Pending
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div
                                            className="progress"
                                            style={{
                                                height: "28px",
                                                borderRadius: "20px"
                                            }}
                                        >
                                            <div
                                                className="progress-bar bg-primary"
                                                style={{
                                                    width: "45%"
                                                }}
                                            >
                                                Sellers
                                            </div>

                                            <div
                                                className="progress-bar bg-success"
                                                style={{
                                                    width: "35%"
                                                }}
                                            >
                                                Buyers
                                            </div>

                                            <div
                                                className="progress-bar bg-warning"
                                                style={{
                                                    width: "20%"
                                                }}
                                            >
                                                Pending
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* QUICK ACTIONS */}
                        <div className="col-xl-4">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "14px"
                                }}
                            >
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4">
                                        Quick Actions
                                    </h5>

                                    <div className="d-grid gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() =>
                                                navigate("/admin/sellers")
                                            }
                                        >
                                            ✓ Approve Sellers
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() =>
                                                navigate("/admin/orders")
                                            }
                                        >
                                            📋 View All Orders
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={() =>
                                                navigate("/admin/categories")
                                            }
                                        >
                                            ➕ Add New Category
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-dark"
                                            onClick={() =>
                                                navigate(
                                                    "/admin/subscriptions"
                                                )
                                            }
                                        >
                                            ⚙ Manage Subscriptions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        RECENT REGISTRATIONS
                    ================================================= */}
                    <div className="row g-4 mb-4">
                        <div className="col-xl-6">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "14px"
                                }}
                            >
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-bold mb-0">
                                            Recent Registrations
                                        </h5>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-success"
                                            onClick={() =>
                                                navigate("/admin/sellers")
                                            }
                                        >
                                            View All
                                        </button>
                                    </div>

                                    <div className="list-group list-group-flush">
                                        <div className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>
                                                    Rahul Farms
                                                </strong>

                                                <div className="small text-muted">
                                                    Seller
                                                </div>

                                                <div className="small text-muted">
                                                    rahulf farms@gmail.com
                                                </div>
                                            </div>

                                            <span className="badge bg-warning">
                                                Pending
                                            </span>
                                        </div>

                                        <div className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>
                                                    Green Valley Farm
                                                </strong>

                                                <div className="small text-muted">
                                                    Seller
                                                </div>

                                                <div className="small text-muted">
                                                    greenvalley@gmail.com
                                                </div>
                                            </div>

                                            <span className="badge bg-success">
                                                Verified
                                            </span>
                                        </div>

                                        <div className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>
                                                    Paws & Claws
                                                </strong>

                                                <div className="small text-muted">
                                                    Seller
                                                </div>

                                                <div className="small text-muted">
                                                    pawsclaws@gmail.com
                                                </div>
                                            </div>

                                            <span className="badge bg-success">
                                                Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            RECENT ORDERS
                        ================================================= */}
                        <div className="col-xl-6">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "14px"
                                }}
                            >
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-bold mb-0">
                                            Recent Orders
                                        </h5>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-success"
                                            onClick={() =>
                                                navigate("/admin/orders")
                                            }
                                        >
                                            View All
                                        </button>
                                    </div>

                                    <div className="list-group list-group-flush">
                                        <div className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>
                                                    Order #101
                                                </strong>

                                                <div className="small text-muted">
                                                    Labrador Puppy
                                                </div>

                                                <div className="small text-muted">
                                                    ₹15,000
                                                </div>
                                            </div>

                                            <span className="badge bg-success">
                                                Paid
                                            </span>
                                        </div>

                                        <div className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>
                                                    Order #102
                                                </strong>

                                                <div className="small text-muted">
                                                    Persian Cat
                                                </div>

                                                <div className="small text-muted">
                                                    ₹20,000
                                                </div>
                                            </div>

                                            <span className="badge bg-primary">
                                                Confirmed
                                            </span>
                                        </div>

                                        <div className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>
                                                    Order #103
                                                </strong>

                                                <div className="small text-muted">
                                                    Golden Retriever
                                                </div>

                                                <div className="small text-muted">
                                                    ₹18,000
                                                </div>
                                            </div>

                                            <span className="badge bg-warning">
                                                Pending
                                            </span>
                                        </div>

                                        <div className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>
                                                    Order #104
                                                </strong>

                                                <div className="small text-muted">
                                                    Beagle Puppy
                                                </div>

                                                <div className="small text-muted">
                                                    ₹12,000
                                                </div>
                                            </div>

                                            <span className="badge bg-success">
                                                Paid
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        LOWER DASHBOARD CARDS
                    ================================================= */}
                    <div className="row g-4">
                        {/* SUBSCRIPTION OVERVIEW */}
                        <div className="col-xl-4 col-lg-6">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "14px"
                                }}
                            >
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4">
                                        Subscription Overview
                                    </h5>

                                    <div className="row align-items-center">
                                        <div className="col-6">
                                            <div
                                                className="mx-auto rounded-circle"
                                                style={{
                                                    width: "120px",
                                                    height: "120px",
                                                    background:
                                                        "conic-gradient(#198754 0deg 212deg, #0d6efd 212deg 360deg)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <div
                                                    className="rounded-circle bg-white d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "75px",
                                                        height: "75px"
                                                    }}
                                                >
                                                    <strong>
                                                        76
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="fw-bold fs-4">
                                                76
                                            </div>

                                            <small className="text-muted">
                                                Active subscriptions
                                            </small>

                                            <div className="mt-3 small">
                                                🔵 6 Months — 45
                                            </div>

                                            <div className="small">
                                                🟢 1 Year — 31
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* REVENUE OVERVIEW */}
                        <div className="col-xl-4 col-lg-6">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "14px"
                                }}
                            >
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4">
                                        Revenue Overview
                                    </h5>

                                    <div className="d-flex align-items-end justify-content-between gap-2">
                                        {[60, 100, 125, 155, 190, 165].map(
                                            (height, index) => (
                                                <div
                                                    key={index}
                                                    className="d-flex flex-column align-items-center"
                                                    style={{
                                                        width: "14%"
                                                    }}
                                                >
                                                    <div
                                                        className="bg-primary rounded-top"
                                                        style={{
                                                            width: "100%",
                                                            height: `${height}px`,
                                                            opacity: 0.8
                                                        }}
                                                    />
                                                    <small className="mt-2 text-muted">
                                                        {
                                                            [
                                                                "Jan",
                                                                "Feb",
                                                                "Mar",
                                                                "Apr",
                                                                "May",
                                                                "Jun"
                                                            ][index]
                                                        }
                                                    </small>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* QUICK NAVIGATION */}
                        <div className="col-xl-4">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "14px"
                                }}
                            >
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4">
                                        Admin Management
                                    </h5>

                                    <div className="d-grid gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-success"
                                            onClick={() =>
                                                navigate("/admin/sellers")
                                            }
                                        >
                                            Seller Management
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={() =>
                                                navigate("/admin/buyers")
                                            }
                                        >
                                            Buyer Management
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-outline-dark"
                                            onClick={() =>
                                                navigate("/admin/animals")
                                            }
                                        >
                                            Animal Management
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-outline-warning"
                                            onClick={() =>
                                                navigate("/admin/categories")
                                            }
                                        >
                                            Category Management
                                        </button>
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

export default AdminDashboard;