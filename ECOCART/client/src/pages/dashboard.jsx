// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserProfile from '../components/UserProfile';
import EcoTips from '../components/EcoTips/EcoTips';
import ScoreCircle from '../components/ScoreCircle/ScoreCircle';
import Badges from '../components/Badges/Badges';
import './dashboard.css';

function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch('/api/dashboard', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          setError('Unauthorized — logging out...');
          logout();
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }

        const { fullname, email } = await res.json();
        console.log({fullname , email});
        setUser({ fullname, email });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [token, logout]);

  if (!token) return <p>Please log in to view your dashboard.</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading user data...</p>;

  return (
    <>
      <main className="container my-5">
        <div className="row g-4">
          <aside className="col-lg-4">
            <UserProfile user={user} />
            <EcoTips />
          </aside>
          <section className="col-lg-8">
            <div className="mb-4">
              <h3 className="fw-bold">
                Welcome back, <span className="text-success">{user.fullname}!</span>
              </h3>
              <p className="lead text-muted">
                Great to see you again.
              </p>
            </div>
            <ScoreCircle score={78} maxScore={100} />
            <Badges />
            <button className="btn btn-outline-danger mt-4" onClick={logout}>
              Logout
            </button>
          </section>
        </div>
      </main>
      <footer className="text-center py-3 bg-light">
        &copy; 2025 Eco Mart. All rights reserved.
      </footer>
    </>
  );
}

export default Dashboard;
