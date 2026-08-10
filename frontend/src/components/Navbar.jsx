import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaSearch,
    FaMapMarkerAlt,
    FaHeart,
    FaUser,
    FaPlus
} from "react-icons/fa";

function Navbar() {

    const [showMenu, setShowMenu] = useState(false);

    const categories = [
        "Cow",
        "Buffalo",
        "Goat",
        "Sheep",
        "Horse",
        "Dog",
        "Cat",
        "Poultry"
    ];

    return (
        <>

            {/* ================= NAVBAR ================= */}

            <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">

                <div className="container-fluid px-4">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="navbar-brand fw-bold text-success fs-3"
                    >
                        🐄 AnimalSale
                    </Link>


                    {/* Location */}

                    <div
                        className="d-flex align-items-center border rounded px-2 me-3"
                        style={{
                            width: "250px",
                            height: "48px"
                        }}
                    >

                        <FaMapMarkerAlt className="text-success me-2" />

                        <select
                            className="form-select border-0 shadow-none"
                            defaultValue=""
                        >

                            <option value="" disabled>
                                Select Location
                            </option>

                            <option>Pune</option>
                            <option>Nashik</option>
                            <option>Kolhapur</option>
                            <option>Satara</option>
                            <option>Sangli</option>
                            <option>Solapur</option>
                            <option>Ahmednagar</option>
                            <option>Aurangabad</option>
                            <option>Nagpur</option>
                            <option>Beed</option>

                        </select>

                    </div>


                    {/* Search */}

                    <div className="input-group flex-grow-1 me-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Cow, Buffalo, Goat..."
                        />

                        <button
                            type="button"
                            className="btn btn-dark"
                        >
                            <FaSearch />
                        </button>

                    </div>


                    {/* Wishlist */}

                    <button
                        type="button"
                        className="btn btn-light me-2"
                    >
                        <FaHeart />
                    </button>


                    {/* Login */}

                    <Link
                        to="/login"
                        className="btn btn-light fw-bold me-2"
                    >

                        <FaUser className="me-2" />

                        Login

                    </Link>


                    {/* SELL */}

                    {/* IMPORTANT:
                        SELL now opens Seller Login
                    */}

                    <Link
                        to="/seller/login"
                        className="btn btn-success fw-bold px-4"
                    >

                        <FaPlus className="me-2" />

                        SELL

                    </Link>

                </div>

            </nav>


            {/* ================= CATEGORY BAR ================= */}

            <div className="bg-white border-top border-bottom">

                <div className="container py-2 d-flex align-items-center flex-wrap">

                    <button
                        type="button"
                        className="btn btn-link fw-bold text-dark text-decoration-none me-4"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        ☰ ALL CATEGORIES
                    </button>


                    {categories.map((category) => (

                        <Link
                            key={category}
                            to={`/animals/${category}`}
                            className="text-decoration-none text-dark me-4 fw-semibold"
                        >
                            {category}
                        </Link>

                    ))}

                </div>

            </div>


            {/* ================= OLX STYLE MEGA MENU ================= */}

            {showMenu && (

                <div className="bg-light border-bottom shadow-lg">

                    <div className="container py-4">

                        <div className="row g-4">


                            {/* Farm Animals */}

                            <div className="col-lg-3 col-md-6">

                                <div className="category-box">

                                    <h5 className="text-success fw-bold mb-3">
                                        🐄 Farm Animals
                                    </h5>

                                    <Link
                                        to="/animals/Cow"
                                        className="menu-item"
                                    >
                                        🐄 Cow
                                    </Link>

                                    <Link
                                        to="/animals/Buffalo"
                                        className="menu-item"
                                    >
                                        🐃 Buffalo
                                    </Link>

                                    <Link
                                        to="/animals/Goat"
                                        className="menu-item"
                                    >
                                        🐐 Goat
                                    </Link>

                                    <Link
                                        to="/animals/Sheep"
                                        className="menu-item"
                                    >
                                        🐑 Sheep
                                    </Link>

                                </div>

                            </div>


                            {/* Pets */}

                            <div className="col-lg-3 col-md-6">

                                <div className="category-box">

                                    <h5 className="text-success fw-bold mb-3">
                                        🐕 Pets
                                    </h5>

                                    <Link
                                        to="/animals/Dog"
                                        className="menu-item"
                                    >
                                        🐕 Dog
                                    </Link>

                                    <Link
                                        to="/animals/Cat"
                                        className="menu-item"
                                    >
                                        🐈 Cat
                                    </Link>

                                </div>

                            </div>


                            {/* Poultry */}

                            <div className="col-lg-3 col-md-6">

                                <div className="category-box">

                                    <h5 className="text-success fw-bold mb-3">
                                        🐔 Poultry
                                    </h5>

                                    <Link
                                        to="/animals/Poultry"
                                        className="menu-item"
                                    >
                                        🐔 Poultry
                                    </Link>

                                </div>

                            </div>


                            {/* Premium Animals */}

                            <div className="col-lg-3 col-md-6">

                                <div className="category-box">

                                    <h5 className="text-success fw-bold mb-3">
                                        ⭐ Premium Animals
                                    </h5>

                                    <Link
                                        to="/animals/Horse"
                                        className="menu-item"
                                    >
                                        🐎 Horse
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}

export default Navbar;