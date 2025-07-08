import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCategory.css';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/add_category', { category })
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/category');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="add-category-container">
      <div className="form-box">
        <h2 className="form-title">Add Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Department Name</label>
            <input
              type="text"
              name="category"
              placeholder="Enter Department"
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <button className="submit-btn" type="submit">Add Department</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
