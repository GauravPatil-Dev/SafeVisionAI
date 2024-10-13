import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AlertManagement from './pages/AlertManagement';
import IncidentDetails from './pages/IncidentDetails';
import AssignmentTracking from './pages/AssignmentTracking';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      
        {/* <Sidebar /> */}
        <div className="flex-1 p-15">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<AlertManagement />} />
            <Route path="/incident/:id" element={<IncidentDetails />} />
            <Route path="/assignment/:id" element={<AssignmentTracking />} />
          </Routes>
        </div>
     
    </Router>
  );
}

export default App;