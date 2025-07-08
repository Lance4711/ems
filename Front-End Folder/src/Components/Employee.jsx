import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Employee.css";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete("http://localhost:3000/auth/delete_employee/" + id)
        .then((result) => {
          if (result.data.Status) {
            setEmployee((prev) => prev.filter((emp) => emp.id !== id));
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h2>Employee List</h2>
        <Link to="/dashboard/add_employee" className="add-employee-btn">
          + Add Employee
        </Link>
      </div>
      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/${e.image}`}
                    alt="profile"
                    className="employee-image"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>₹{e.salary}</td>
                <td className="action-buttons">
                  <Link to={`/dashboard/view_employee/${e.id}`} className="view-btn">
                    View
                  </Link>
                  <Link to={`/dashboard/edit_employee/${e.id}`} className="edit-btn">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(e.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
