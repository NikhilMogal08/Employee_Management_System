import React, { useState } from 'react';
import axios from 'axios';

export default function AddEmployee() {
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [salary, setSalary] = useState(0.0);
    const [img, setImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const api = "http://51.20.63.117:8081/Employee_Management_System_3-3.2.2";

    const handleimg = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fullname = `/img/${file.name}`;
            console.log("Image path: ", fullname);
            setImage(fullname);
        }
    };

    const addemployee = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newemp = {
            name: name.trim(),
            email: email.trim(),
            department: department.trim(),
            role: role.trim(),
            salary,
            img
        };

        try {
            const response = await axios.post(`${api}/api/admin/saveemp`, newemp);
            if (response.data) {
                alert("Employee record added successfully!");

                // Reset form
                setName("");
                setDepartment("");
                setEmail("");
                setRole("");
                setSalary(0.0);
                setImage("");
                document.getElementById("image").value = ""; // Reset file input
            }
        } catch (error) {
            console.error("Error occurred:", error);
            alert("Failed to add employee. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">Add New Employee</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={addemployee}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="name" 
                                        onChange={(e) => setName(e.target.value)} 
                                        value={name} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        value={email} 
                                        required 
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="department" className="form-label">Department</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="department" 
                                            onChange={(e) => setDepartment(e.target.value)} 
                                            value={department} 
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="role" className="form-label">Role</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="role" 
                                            onChange={(e) => setRole(e.target.value)} 
                                            value={role} 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="salary" className="form-label">Salary</label>
                                    <div className="input-group">
                                        <span className="input-group-text">$</span>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            id="salary" 
                                            min="0" 
                                            step="0.01" 
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value);
                                                setSalary(isNaN(val) ? 0.0 : val);
                                            }} 
                                            value={salary} 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="image" className="form-label">Profile Image</label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        id="image" 
                                        accept="image/*" 
                                        onChange={handleimg} 
                                    />
                                    <div className="form-text">Upload a professional photo of the employee</div>
                                </div>

                                <div className="d-grid">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Adding...
                                            </>
                                        ) : 'Add Employee'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
