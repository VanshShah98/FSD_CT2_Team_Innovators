import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewMembers.css';

function ViewMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/members`);
        setMembers(res.data);
      } catch (err) {
        console.error('Error fetching members:', err);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="members-container">
      <div className="top-nav">
        <Link to="/" className="nav-btn">🏠 Home</Link>
        <Link to="/add" className="nav-btn">➕ Add Member</Link>
      </div>

      <h2>Team Members</h2>
      <div className="members-grid">
        {members.map((member) => (
          <div key={member._id} className="member-card">
            <img
              src={`${process.env.REACT_APP_API_URL.replace('/api', '')}/uploads/${member.image}`}
              alt={member.name}
            />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <Link to={`/members/${member._id}`} className="view-btn">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewMembers;
