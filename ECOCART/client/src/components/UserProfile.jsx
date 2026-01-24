// src/components/UserProfile.jsx
import React from "react";
import profilePic from "../assets/profile.jpg";

function UserProfile({ user }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body text-center">
        <img
          src={profilePic}
          alt="User Profile"
          className="rounded-circle mb-3 border"
          style={{ width: "120px" }}
        />
        <h4 className="fw-bold">{user.fullname}</h4>
        <p className="text-muted mb-1">🌟 Eco Champion</p>
        <p className="mb-1">
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
