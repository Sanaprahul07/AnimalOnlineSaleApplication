import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

function ManageSeller() {

    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [sellers, setSellers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================================
    // LOAD ALL SELLERS FROM DATABASE
    // =====================================================

    const loadSellers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await AdminService.getAllSellers();

            console.log("ALL SELLERS FROM DATABASE:", response.data);

            setSellers(response.data || []);

        } catch (error) {

            console.error("Error loading sellers:", error);

            setError(
                "Unable to load sellers. Please check the backend server."
            );

            setSellers([]);

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // LOAD SELLERS WHEN PAGE OPENS
    // =====================================================

    useEffect(() => {

        loadSellers();

    }, []);


    // =====================================================
    // SEARCH + STATUS FILTER
    // =====================================================

    const filteredSellers = sellers.filter((seller) => {

        const searchValue = search.toLowerCase().trim();

        const sellerName =
            seller.sellerName
                ? seller.sellerName.toLowerCase()
                : "";

        const email =
            seller.email
                ? seller.email.toLowerCase()
                : "";

        const mobile =
            seller.mobile
                ? String(seller.mobile)
                : "";

        const status =
            seller.approvalStatus ||
            seller.status ||
            "PENDING";

        const matchesSearch =
            sellerName.includes(searchValue) ||
            email.includes(searchValue) ||
            mobile.includes(searchValue);

        const matchesStatus =
            statusFilter === "All" ||
            status.toUpperCase() === statusFilter.toUpperCase();

        return matchesSearch && matchesStatus;
    });


    // =====================================================
    // STATUS BADGE
    // =====================================================

    const getStatusClass = (status) => {

        const currentStatus =
            status
                ? status.toUpperCase()
                : "PENDING";

        if (currentStatus === "APPROVED") {

            return "badge bg-success";

        }

        if (currentStatus === "REJECTED") {

            return "badge bg-danger";

        }

        return "badge bg-warning text-dark";
    };


    // =====================================================
    // VIEW PARTICULAR SELLER
    // =====================================================

    const handleViewSeller = (id) => {

        navigate(`/admin/sellers/${id}`);

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div
                className="d-flex"
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#f7f8fc"
                }}
            >

                <AdminSidebar />

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        marginLeft: "250px",
                        width: "calc(100% - 250px)",
                        minHeight: "100vh"
                    }}
                >

                    <div className="text-center">

                        <div
                            className="spinner-border text-primary mb-3"
                            role="status"
                        />

                        <div className="text-muted">
                            Loading sellers...
                        </div>

                    </div>

                </div>

            </div>

        );
    }


    // =====================================================
    // MAIN UI
    // =====================================================

    return (

        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f7f8fc"
            }}
        >

            {/* =====================================================
                SIDEBAR
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
                    className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center"
                    style={{
                        minHeight: "70px"
                    }}
                >

                    <div>

                        <h5 className="fw-bold mb-0">
                            Seller Management
                        </h5>

                        <small className="text-muted">
                            View and manage registered sellers
                        </small>

                    </div>


                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                    >
                        ← Dashboard
                    </button>

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="p-4">


                    {/* =================================================
                        TITLE
                    ================================================= */}

                    <div
                        className="d-flex justify-content-between align-items-center mb-4"
                    >

                        <div>

                            <h2 className="fw-bold mb-1">
                                All Sellers
                            </h2>

                            <p className="text-muted mb-0">
                                Sellers registered in the application.
                            </p>

                        </div>


                        <div className="text-muted">

                            Total:{" "}

                            <strong>
                                {sellers.length}
                            </strong>

                        </div>

                    </div>


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <div
                            className="alert alert-danger"
                            role="alert"
                        >

                            {error}

                            <button
                                type="button"
                                className="btn btn-sm btn-danger ms-3"
                                onClick={loadSellers}
                            >
                                Retry
                            </button>

                        </div>

                    )}


                    {/* =================================================
                        FILTER CARD
                    ================================================= */}

                    <div
                        className="card border-0 shadow-sm mb-4"
                        style={{
                            borderRadius: "14px"
                        }}
                    >

                        <div className="card-body">

                            <div className="row g-3">


                                {/* SEARCH */}

                                <div className="col-lg-7">

                                    <label className="form-label fw-semibold">
                                        Search Seller
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name, email or mobile..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />

                                </div>


                                {/* STATUS */}

                                <div className="col-lg-3">

                                    <label className="form-label fw-semibold">
                                        Approval Status
                                    </label>

                                    <select
                                        className="form-select"
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="All">
                                            All
                                        </option>

                                        <option value="PENDING">
                                            Pending
                                        </option>

                                        <option value="APPROVED">
                                            Approved
                                        </option>

                                        <option value="REJECTED">
                                            Rejected
                                        </option>

                                    </select>

                                </div>


                                {/* RESET */}

                                <div className="col-lg-2 d-flex align-items-end">

                                    <button
                                        type="button"
                                        className="btn btn-secondary w-100"
                                        onClick={() => {

                                            setSearch("");
                                            setStatusFilter("All");

                                        }}
                                    >
                                        Reset
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        SELLER TABLE
                    ================================================= */}

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "14px"
                        }}
                    >

                        <div className="card-body p-0">

                            <div className="table-responsive">

                                <table className="table table-hover align-middle mb-0">

                                    <thead className="table-light">

                                        <tr>

                                            <th className="px-4 py-3">
                                                #
                                            </th>

                                            <th className="py-3">
                                                Seller
                                            </th>

                                            <th className="py-3">
                                                Email
                                            </th>

                                            <th className="py-3">
                                                Mobile
                                            </th>

                                            <th className="py-3">
                                                Approval Status
                                            </th>

                                            <th className="py-3 text-end px-4">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {/* =================================================
                                            NO SELLER
                                        ================================================= */}

                                        {filteredSellers.length === 0 ? (

                                            <tr>

                                                <td
                                                    colSpan="6"
                                                    className="text-center py-5 text-muted"
                                                >

                                                    {sellers.length === 0
                                                        ? "No sellers available in database."
                                                        : "No sellers found for the selected search/filter."
                                                    }

                                                </td>

                                            </tr>

                                        ) : (

                                            filteredSellers.map(
                                                (seller, index) => {

                                                    const status =
                                                        seller.approvalStatus ||
                                                        seller.status ||
                                                        "PENDING";

                                                    return (

                                                        <tr
                                                            key={seller.id}
                                                        >

                                                            {/* NUMBER */}

                                                            <td className="px-4">

                                                                {index + 1}

                                                            </td>


                                                            {/* SELLER */}

                                                            <td>

                                                                <div
                                                                    className="d-flex align-items-center gap-3"
                                                                >

                                                                    <div
                                                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                                                        style={{
                                                                            width: "42px",
                                                                            height: "42px",
                                                                            backgroundColor:
                                                                                "#e8f5e9"
                                                                        }}
                                                                    >

                                                                        👨‍🌾

                                                                    </div>


                                                                    <div>

                                                                        <div className="fw-semibold">

                                                                            {seller.sellerName ||
                                                                                "N/A"}

                                                                        </div>


                                                                        <small className="text-muted">

                                                                            ID:{" "}

                                                                            {seller.id}

                                                                        </small>

                                                                    </div>

                                                                </div>

                                                            </td>


                                                            {/* EMAIL */}

                                                            <td>

                                                                {seller.email ||
                                                                    "N/A"}

                                                            </td>


                                                            {/* MOBILE */}

                                                            <td>

                                                                {seller.mobile ||
                                                                    "N/A"}

                                                            </td>


                                                            {/* STATUS */}

                                                            <td>

                                                                <span
                                                                    className={getStatusClass(
                                                                        status
                                                                    )}
                                                                >

                                                                    {status}

                                                                </span>

                                                            </td>


                                                            {/* ACTION */}

                                                            <td className="text-end px-4">

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-outline-primary"
                                                                    onClick={() =>
                                                                        handleViewSeller(
                                                                            seller.id
                                                                        )
                                                                    }
                                                                >

                                                                    View Seller

                                                                </button>

                                                            </td>

                                                        </tr>

                                                    );

                                                }
                                            )

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ManageSeller;