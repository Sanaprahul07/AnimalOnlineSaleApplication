function SellerTopbar() {

    return (

        <nav className="navbar navbar-light bg-white shadow-sm px-4">

            <div className="container-fluid">

                {/* Page Title */}
                <span className="navbar-brand fw-bold">
                    Seller Dashboard
                </span>


                {/* Right Side */}
                <div className="d-flex align-items-center">

                    <span className="me-3">
                        Welcome, Seller
                    </span>

                    <button
                        className="btn btn-outline-success"
                    >
                        Notifications
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default SellerTopbar;