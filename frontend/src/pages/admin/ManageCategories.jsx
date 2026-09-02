import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";

function ManageCategories() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "Cow",
            description: "Cows and cattle breeds",
            animalCount: 25,
            status: "Active"
        },
        {
            id: 2,
            name: "Buffalo",
            description: "Buffalo and related breeds",
            animalCount: 18,
            status: "Active"
        },
        {
            id: 3,
            name: "Goat",
            description: "Goats and goat breeds",
            animalCount: 32,
            status: "Active"
        },
        {
            id: 4,
            name: "Sheep",
            description: "Sheep and sheep breeds",
            animalCount: 14,
            status: "Active"
        },
        {
            id: 5,
            name: "Horse",
            description: "Horse and horse breeds",
            animalCount: 9,
            status: "Active"
        },
        {
            id: 6,
            name: "Dog",
            description: "Dogs and pet breeds",
            animalCount: 21,
            status: "Active"
        },
        {
            id: 7,
            name: "Cat",
            description: "Cats and cat breeds",
            animalCount: 12,
            status: "Active"
        },
        {
            id: 8,
            name: "Rabbit",
            description: "Rabbit and rabbit breeds",
            animalCount: 7,
            status: "Inactive"
        }
    ]);

    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "Active"
    });

    // =====================================================
    // SEARCH + FILTER
    // =====================================================

    const filteredCategories = categories.filter((category) => {
        const searchValue = search.toLowerCase().trim();

        const matchesSearch =
            category.name
                .toLowerCase()
                .includes(searchValue) ||
            category.description
                .toLowerCase()
                .includes(searchValue);

        const matchesStatus =
            statusFilter === "All" ||
            category.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // =====================================================
    // ADD CATEGORY
    // =====================================================

    const handleAddCategory = (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            alert("Please enter category name.");
            return;
        }

        const exists = categories.some(
            (category) =>
                category.name.toLowerCase() ===
                formData.name.trim().toLowerCase()
        );

        if (exists) {
            alert("Category already exists.");
            return;
        }

        const newCategory = {
            id:
                categories.length > 0
                    ? Math.max(
                          ...categories.map(
                              (category) => category.id
                          )
                      ) + 1
                    : 1,
            name: formData.name.trim(),
            description:
                formData.description.trim() ||
                "Animal category",
            animalCount: 0,
            status: formData.status
        };

        setCategories((prev) => [
            ...prev,
            newCategory
        ]);

        setFormData({
            name: "",
            description: "",
            status: "Active"
        });

        setShowForm(false);
    };

    // =====================================================
    // TOGGLE STATUS
    // =====================================================

    const handleToggleStatus = (id) => {
        setCategories((prev) =>
            prev.map((category) =>
                category.id === id
                    ? {
                          ...category,
                          status:
                              category.status === "Active"
                                  ? "Inactive"
                                  : "Active"
                      }
                    : category
            )
        );
    };

    // =====================================================
    // DELETE CATEGORY
    // =====================================================

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) {
            return;
        }

        setCategories((prev) =>
            prev.filter((category) => category.id !== id)
        );
    };

    // =====================================================
    // STATUS BADGE
    // =====================================================

    const getStatusClass = (status) => {
        return status === "Active"
            ? "badge bg-success"
            : "badge bg-secondary";
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
                            Category Management
                        </h5>

                        <small className="text-muted">
                            Manage animal categories
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
                                Manage Categories
                            </h2>

                            <p className="text-muted mb-0">
                                Add, activate, deactivate and manage
                                animal categories.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() =>
                                setShowForm(!showForm)
                            }
                        >
                            {showForm
                                ? "✕ Close"
                                : "＋ Add Category"}
                        </button>
                    </div>

                    {/* =================================================
                        ADD CATEGORY FORM
                    ================================================= */}

                    {showForm && (
                        <div
                            className="card border-0 shadow-sm mb-4"
                            style={{
                                borderRadius: "14px"
                            }}
                        >
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4">
                                    Add New Category
                                </h5>

                                <form
                                    onSubmit={
                                        handleAddCategory
                                    }
                                >
                                    <div className="row g-3">
                                        <div className="col-lg-4">
                                            <label className="form-label fw-semibold">
                                                Category Name
                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                value={
                                                    formData.name
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder="Enter category name"
                                            />
                                        </div>

                                        <div className="col-lg-5">
                                            <label className="form-label fw-semibold">
                                                Description
                                            </label>

                                            <input
                                                type="text"
                                                name="description"
                                                value={
                                                    formData.description
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder="Enter category description"
                                            />
                                        </div>

                                        <div className="col-lg-2">
                                            <label className="form-label fw-semibold">
                                                Status
                                            </label>

                                            <select
                                                name="status"
                                                value={
                                                    formData.status
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-select"
                                            >
                                                <option value="Active">
                                                    Active
                                                </option>

                                                <option value="Inactive">
                                                    Inactive
                                                </option>
                                            </select>
                                        </div>

                                        <div className="col-lg-1 d-flex align-items-end">
                                            <button
                                                type="submit"
                                                className="btn btn-success w-100"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* =================================================
                        FILTERS
                    ================================================= */}

                    <div
                        className="card border-0 shadow-sm mb-4"
                        style={{
                            borderRadius: "14px"
                        }}
                    >
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-lg-8">
                                    <label className="form-label fw-semibold">
                                        Search Category
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by category name or description..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-lg-2">
                                    <label className="form-label fw-semibold">
                                        Status
                                    </label>

                                    <select
                                        className="form-select"
                                        value={
                                            statusFilter
                                        }
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

                                        <option value="Inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>

                                <div className="col-lg-2 d-flex align-items-end">
                                    <button
                                        type="button"
                                        className="btn btn-secondary w-100"
                                        onClick={() => {
                                            setSearch("");
                                            setStatusFilter(
                                                "All"
                                            );
                                        }}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        CATEGORY TABLE
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
                                                Category
                                            </th>

                                            <th className="py-3">
                                                Description
                                            </th>

                                            <th className="py-3">
                                                Animals
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
                                        {filteredCategories.length ===
                                        0 ? (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center py-5 text-muted"
                                                >
                                                    No categories found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredCategories.map(
                                                (
                                                    category,
                                                    index
                                                ) => (
                                                    <tr
                                                        key={
                                                            category.id
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
                                                                    🐾
                                                                </div>

                                                                <div>
                                                                    <div className="fw-semibold">
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </div>

                                                                    <small className="text-muted">
                                                                        ID:{" "}
                                                                        {
                                                                            category.id
                                                                        }
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            {
                                                                category.description
                                                            }
                                                        </td>

                                                        <td>
                                                            <span className="fw-semibold">
                                                                {
                                                                    category.animalCount
                                                                }
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={getStatusClass(
                                                                    category.status
                                                                )}
                                                            >
                                                                {
                                                                    category.status
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="text-end px-4">
                                                            <div className="d-flex justify-content-end gap-2">
                                                                <button
                                                                    type="button"
                                                                    className={
                                                                        category.status ===
                                                                        "Active"
                                                                            ? "btn btn-sm btn-outline-secondary"
                                                                            : "btn btn-sm btn-success"
                                                                    }
                                                                    onClick={() =>
                                                                        handleToggleStatus(
                                                                            category.id
                                                                        )
                                                                    }
                                                                >
                                                                    {category.status ===
                                                                    "Active"
                                                                        ? "Deactivate"
                                                                        : "Activate"}
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            category.id
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
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

                    {/* =================================================
                        FOOT NOTE
                    ================================================= */}

                    <div className="mt-3 text-muted small">
                        Showing{" "}
                        <strong>
                            {filteredCategories.length}
                        </strong>{" "}
                        of{" "}
                        <strong>
                            {categories.length}
                        </strong>{" "}
                        categories.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageCategories;