import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const incidentsData = [
  { id: 1, timestamp: '2023-05-05 14:30', location: 'Warehouse B', type: 'Physical Altercation', status: 'Resolved' },
  { id: 2, timestamp: '2023-05-04 11:15', location: 'Main Entrance', type: 'Verbal Dispute', status: 'Under Investigation' },
  { id: 3, timestamp: '2023-05-03 09:45', location: 'Assembly Line A', type: 'Suspicious Behavior', status: 'False Alarm' },
];

const ViolenceDetection = () => {
  const [incidents, setIncidents] = useState(incidentsData);
  const navigate = useNavigate();

  const handleViewDetails = (id: number) => {
    navigate(`/incident/${id}`);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Violence/Accident Detection</h2>
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{incident.timestamp}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{incident.location}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{incident.type}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${incident.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {incident.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
                <button
                  onClick={() => handleViewDetails(incident.id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViolenceDetection;
