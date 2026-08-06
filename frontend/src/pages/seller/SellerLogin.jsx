function SellerLogin() {

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="text-center text-success">
                    Seller Login
                </h2>

                <form>

                    <div className="mb-3">

                        <label>Email</label>

                        <input
                            type="email"
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

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}

export default SellerLogin;