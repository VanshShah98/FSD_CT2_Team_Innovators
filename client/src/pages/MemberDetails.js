import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './MemberDetails.css';

function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/members/${id}`);
        setMember(res.data);
      } catch (err) {
        console.error('Error fetching member details:', err);
      }
    };

    fetchMember();
  }, [id]);

  if (!member) return <div>Loading...</div>;

  return (
    <div className="member-details-container">
      <Link to="/members" className="back-btn">← Back to Members</Link>
      <div className="member-card">
        <img
          src={`${process.env.REACT_APP_API_URL.replace('/api', '')}/uploads/${member.image}`}
          alt={member.name}
        />
        <h2>{member.name}</h2>
        <p><strong>Role:</strong> {member.role}</p>
        <p><strong>Email:</strong> {member.email}</p>
        <p><strong>Registration Number:</strong> {member.regNumber}</p>
        <p><strong>Degree Stream:</strong> {member.degreeStream}</p>
        <p><strong>Hobbies:</strong> {member.hobbies}</p>
      </div>
    </div>
  );
}

export default MemberDetails;
