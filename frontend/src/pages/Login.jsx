import { useState } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-header bg-success text-white text-center">

                            <h3>Online Animal Sale Login</h3>

                        </div>

                        <div className="card-body">

                            <div className="mb-3">

                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>

                            <button className="btn btn-success w-100">

                                Login

                            </button>

                            <div className="text-center mt-3">

                                Don't have an account?

                                <br />

                                <a href="/register">

                                    Register Here

                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;