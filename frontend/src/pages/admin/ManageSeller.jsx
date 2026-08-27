import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

function ManageSeller() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    /*
     * UI structure for seller management.
     *
     * Backend/API integration intentionally kept out of this step,
     * because existing seller API endpoints should not be changed
     * or guessed.
     *
     * Replace this array later with the existing seller API response.
     */
    const [sellers, setSellers] = useState([
        {
            id: 1,
            sellerName: "Rahul Farms",
            email: "rahul@example.com",
            mobile: "9876543210",
            status: "Pending"
        },
        {
            id: 2,
            sellerName: "Green Valley Farm",
            email: "greenvalley@example.com",
            mobile: "9876543211",
            status: "Approved"
        },
        {
            id: 3,
            sellerName: "Paws & Claws",
            email: "paws@example.com",
            mobile: "9876543212",
            status: "Approved"
        },
        {
            id: 4,
            sellerName: "Shree Ganesh Farm",
            email: "ganeshfarm@example.com",
            mobile: "9876543213",
            status: "Rejected"
        }
    ]);

    // =====================================================
    // SEARCH + FILTER
    // =====================================================

    const filteredSellers = sellers.filter((seller) => {
        const searchValue = search.toLowerCase().trim();

        const matchesSearch =
            seller.sellerName.toLowerCase().includes(searchValue) ||
            seller.email.toLowerCase().includes(searchValue) ||
            seller.mobile.includes(searchValue);

        const matchesStatus =
            statusFilter === "All" ||
            seller.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // =====================================================
    // STATUS ACTIONS
    // =====================================================

    const handleApprove = (id) => {
        setSellers((prev) =>
            prev.map((seller) =>
                seller.id === id
                    ? {
                          ...seller,
                          status: "Approved"
                      }
                    : seller
            )
        );
    };

    const handleReject = (id) => {
        setSellers((prev) =>
            prev.map((seller) =>
                seller.id === id
                    ? {
                          ...seller,
                          status: "Rejected"
                      }
                    : seller
            )
        );
    };

    // =====================================================
    // STATUS BADGE
    // =====================================================

    const getStatusClass = (status) => {
        if (status === "Approved") {
            return "badge bg-success";
        }

        if (status === "Rejected") {
            return "badge bg-danger";
        }

        return "badge bg-warning text-dark";
    };

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
                    style={{ minHeight: "70px" }}
                >
                    <div>
                        <h5 className="fw-bold mb-0">
                            Seller Management
                        </h5>

                        <small className="text-muted">
                            Manage registered sellers
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

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="fw-bold mb-1">
                                Manage Sellers
                            </h2>

                            <p className="text-muted mb-0">
                                Review and manage seller accounts.
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
                                            setSearch(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                {/* STATUS */}

                                <div className="col-lg-3">
                                    <label className="form-label fw-semibold">
                                        Status
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

                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Approved">
                                            Approved
                                        </option>

                                        <option value="Rejected">
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
                                                Status
                                            </th>

                                            <th className="py-3 text-end px-4">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredSellers.length ===
                                        0 ? (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center py-5 text-muted"
                                                >
                                                    No sellers found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredSellers.map(
                                                (seller, index) => (
                                                    <tr
                                                        key={
                                                            seller.id
                                                        }
                                                    >
                                                        <td className="px-4">
                                                            {index + 1}
                                                        </td>

                                                        <td>
                                                            <div className="d-flex align-items-center gap-3">
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
                                                                        {
                                                                            seller.sellerName
                                                                        }
                                                                    </div>

                                                                    <small className="text-muted">
                                                                        ID:{" "}
                                                                        {
                                                                            seller.id
                                                                        }
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            {
                                                                seller.email
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                seller.mobile
                                                            }
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={getStatusClass(
                                                                    seller.status
                                                                )}
                                                            >
                                                                {
                                                                    seller.status
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="text-end px-4">
                                                            <div className="d-flex justify-content-end gap-2">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-outline-primary"
                                                                    onClick={() =>
                                                                        alert(
                                                                            `Seller ID: ${seller.id}`
                                                                        )
                                                                    }
                                                                >
                                                                    View
                                                                </button>

                                                                {seller.status !==
                                                                    "Approved" && (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-success"
                                                                        onClick={() =>
                                                                            handleApprove(
                                                                                seller.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Approve
                                                                    </button>
                                                                )}

                                                                {seller.status !==
                                                                    "Rejected" && (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={() =>
                                                                            handleReject(
                                                                                seller.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
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