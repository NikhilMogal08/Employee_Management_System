import React, { useEffect, useState } from "react";
import axios from "axios";
import EmpDashNav from './EmpDashNav';

export default function EmployeeDash() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deptQuery, setDeptQuery] = useState("");
  const [roleQuery, setRoleQuery] = useState("");

  const api = "http://51.20.63.117:8081/Employee_Management_System_3-3.2.2";

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${api}/employee/all`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchFilteredEmployees = async () => {
    try {
      let url = `${api}/employee/all`;
      if (searchQuery.trim()) {
        url = `${api}/employee/findbyname/${searchQuery}`;
      } else if (deptQuery.trim()) {
        url = `${api}/employee/findbydept/${deptQuery}`;
      } else if (roleQuery.trim()) {
        url = `${api}/employee/findbyrole/${roleQuery}`;
      }
      const response = await axios.get(url);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching filtered employees:", error);
    }
  };

  return (
    <div className="container mt-5">
      <EmpDashNav />
      <h1 className="text-center text-primary fw-bold mb-4">Employee Dashboard</h1>

      {/* Search Section */}
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
          <button
            className="btn btn-primary rounded-pill w-100"
            onClick={fetchFilteredEmployees}
          >
            Search
          </button>
        </div>
      </div>

      {/* Employees Section */}
      <div className="row">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={employee.id}>
              <div className="card shadow-sm rounded-4 overflow-hidden">
                <img
                  src={
                    employee.img && employee.img !== ""
                      ? employee.img
                      : ""
                  }
                  alt="Employee"
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{employee.name}</h5>
                  <p className="text-muted mb-1">{employee.email}</p>
                  <div className="d-flex justify-content-center gap-3 mb-3">
                    <span className="badge text-bg-primary">{employee.department}</span>
                    <span className="badge text-bg-success">{employee.role}</span>
                  </div>
                  <div className="bg-light border rounded p-2">
                    <p className="mb-1 text-muted">Monthly Salary</p>
                    <h6 className="text-success">₹{employee.salary.toLocaleString()}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="border-dashed border rounded-4 p-5">
              <i className="fas fa-users fs-1 text-primary opacity-25 mb-3"></i>
              <h4 className="fw-semibold text-primary opacity-75">No employees found</h4>
              <p className="text-muted">Add new employees to see them listed here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
