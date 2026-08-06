import SellerSidebar from "./SellerSidebar";
import SellerTopbar from "./SellerTopbar";

function SellerLayout({ children }) {

    return (

        <div className="d-flex">

            {/* Seller Sidebar */}
            <SellerSidebar />

            {/* Right Side */}
            <div className="flex-grow-1">

                {/* Seller Topbar */}
                <SellerTopbar />

                {/* Page Content */}
                <main className="p-4">

                    {children}

                </main>

            </div>

        </div>

    );
}

export default SellerLayout;