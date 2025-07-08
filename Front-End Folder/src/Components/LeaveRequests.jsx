import React, { useState, useEffect } from 'react';
import './LeaveRequests.css'; // External CSS

const dummyLeaves = [
  { id: 1, name: 'Rajesh Kumar', date: '2025-07-02', reason: 'Family emergency', status: 'Pending' },
  { id: 2, name: 'Suresh Mehta', date: '2025-07-05', reason: 'Medical', status: 'Pending' },
  { id: 3, name: 'Anita Singh', date: '2025-07-08', reason: 'Vacation', status: 'Pending' },
];

const LeaveRequests = () => {
  const [requests, setRequests] = useState(() => {
    const stored = localStorage.getItem('leaveRequests');
    return stored ? JSON.parse(stored) : dummyLeaves;
  });

  useEffect(() => {
    localStorage.setItem('leaveRequests', JSON.stringify(requests));
  }, [requests]);

  const updateStatus = (id, newStatus) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
  };

  return (
    <div className="leave-container">
      <h2 className="leave-heading">Leave Requests</h2>
      {requests.map(req => (
        <div key={req.id} className="leave-card">
          <div><strong>Name:</strong> {req.name}</div>
          <div><strong>Date:</strong> {req.date}</div>
          <div><strong>Reason:</strong> {req.reason}</div>
          <div><strong>Status:</strong> 
            <span className={`status ${req.status.toLowerCase()}`}>
              {req.status}
            </span>
          </div>
          {req.status === 'Pending' && (
            <div className="leave-actions">
              <button className="approve-btn" onClick={() => updateStatus(req.id, 'Approved')}>Approve</button>
              <button className="reject-btn" onClick={() => updateStatus(req.id, 'Rejected')}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeaveRequests;
