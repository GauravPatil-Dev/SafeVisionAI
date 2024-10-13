import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

// Mock data for assignments
const mockAssignments = [
  { id: 1, incidentId: 101, summary: 'Safety Violation at Site A: An employee was observed working at height without proper fall protection equipment. This is a serious violation of our safety protocols and requires immediate attention. The specific location was the north-east corner of the construction site, near the newly erected scaffolding.', assignedTo: 'John Doe', status: 'In Progress', date: '2023-05-10' },
  { id: 2, incidentId: 102, summary: 'Equipment Failure at Site B: The main crane experienced a hydraulic system failure during operation. No injuries reported, but this has caused significant delays in the project timeline. A thorough inspection and repair of the crane is required before it can be put back into service.', assignedTo: 'Jane Smith', status: 'Assigned', date: '2023-05-11' },
  { id: 3, incidentId: 103, summary: 'Potential Violence at Site C: A heated argument between two subcontractors escalated to threats of physical violence. The situation was defused by the site supervisor, but tensions remain high. This incident highlights the need for conflict resolution training and a review of our subcontractor management policies.', assignedTo: 'Mike Johnson', status: 'Completed', date: '2023-05-09' },
  { id: 4, incidentId: 104, summary: 'Safety Gear Violation at Site A: Multiple workers were observed not wearing proper eye protection in the welding area. This is a recurring issue that needs to be addressed through reinforced training and potentially disciplinary measures for repeat offenders.', assignedTo: 'John Doe', status: 'In Progress', date: '2023-05-12' },
  { id: 5, incidentId: 105, summary: 'Fire Hazard at Site B: An accumulation of flammable materials was discovered near an electrical panel. This creates a significant fire risk and violates several safety codes. Immediate cleanup is required, followed by a review of material storage practices across all sites.', assignedTo: 'Jane Smith', status: 'Assigned', date: '2023-05-13' },
];

const AssignmentTracking = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSummary, setSelectedSummary] = useState('');

  useEffect(() => {
    // In a real application, fetch assignments from an API
    // setAssignments(fetchedAssignments)
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setAssignments(assignments.map(assignment =>
      assignment.id === id ? { ...assignment, status: newStatus } : assignment
    ));
    // In a real app, update the status in the backend
  };

  const filteredAndSortedAssignments = assignments
    .filter(assignment => 
      (filterStatus === 'all' || assignment.status === filterStatus) &&
      (assignment.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
       assignment.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Assignment Tracking</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Search className="text-gray-400" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2 w-64"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All Statuses</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              <button className="flex items-center" onClick={() => handleSort('id')}>
                ID {sortField === 'id' && (sortDirection === 'asc' ? <ChevronUp className="ml-1" /> : <ChevronDown className="ml-1" />)}
              </button>
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              <button className="flex items-center" onClick={() => handleSort('summary')}>
                Summary {sortField === 'summary' && (sortDirection === 'asc' ? <ChevronUp className="ml-1" /> : <ChevronDown className="ml-1" />)}
              </button>
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              <button className="flex items-center" onClick={() => handleSort('assignedTo')}>
                Assigned To {sortField === 'assignedTo' && (sortDirection === 'asc' ? <ChevronUp className="ml-1" /> : <ChevronDown className="ml-1" />)}
              </button>
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              <button className="flex items-center" onClick={() => handleSort('status')}>
                Status {sortField === 'status' && (sortDirection === 'asc' ? <ChevronUp className="ml-1" /> : <ChevronDown className="ml-1" />)}
              </button>
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              <button className="flex items-center" onClick={() => handleSort('date')}>
                Date {sortField === 'date' && (sortDirection === 'asc' ? <ChevronUp className="ml-1" /> : <ChevronDown className="ml-1" />)}
              </button>
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedAssignments.map((assignment) => (
            <tr key={assignment.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{assignment.id}</td>
              <td className="px-6 py-4 border-b border-gray-200">
                <button 
                  className="text-blue-600 hover:underline"
                  onClick={() => setSelectedSummary(assignment.summary)}
                >
                  {assignment.summary.length > 100 
                    ? `${assignment.summary.substring(0, 100)}...` 
                    : assignment.summary}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{assignment.assignedTo}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  assignment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  assignment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {assignment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{assignment.date}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
                <select 
                  value={assignment.status} 
                  onChange={(e) => handleStatusChange(assignment.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedSummary && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Full Summary</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  {selectedSummary}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setSelectedSummary('')}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentTracking;