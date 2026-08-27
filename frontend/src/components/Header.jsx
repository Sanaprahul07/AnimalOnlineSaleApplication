import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    PawIcon,
    LocationIcon,
    ChevronDown,
    HeartIcon,
    UserIcon
} from "./Icons";

// =====================================================
// TOP HEADER
// Brand · Location · Search · Wishlist · Login · Sell
// =====================================================

function Header() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    // Free-text search reuses the category list page as results.
    const handleSearch = (e) => {
        e.preventDefault();

        const term = query.trim();

        if (term) {
            navigate(`/animals/${encodeURIComponent(term)}`);
        }
    };

    return (
        <header className="as-header">

            <div className="container py-2">

                <div className="d-flex align-items-center gap-3">

                    {/* ==========================================
                        BRAND
                    ========================================== */}

                    <div
                        className="as-brand"
                        role="button"
                        onClick={() => navigate("/")}
                    >
                        <PawIcon size={26} />

                        <span>
                            Animal
                            <span className="as-text-green">
                                Sale
                            </span>
                        </span>
                    </div>

                    {/* ==========================================
                        LOCATION
                    ========================================== */}

                    <div className="as-location d-none d-lg-flex">

                        <LocationIcon size={16} />

                        All India

                        <ChevronDown size={14} />

                    </div>

                    {/* ==========================================
                        SEARCH
                    ========================================== */}

                    <form
                        className="as-search"
                        onSubmit={handleSearch}
                    >

                        <input
                            type="text"
                            placeholder="Search animals, breeds, categories..."
                            value={query}
                            onChange={(e) =>
                                setQuery(e.target.value)
                            }
                        />

                        <button
                            type="submit"
                            className="as-search-btn"
                        >
                            Search
                        </button>

                    </form>

                    {/* ==========================================
                        ACTIONS
                    ========================================== */}

                    <button
                        type="button"
                        className="as-header-action d-none d-md-flex"
                        onClick={() => navigate("/login")}
                    >
                        <HeartIcon size={20} />
                        Wishlist
                    </button>

                    <button
                        type="button"
                        className="as-header-action d-none d-md-flex"
                        onClick={() => navigate("/login")}
                    >
                        <UserIcon size={20} />
                        Login
                    </button>

                    {/* ==========================================
                        SELL ANIMAL BUTTON
                        ONLY BUTTON STYLE CHANGED
                    ========================================== */}

                    <button
                        type="button"
                        className="btn px-4 py-2 text-nowrap fw-bold"
                        style={{
                            backgroundColor: "#198754",
                            color: "#ffffff",
                            border: "1px solid #198754",
                            borderRadius: "8px",
                            minHeight: "42px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            whiteSpace: "nowrap",
                            boxShadow: "none"
                        }}
                        onClick={() => navigate("/seller/register")}
                    >
                        + Sell Animal
                    </button>

                </div>

            </div>

        </header>
    );
}

export default Header;