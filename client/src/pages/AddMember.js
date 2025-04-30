import React, { useState } from 'react';
import axios from 'axios';
import './AddMember.css';
import { useNavigate } from 'react-router-dom';

function AddMember() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    regNumber: '',
    degreeStream: '',
    hobbies: '',
    image: null
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('role', formData.role);
    payload.append('email', formData.email);
    payload.append('regNumber', formData.regNumber);
    payload.append('degreeStream', formData.degreeStream);
    payload.append('hobbies', formData.hobbies);
    payload.append('image', formData.image);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/members`, payload);
      setMessage('✅ Member added successfully!');
      setTimeout(() => navigate('/members'), 1500);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add member. Make sure all fields are filled.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Member</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="regNumber" placeholder="Registration Number" onChange={handleChange} required />
        <input type="text" name="degreeStream" placeholder="Degree Stream" onChange={handleChange} required />
        <input type="text" name="hobbies" placeholder="Hobbies" onChange={handleChange} required />
        <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default AddMember;
