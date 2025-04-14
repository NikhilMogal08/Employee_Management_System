import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function AdminDash() {
    let [employees, setEmployees] = useState([]);
    let [isshowupdateform, setIsShowUpdateForm] = useState(false);
    let [isShowAddForm, setIsShowAddForm] = useState(false);
    let [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [deptQuery, setDeptQuery] = useState("");
    const [roleQuery, setRoleQuery] = useState("");

    let api = "http://51.20.63.117:8081/Employee_Management_System_3-3.2.2";

    // Fetch all employees
    const fetchdata = () => {
        axios
            .get(`${api}/api/admin/getallemp`)
            .then((response) => {
                if (response.data) {
                    setEmployees(response.data);
                }
            })
            .catch((error) => {
                console.log("Error occurred: " + error);
            });
    };

    useEffect(() => {
        fetchdata();
    }, []);

    // Fetch filtered employees based on search, department, or role
    const fetchFilteredEmployees = async () => {
        try {
            let url = `${api}/api/admin/getallemp`; // Default endpoint to get all employees

            // Check if search query is filled
            if (searchQuery.trim()) {
                url = `${api}/api/admin/findbyname/${searchQuery.trim()}`;
            }
            // Check if department query is filled
            else if (deptQuery.trim()) {
                url = `${api}/api/admin/findbydept?department=${deptQuery.trim()}`;
            }
            // Check if role query is filled
            else if (roleQuery.trim()) {
                url = `${api}/api/admin/findbyrole?role=${roleQuery.trim()}`;
            }

            const response = await axios.get(url);
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    // Delete an employee
    let deleteemp = (id) => {
        axios
            .delete(`${api}/api/admin/delete/${id}`)
            .then((response) => {
                if (response.data) {
                    alert("Record deleted successfully");
                    setEmployees(employees.filter((emp) => emp.id !== id)); // Update list immediately after deletion
                }
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
    };

    // Show the update form for a selected employee
    let showUpdateForm = (employee) => {
        setSelectedEmployee(employee);
        setIsShowUpdateForm(true);
    };

    // Handle changes in the update form inputs
    let handleUpdateChange = (e) => {
        setSelectedEmployee((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle form submission for updating employee
    let handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (!selectedEmployee || !selectedEmployee.id) {
            alert("Invalid employee data");
            return;
        }

        try {
            const response = await axios.put(
                `${api}/api/admin/update/${selectedEmployee.id}`,
                selectedEmployee,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                alert("Employee updated successfully");
                setEmployees((prevEmployees) =>
                    prevEmployees.map((emp) =>
                        emp.id === selectedEmployee.id ? { ...emp, ...selectedEmployee } : emp
                    )
                );
                setIsShowUpdateForm(false); // Close the update form after successful submission
            } else {
                alert("Failed to update employee");
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("Error updating employee. Please try again.");
        }
    };

    // Add Employee Form State
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        email: "",
        department: "",
        role: "",
        salary: "",
        img: "",
    });

    // Handle form submission for adding new employee
    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${api}/api/admin/addemployee`, newEmployee, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status === 200) {
                alert("Employee added successfully");
                fetchdata(); // Re-fetch the data to show the updated list
                setIsShowAddForm(false); // Close the add form after submission
            } else {
                alert("Failed to add employee");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Error adding employee. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <Navbar />
            <h1 className="text-center text-primary fw-bold mb-4" style={{ fontSize: "45px" }}>
                Welcome to Admin Dashboard
            </h1>

            {/* Search Bar Section */}
            <div className="row mb-4 justify-content-center">
                <div className="col-md-3">
                    <input
                        type="text"
                        placeholder="🔍 Search by Name..."
                        className="form-control rounded-pill shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        placeholder="🏢 Search by Department..."
                        className="form-control rounded-pill shadow-sm"
                        value={deptQuery}
                        onChange={(e) => setDeptQuery(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        placeholder="👔 Search by Role..."
                        className="form-control rounded-pill shadow-sm"
                        value={roleQuery}
                        onChange={(e) => setRoleQuery(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary rounded-pill w-100" onClick={fetchFilteredEmployees}>
                        Search
                    </button>
                </div>
            </div>

            <div className="row justify-content-center">
                {employees.length > 0 ? (
                    employees.map((employee, index) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                            <div className="card border-0 shadow-lg rounded-4 p-3" style={{ height: "100%", transition: "transform 0.3s ease-in-out" }}>
                                <img
                                    src={employee.img}
                                    className="card-img-top rounded-top"
                                    alt="Employee"
                                    style={{ height: "220px", objectFit: "cover" }}
                                />
                                <div className="card-body text-center">
                                    <h4 className="card-title fw-bold text-dark">{employee.name}</h4>
                                    <p className="card-text">
                                        <span className="badge bg-primary text-white me-2">{employee.department}</span>
                                        <span className="badge bg-secondary">{employee.role}</span>
                                    </p>
                                    <p className="text-muted mb-1">
                                        <i className="fas fa-envelope"></i> {employee.email}
                                    </p>
                                    <p className="fw-bold text-success">
                                        <i className="fas fa-rupee-sign"></i> ₹{employee.salary}
                                    </p>
                                    <div className="d-flex justify-content-around mt-3">
                                        <button
                                            className="btn btn-danger px-4 fw-bold shadow-sm"
                                            onClick={() => deleteemp(employee.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-warning px-4 fw-bold shadow-sm"
                                            onClick={() => showUpdateForm(employee)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <div className="border-3 border-dashed border-primary border-opacity-25 rounded-4 p-5">
                            <i className="fas fa-users fs-1 text-primary opacity-25 mb-3"></i>
                            <h4 className="fw-semibold text-primary opacity-75">No employees found</h4>
                            <p className="text-muted">Add new employees to see them listed here</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Employee Button */}
            <div className="text-center mb-4">
                <button className="btn btn-success rounded-pill px-5" onClick={() => setIsShowAddForm(true)}>
                    Add Employee
                </button>
            </div>

            {/* Add Employee Form */}
            {isShowAddForm && (
                <form onSubmit={handleAddSubmit} className="p-4 shadow rounded-4 bg-light" style={{ marginTop: 30 }}>
                    <h3 className="text-center text-primary">Add Employee</h3>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={newEmployee.name}
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={newEmployee.email}
                            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Department</label>
                        <input
                            type="text"
                            name="department"
                            className="form-control"
                            value={newEmployee.department}
                            onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <input
                            type="text"
                            name="role"
                            className="form-control"
                            value={newEmployee.role}
                            onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            className="form-control"
                            value={newEmployee.salary}
                            onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image URL</label>
                        <input
                            type="text"
                            name="img"
                            className="form-control"
                            value={newEmployee.img}
                            onChange={(e) => setNewEmployee({ ...newEmployee, img: e.target.value })}
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success px-5">Add Employee</button>
                        <button type="button" className="btn btn-danger ms-3" onClick={() => setIsShowAddForm(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Update Employee Form */}
            {isshowupdateform && selectedEmployee && (
                <form onSubmit={handleUpdateSubmit} className="p-4 shadow rounded-4 bg-light" style={{ marginTop: 30 }}>
                    <h3 className="text-center text-primary">Update Employee</h3>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={selectedEmployee.name}
                            onChange={handleUpdateChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={selectedEmployee.email}
                            onChange={handleUpdateChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Department</label>
                        <input
                            type="text"
                            name="department"
                            className="form-control"
                            value={selectedEmployee.department}
                            onChange={handleUpdateChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <input
                            type="text"
                            name="role"
                            className="form-control"
                            value={selectedEmployee.role}
                            onChange={handleUpdateChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            className="form-control"
                            value={selectedEmployee.salary}
                            onChange={handleUpdateChange}
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning px-5">Update Employee</button>
                        <button type="button" className="btn btn-danger ms-3" onClick={() => setIsShowUpdateForm(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
