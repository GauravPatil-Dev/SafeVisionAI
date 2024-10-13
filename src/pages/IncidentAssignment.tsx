import React, { useState } from 'react';
import { format } from 'date-fns';

const IncidentAssignment = () => {
  const [incidents, setIncidents] = useState([
    { 
      id: 1, 
      timestamp: new Date(), 
      type: 'Safety Gear Violation', 
      location: 'Site A - Building 2',
      summary: 'Worker observed without proper safety helmet in restricted area.',
      assignedTo: 'John Doe',
      status: 'Pending'
    },
    { 
      id: 2, 
      timestamp: new Date(Date.now() - 3600000), 
      type: 'Potential Violence', 
      location: 'Site B - Parking Lot',
      summary: 'Verbal altercation detected between two individuals near the main entrance.',
      assignedTo: 'Jane Smith',
      status: 'In Progress'
    },
  ]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setIncidents(incidents.map(incident => 
      incident.id === id ? { ...incident, status: newStatus } : incident
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Incident Assignment and Tracking</h1>
      
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Timestamp</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Summary</th>
            <th className="py-2 px-4 border-b">Assigned To</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(incident => (
            <tr key={incident.id}>
              <td className="py-2 px-4 border-b">{format(incident.timestamp, "yyyy-MM-dd HH:mm:ss")}</td>
              <td className="py-2 px-4 border-b">{incident.type}</td>
              <td className="py-2 px-4 border-b">{incident.location}</td>
              <td className="py-2 px-4 border-b">{incident.summary}</td>
              <td className="py-2 px-4 border-b">{incident.assignedTo}</td>
              <td className="py-2 px-4 border-b">{incident.status}</td>
              <td className="py-2 px-4 border-b">
                <select 
                  value={incident.status}
                  onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentAssignment;