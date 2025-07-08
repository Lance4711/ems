import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EmployeeDetail.css'; // Add this line

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/employee/detail/' + id)
      .then(result => {
        setEmployee(result.data[0]);
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Employee Management System</h4>
      </div>
      <div className='employee-detail-container'>
        <img
          src={`http://localhost:3000/Images/${employee.image}`}
          className='emp-detail-image'
          alt={employee.name}
        />
        <div className='employee-detail-info'>
          <h3><strong>Name:</strong> {employee.name}</h3>
          <h3><strong>Email:</strong> {employee.email}</h3>
          <h3><strong>Address:</strong> {employee.address}</h3>
          <h3><strong>Salary:</strong> ₹{employee.salary}</h3>
          <div className='employee-buttons'>
            <button className='btn btn-primary me-2'>Edit</button>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
