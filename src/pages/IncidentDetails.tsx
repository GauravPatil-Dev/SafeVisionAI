import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Simple modal component
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full relative overflow-auto max-h-full" style={{ maxHeight: '80vh' }}>
        {children}
        <button onClick={onClose} className="absolute top-1 right-1 text-lg p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
          &times; {/* Stylish close button */}
        </button>
      </div>
    </div>
  );
};

// Mock data for incident frames
const mockFrames = [
  { id: 1, url: '/frames_dummy/fight1-0193.jpg' },
  { id: 2, url: '/frames_dummy/fight1-0194.jpg' },
  { id: 3, url: '/frames_dummy/fight1-0195.jpg' },
  { id: 4, url: '/frames_dummy/fight1-0196.jpg' },
  { id: 5, url: '/frames_dummy/fight1-0197.jpg' },
  { id: 6, url: '/frames_dummy/fight1-0198.jpg' },
  { id: 7, url: '/frames_dummy/fight1-0199.jpg' },
  { id: 8, url: '/frames_dummy/fight1-0200.jpg' },
  { id: 9, url: '/frames_dummy/fight1-0201.jpg' },
  { id: 10, url: '/frames_dummy/fight1-0201.jpg' },
  { id: 11, url: '/frames_dummy/fight1-0201.jpg' },
  { id: 12, url: '/frames_dummy/fight1-0201.jpg' },
  { id: 13, url: '/frames_dummy/fight1-0201.jpg' },
  { id: 14, url: '/frames_dummy/fight1-0201.jpg' },
];

const IncidentDetails = () => {
  const [frames] = useState(mockFrames);
  const [incident, setIncident] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch incident details
    const fetchIncidentDetails = async () => {
      const mockIncident = {
        id: id || '',
        timestamp: '2023-05-10 09:30',
        location: 'Site A',
        type: 'Safety Violation',
        severity: 'High'
      };
      setIncident(mockIncident);
    };

    fetchIncidentDetails();
  }, [id]);

  const handleAcknowledge = async () => {
    if (!incident) return;

    const summary = `${incident.type} incident occurred at ${incident.location} on ${incident.timestamp}. Severity: ${incident.severity}.`;
    const assignedTo = 'John Doe';
    const assignment = {
      id: Date.now(),
      incidentId: incident.id,
      summary,
      assignedTo,
      status: 'Assigned'
    };

    console.log('Created assignment:', assignment);
    navigate(`/assignment/${assignment.id}`);
  };

  if (!incident) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Incident Details</h2>
      <div className="mb-4">
        <p><strong>Timestamp:</strong> {incident.timestamp}</p>
        <p><strong>Location:</strong> {incident.location}</p>
        <p><strong>Type:</strong> {incident.type}</p>
        <p><strong>Severity:</strong> {incident.severity}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Incident Frames</h3>
        <img
          src={frames[0].url}
          alt={`Incident frame ${frames[0].id}`}
          className="w-1/4 cursor-pointer"
          onClick={() => setModalOpen(true)}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {frames.map((frame) => (
            <img key={frame.id} src={frame.url} alt={`Incident frame ${frame.id}`} className="w-full h-auto rounded" />
          ))}
        </div>
      </Modal>
      <button
        onClick={handleAcknowledge}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Acknowledge Incident
      </button>
    </div>
  );
};

export default IncidentDetails;
