import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCustomer } from "../services/CustomerService";

function Register() {

    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (!customerName || !email || !mobile || !password) {
            setError("Please fill all required fields");
            return;
        }

        const customerData = {
            customerName: customerName,
            email: email,
            mobile: mobile,
            password: password,

            address: "",
            city: "",
            state: "",
            pincode: "",
            profileImage: ""
        };

        try {

            const response = await registerCustomer(customerData);

            console.log("Register Response:", response.data);

            setMessage("Registration Successful");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            console.error("Registration Error:", error);

            if (error.response) {
                setError(
                    error.response.data?.message ||
                    "Registration Failed"
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

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header bg-warning text-dark text-center">

                            <h3>Online Animal Sale Application</h3>

                            <h5>Register</h5>

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

                            <form onSubmit={handleRegister}>

                                {/* Customer Name */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Full Name"
                                        value={customerName}
                                        onChange={(e) =>
                                            setCustomerName(e.target.value)
                                        }
                                    />

                                </div>

                                {/* Email */}

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

                                {/* Mobile */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Mobile Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Mobile Number"
                                        value={mobile}
                                        onChange={(e) =>
                                            setMobile(e.target.value)
                                        }
                                    />

                                </div>

                                {/* Password */}

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
                                    className="btn btn-warning w-100"
                                >
                                    Register
                                </button>

                            </form>

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