function SellerDashboard() {

    return (

        <div className="container mt-5">

            <h2 className="text-success">

                Seller Dashboard

            </h2>

            <div className="row mt-4">

                <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h5>Total Animals</h5>

                            <h3>0</h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h5>Pending Orders</h5>

                            <h3>0</h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h5>Profile Status</h5>

                            <h3>Active</h3>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default SellerDashboard;