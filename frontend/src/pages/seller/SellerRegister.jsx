function SellerRegister() {

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="text-center text-success">

                    Seller Register

                </h2>

                <form>

                    <div className="mb-3">

                        <label>Seller Name</label>

                        <input
                            className="form-control"
                        />

                    </div>

                    <div className="mb-3">

                        <label>Email</label>

                        <input
                            className="form-control"
                        />

                    </div>

                    <div className="mb-3">

                        <label>Mobile</label>

                        <input
                            className="form-control"
                        />

                    </div>

                    <div className="mb-3">

                        <label>Password</label>

                        <input
                            type="password"
                            className="form-control"
                        />

                    </div>

                    <button className="btn btn-success w-100">

                        Register

                    </button>

                </form>

            </div>

        </div>

    );

}

export default SellerRegister;