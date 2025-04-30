import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header>
        <h1>🚀 Team Innovators</h1>
        <p>Welcome to the Student Team Members Management App</p>
      </header>

      <div className="nav-buttons">
        <Link to="/add" className="btn">➕ Add Member</Link>
        <Link to="/members" className="btn">👥 View Members</Link>
      </div>
    </div>
  );
}

export default Home;
