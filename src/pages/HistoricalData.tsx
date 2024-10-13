import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HistoricalData = () => {
  const [dateRange, setDateRange] = useState({ start: '2024-03-01', end: '2024-03-31' });
  const [safetyData] = useState([
    { date: '2024-03-01', compliance: 85, incidents: 3 },
    { date: '2024-03-08', compliance: 88, incidents: 2 },
    { date: '2024-03-15', compliance: 90, incidents: 1 },
    { date: '2024-03-22', compliance: 92, incidents: 2 },
    { date: '2024-03-29', compliance: 91, incidents: 1 },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Historical Data Analysis</h1>
      
      <div className="mb-4">
        <label className="mr-2">Date Range:</label>
        <input 
          type="date" 
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="border p-1 mr-2"
        />
        <input 
          type="date" 
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="border p-1"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Safety Compliance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={safetyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="compliance" stroke="#8884d8" name="Compliance Rate (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Incident Frequency</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={safetyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="incidents" stroke="#82ca9d" name="Number of Incidents" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;