import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
    const [isRegistering, setIsRegistering] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        contactno: "",
        password: "",
        urole: ""
    });
    const navigate = useNavigate();
    const api = "http://51.20.63.117:8081/Employee_Management_System_3-3.2.2";

    const handleChange = (e) => {
        
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isRegistering ? `${api}/user/register` : `${api}/user/login`;

            const payload = isRegistering
                ? formData // send all fields for registration
                : { username: formData.username, password: formData.password }; // only needed for login

            const response = await axios.post(url, payload, {
                headers: { "Content-Type": "application/json" }
            });

            const userData = response.data;
            localStorage.setItem("userdata", JSON.stringify(userData));

            alert(isRegistering ? "Registration successful!" : "Login successful!");

            const redirectRole = isRegistering ? formData.urole : userData.urole;

            if (redirectRole === "admin") {
                navigate("/AdminDash");
            } else {
                navigate("/EmployeeDash");
            }

            if (isRegistering) {
                // Reset form for next login attempt
                setIsRegistering(false);
                setFormData({
                    username: "",
                    email: "",
                    contactno: "",
                    password: "",
                    urole: ""
                });
            }
        } catch (error) {
            console.error("Auth error:", error.response?.data || error.message);
            alert(isRegistering ? "Registration failed. Try again." : "Login failed. Check credentials.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4 rounded-4 bg-white" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center text-primary fw-bold mb-3">
                    {isRegistering ? "Register User" : "Login"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold small">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control form-control-sm"
                            placeholder="Enter username"
                            required
                            onChange={handleChange}
                            value={formData.username}
                        />
                    </div>

                    {isRegistering && (
                        <>
                            <div className="mb-3">
                                <label className="form-label fw-semibold small">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-sm"
                                    placeholder="Enter email"
                                    required
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold small">Contact Number</label>
                                <input
                                    type="number"
                                    name="contactno"
                                    className="form-control form-control-sm"
                                    placeholder="Enter contact number"
                                    required
                                    onChange={handleChange}
                                    value={formData.contactno}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold small">Select User Type</label>
                                <select
                                    name="urole"
                                    className="form-select form-select-sm"
                                    required
                                    onChange={handleChange}
                                    value={formData.urole}
                                >
                                    <option value="">Select user type</option>
                                    <option value="employee">Employee</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="mb-3">
                        <label className="form-label fw-semibold small">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control form-control-sm"
                            placeholder="Enter password"
                            required
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm mb-3">
                        {isRegistering ? "Register" : "Login"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    {isRegistering ? (
                        <>
                            <p className="small text-muted">Already registered?</p>
                            <button onClick={() => setIsRegistering(false)} className="btn btn-outline-primary w-100 fw-bold shadow-sm">
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="small text-muted">New user?</p>
                            <button onClick={() => setIsRegistering(true)} className="btn btn-outline-primary w-100 fw-bold shadow-sm">
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
