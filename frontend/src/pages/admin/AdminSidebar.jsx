import { useNavigate } from "react-router-dom";

function AdminSidebar() {
    const navigate = useNavigate();

    return (
        <div
            className="bg-white border-end"
            style={{
                width: "250px",
                minHeight: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: 1000
            }}
        >
            {/* =====================================================
                BRAND
            ===================================================== */}

            <div className="px-4 py-4 border-bottom">

                <div
                    className="fw-bold text-success fs-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/admin/dashboard")}
                >
                    🐾 AnimalSale
                </div>

                <small className="text-muted">
                    Admin Panel
                </small>

            </div>

            {/* =====================================================
                MENU
            ===================================================== */}

            <div className="p-3">

                <button
                    type="button"
                    className="btn btn-success w-100 text-start mb-2"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    📊 Dashboard
                </button>

                <button
                    type="button"
                    className="btn btn-light w-100 text-start mb-2"
                    onClick={() => navigate("/admin/sellers")}
                >
                    👨‍🌾 Sellers
                </button>

                <button
                    type="button"
                    className="btn btn-light w-100 text-start mb-2"
                    onClick={() => navigate("/admin/buyers")}
                >
                    👤 Buyers
                </button>

                <button
                    type="button"
                    className="btn btn-light w-100 text-start mb-2"
                    onClick={() => navigate("/admin/animals")}
                >
                    🐄 Animals
                </button>

                <button
                    type="button"
                    className="btn btn-light w-100 text-start mb-2"
                    onClick={() => navigate("/admin/categories")}
                >
                    🗂️ Categories
                </button>

                <button
                    type="button"
                    className="btn btn-light w-100 text-start mb-2"
                    onClick={() => navigate("/admin/subscriptions")}
                >
                    💳 Subscription Plans
                </button>

                <button
                    type="button"
                    className="btn btn-light w-100 text-start mb-2"
                    onClick={() => navigate("/admin/orders")}
                >
                    📦 Orders
                </button>

                <button
                    type="button"
                    className="btn btn-light w-100 text-start mb-2"
                    onClick={() => navigate("/admin/payments")}
                >
                    💰 Payments
                </button>

                <button
                    type="button"
                    className="btn btn-light w-100 text-start mb-2"
                    onClick={() => navigate("/admin/reports")}
                >
                    📈 Reports
                </button>

                <button
                    type="button"
                    className="btn btn-light w-100 text-start mb-2"
                    onClick={() => navigate("/admin/notifications")}
                >
                    🔔 Notifications
                </button>

                <button
                    type="button"
                    className="btn btn-light w-100 text-start mb-2"
                    onClick={() => navigate("/admin/settings")}
                >
                    ⚙️ Settings
                </button>

                <hr />

                <button
                    type="button"
                    className="btn btn-outline-danger w-100 text-start"
                    onClick={() => {
                        localStorage.removeItem("adminId");
                        localStorage.removeItem("adminLogin");
                        navigate("/login");
                    }}
                >
                    🚪 Logout
                </button>

            </div>

        </div>
    );
}

export default AdminSidebar;