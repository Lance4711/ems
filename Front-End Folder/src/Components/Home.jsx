import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import { FaUserShield, FaUsers, FaMoneyBill, FaEdit, FaTrash } from 'react-icons/fa'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setEmployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    fetchAdminCount()
    fetchEmployeeCount()
    fetchSalaryCount()
    fetchAdminRecords()
  }, [])

  const fetchAdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
  }

  const fetchAdminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        }
      })
  }

  const fetchEmployeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee)
        }
      })
  }

  const fetchSalaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp)
        } else {
          alert(result.data.Error)
        }
      })
  }

  return (
    <div className="home-container">
      <div className="dashboard-header">
        <h1><FaUserShield className="icon" /> Employee Management System</h1>
        <p></p>
      </div>

      <div className="cards-container">
        <div className="stat-card bg-teal">
          <FaUsers className="stat-icon" />
          <h3>Total Employees</h3>
          <hr />
          <p><span>{employeeTotal}</span></p>
        </div>
        <div className="stat-card bg-yellow">
          <FaUserShield className="stat-icon" />
          <h3>Total Admins</h3>
          <hr />
          <p><span>{adminTotal}</span></p>
        </div>
        <div className="stat-card bg-red">
          <FaMoneyBill className="stat-icon" />
          <h3>Monthly Pay</h3>
          <hr />
          <p><span>₹{salaryTotal}</span></p>
        </div>
      </div>

      <div className="admin-list">
        <h3>Admin Users</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a, index) => (
              <tr key={index}>
                <td>{a.email}</td>
                <td>
                  <button className="edit-btn"><FaEdit /> Edit</button>
                  <button className="delete-btn"><FaTrash /> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
