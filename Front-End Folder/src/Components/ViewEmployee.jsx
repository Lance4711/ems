import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewEmployee.css';
import { useParams } from 'react-router-dom';

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:5000/detail/${id}`)
      .then((res) => {
        if (res.data.length === 0) {
          setError('Employee not found');
        } else {
          setEmployee(res.data[0]); // Fix: get first object
        }
      })
      .catch((err) => {
        setError('Employee not found or server error');
      });
  }, [id]);

  if (error) {
    return <div className="view-container"><h2>{error}</h2></div>;
  }

  if (!employee) {
    return <div className="view-container"><h2>Loading employee data...</h2></div>;
  }
  return (
    <div className="view-container">
      <div className="view-card">
        <img src={`http://localhost:5000/uploads/${employee.image}`} alt="Employee" />
        <h3>{employee.name}</h3>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Address:</strong> {employee.address}</p>
        <p><strong>Salary:</strong> ₹{employee.salary}</p>
        <p><strong>Department (category_id):</strong> {employee.category_id}</p>
      </div>
    </div>
  );
};

export default ViewEmployee;
