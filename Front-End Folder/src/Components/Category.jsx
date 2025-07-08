import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      axios.delete(`http://localhost:3000/auth/delete_category/${id}`)
        .then(res => {
          if (res.data.Status) {
            setCategory(prev => prev.filter(item => item.id !== id));
          } else {
            alert(res.data.Error);
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='category-container px-5 mt-3'>
      <div className='d-flex justify-content-center mb-3'>
        <h3 className='category-heading'>Departments List</h3>
      </div>
      <Link to="/dashboard/add_category" className='btn btn-success mb-3'>
        Add Department
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {category.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>
                <button
                  className='btn btn-danger btn-sm delete-btn'
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
