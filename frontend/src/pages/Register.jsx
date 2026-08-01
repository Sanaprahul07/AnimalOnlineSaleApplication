import { Link } from "react-router-dom";

function Register() {

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header bg-warning text-dark text-center">

                            <h3>Online Animal Sale Application</h3>
                            <h5>Register</h5>

                        </div>

                        <div className="card-body">

                            <div className="mb-3">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Full Name"
                                />
                            </div>

                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                />
                            </div>

                            <div className="mb-3">
                                <label>Mobile Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Mobile Number"
                                />
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                />
                            </div>

                            <button className="btn btn-warning w-100">
                                Register
                            </button>

                            <div className="text-center mt-3">

                                Already have an account?

                                <br />

                                <Link to="/login">
                                    Login Here
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Register;