import { Link } from "react-router-dom";

function SellerSidebar() {

    return (

        <div
            className="bg-dark text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh"
            }}
        >

            <h4 className="text-center mb-4">
                Seller Panel
            </h4>

            <Link
                to="/seller/dashboard"
                className="text-white text-decoration-none d-block mb-3"
            >
                Dashboard
            </Link>

            <Link
                to="/seller/animals"
                className="text-white text-decoration-none d-block mb-3"
            >
                My Animals
            </Link>

            <Link
                to="/seller/add-animal"
                className="text-white text-decoration-none d-block mb-3"
            >
                Add Animal
            </Link>

            <Link
                to="/seller/profile"
                className="text-white text-decoration-none d-block mb-3"
            >
                My Profile
            </Link>

            <Link
                to="/login"
                className="text-white text-decoration-none d-block"
            >
                Logout
            </Link>

        </div>

    );

}

export default SellerSidebar;