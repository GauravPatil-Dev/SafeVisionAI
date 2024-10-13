import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';

// Mock data for incidents
const mockIncidents = [
  { id: 1, timestamp: '2023-05-10 09:30', location: 'Site A', type: 'Safety Violation', severity: 'High' },
  { id: 2, timestamp: '2023-05-10 10:15', location: 'Site B', type: 'Potential Violence', severity: 'Critical' },
  { id: 3, timestamp: '2023-05-10 11:00', location: 'Site A', type: 'Equipment Failure', severity: 'Medium' },
];

const AlertManagement = () => {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();

  const handleAcknowledge = async (id: number) => {
    const incident = incidents.find(inc => inc.id === id);
    if (!incident) return;

    // Generate summary (in a real app, this would be done by an AI model)
    const summary = `${incident.type} incident occurred at ${incident.location} on ${incident.timestamp}. Severity: ${incident.severity}.`;

    // Assign to authority (in a real app, this would be based on incident type and severity)
    const assignedTo = 'John Doe';

    // Create assignment
    const assignment = {
      id: Date.now(),
      incidentId: id,
      summary,
      assignedTo,
      status: 'Assigned'
    };

    // In a real app, save the assignment to the backend
    console.log('Created assignment:', assignment);

    // Remove the incident from the list
    setIncidents(incidents.filter(inc => inc.id !== id));

    // Navigate to the assignment tracking page
    navigate(`/assignment/${assignment.id}`);
  };

  const filteredIncidents = filterType === 'all' 
    ? incidents 
    : incidents.filter(incident => incident.type.toLowerCase() === filterType);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Alert Management</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="safety violation">Safety Violation</option>
              <option value="potential violence">Potential Violence</option>
              <option value="equipment failure">Equipment Failure</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Export CSV
        </button>
      </div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Severity
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredIncidents.map((incident) => (
            <tr key={incident.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {incident.timestamp}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {incident.location}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {incident.type}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  incident.severity === 'High' ? 'bg-red-100 text-red-800' :
                  incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {incident.severity}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
                <button
                  onClick={() => navigate(`/incident/${incident.id}`)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  View Frames
                </button>
                <button
                  onClick={() => handleAcknowledge(incident.id)}
                  className="text-green-600 hover:text-green-900"
                >
                  Acknowledge
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertManagement;