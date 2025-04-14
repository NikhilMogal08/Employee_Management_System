import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = "http://51.20.63.117:8081/Employee_Management_System_3-3.2.2";

  useEffect(() => {
    axios.get(`${api}/employee/all`)
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error occurred: " + error);
        setError("Failed to fetch employee data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary fw-bold mb-4" style={{ fontSize: "45px" }}>
        Admin Dashboard
      </h1>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Employee Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Salary</th>
            <th>img</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>{emp.salary}</td>
                <td>{emp.img}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No employees available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
