import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

function ManageCustomers() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [customers, setCustomers] = useState([
        {
            id: 1,
            name: "Rahul Patil",
            email: "rahulpatil@example.com",
            mobile: "9876500001",
            status: "Active"
        },
        {
            id: 2,
            name: "Amit Jadhav",
            email: "amitjadhav@example.com",
            mobile: "9876500002",
            status: "Active"
        },
        {
            id: 3,
            name: "Sneha More",
            email: "snehamore@example.com",
            mobile: "9876500003",
            status: "Blocked"
        },
        {
            id: 4,
            name: "Priya Shinde",
            email: "priyashinde@example.com",
            mobile: "9876500004",
            status: "Active"
        }
    ]);

    // =====================================================
    // SEARCH + FILTER
    // =====================================================

    const filteredCustomers = customers.filter((customer) => {
        const searchValue = search.toLowerCase().trim();

        const matchesSearch =
            customer.name.toLowerCase().includes(searchValue) ||
            customer.email.toLowerCase().includes(searchValue) ||
            customer.mobile.includes(searchValue);

        const matchesStatus =
            statusFilter === "All" ||
            customer.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // =====================================================
    // BLOCK / UNBLOCK
    // =====================================================

    const handleStatusChange = (id) => {
        setCustomers((prev) =>
            prev.map((customer) =>
                customer.id === id
                    ? {
                          ...customer,
                          status:
                              customer.status === "Active"
                                  ? "Blocked"
                                  : "Active"
                      }
                    : customer
            )
        );
    };

    // =====================================================
    // STATUS BADGE
    // =====================================================

    const getStatusClass = (status) => {
        if (status === "Active") {
            return "badge bg-success";
        }

        return "badge bg-danger";
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
                    style={{
                        minHeight: "70px"
                    }}
                >
                    <div>
                        <h5 className="fw-bold mb-0">
                            Customer Management
                        </h5>

                        <small className="text-muted">
                            Manage registered buyers and customers
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
                                Manage Customers
                            </h2>

                            <p className="text-muted mb-0">
                                View and manage registered customers.
                            </p>
                        </div>

                        <div className="text-muted">
                            Total:{" "}
                            <strong>
                                {customers.length}
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
                                        Search Customer
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

                                        <option value="Active">
                                            Active
                                        </option>

                                        <option value="Blocked">
                                            Blocked
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
                        CUSTOMER TABLE
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
                                                Customer
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
                                        {filteredCustomers.length ===
                                        0 ? (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center py-5 text-muted"
                                                >
                                                    No customers found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredCustomers.map(
                                                (
                                                    customer,
                                                    index
                                                ) => (
                                                    <tr
                                                        key={
                                                            customer.id
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
                                                                    👤
                                                                </div>

                                                                <div>
                                                                    <div className="fw-semibold">
                                                                        {
                                                                            customer.name
                                                                        }
                                                                    </div>

                                                                    <small className="text-muted">
                                                                        ID:{" "}
                                                                        {
                                                                            customer.id
                                                                        }
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            {
                                                                customer.email
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                customer.mobile
                                                            }
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={getStatusClass(
                                                                    customer.status
                                                                )}
                                                            >
                                                                {
                                                                    customer.status
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
                                                                            `Customer ID: ${customer.id}`
                                                                        )
                                                                    }
                                                                >
                                                                    View
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    className={
                                                                        customer.status ===
                                                                        "Active"
                                                                            ? "btn btn-sm btn-outline-danger"
                                                                            : "btn btn-sm btn-success"
                                                                    }
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            customer.id
                                                                        )
                                                                    }
                                                                >
                                                                    {customer.status ===
                                                                    "Active"
                                                                        ? "Block"
                                                                        : "Unblock"}
                                                                </button>
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

export default ManageCustomers;