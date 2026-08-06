import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCustomer } from "../services/CustomerService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        // Validation
        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }

        const loginData = {
            email: email,
            password: password
        };

        try {

            const response = await loginCustomer(loginData);

            console.log("Login Response:", response.data);

            // Save customer information
            localStorage.setItem(
                "customer",
                JSON.stringify(response.data)
            );

            setMessage("Login Successful");

            // Directly open Home Page
            navigate("/");

        } catch (error) {

            console.error("Login Error:", error);

            if (error.response) {

                setError(
                    error.response.data?.message ||
                    "Invalid Email or Password"
                );

            } else {

                setError(
                    "Backend server is not running"
                );
            }
        }
    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-header bg-success text-white text-center">

                            <h3>Online Animal Sale Login</h3>

                        </div>

                        <div className="card-body">

                            {message && (
                                <div className="alert alert-success">
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    Login
                                </button>

                            </form>

                            <div className="text-center mt-3">

                                Don't have an account?

                                <br />

                                <Link to="/register">
                                    Register Here
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;