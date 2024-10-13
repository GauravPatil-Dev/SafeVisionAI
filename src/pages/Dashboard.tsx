import React, { useState } from 'react';
import axios from 'axios';
import { Bell, Camera, ChevronDown, HardHat, Shield, User } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import AlertManagement from './AlertManagement';
import ViolenceDetection from './ViolenceDetection';
import PerformanceMetrics from './PerformanceMetrics';
import LiveStream from '../components/LiveStream';
import LiveFeedPlot from './livefeedplot';

const cameras = [
  { id: 1, name: "Main Entrance" },
  { id: 2, name: "Assembly Line A" },
  { id: 3, name: "Warehouse B" },
];

const alerts = [
  { id: 1, type: "gear", count: 3 },
  { id: 2, type: "violence", count: 1 },
];

const complianceData = [
  { date: '2023-05-01', rate: 85 },
  { date: '2023-05-02', rate: 88 },
  { date: '2023-05-03', rate: 90 },
  { date: '2023-05-04', rate: 87 },
  { date: '2023-05-05', rate: 92 },
];

const violationData = [
  { type: 'Helmet', count: 15 },
  { type: 'Safety Vest', count: 10 },
  { type: 'Gloves', count: 8 },
  { type: 'Safety Boots', count: 5 },
];








const Dashboard = () => {
  const [selectedCamera, setSelectedCamera] = useState(cameras[0]);
  const [activeTab, setActiveTab] = useState('overview');


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex w-20 flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-gray-800">
            <div className="flex-1">
              <div className="flex items-center justify-center bg-gray-900 py-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <nav aria-label="Sidebar" className="flex flex-col items-center space-y-3 py-6">
                <button className="text-gray-400 hover:text-white">
                  <Camera className="h-6 w-6" />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <Bell className="h-6 w-6" />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <HardHat className="h-6 w-6" />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <User className="h-6 w-6" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">SafetyVision AI</h1>
            <div className="flex items-center">
              <span className="mr-4 text-sm text-gray-500">John Doe</span>
              <button className="text-gray-500 hover:text-gray-700">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <div className="mb-4">
            <nav className="flex space-x-4">
              {['overview', 'alerts', 'compliance', 'incidents', 'performance'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === tab
                      ? 'bg-gray-200 text-gray-800'
                      : 'text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Real-Time Monitoring Section */}
                <div className="col-span-2 bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">Live Feed</h2>
                    <select
                      value={selectedCamera.id}
                      onChange={(e) => setSelectedCamera(cameras.find(c => c.id === parseInt(e.target.value)) || cameras[0])}
                      className="border rounded p-1"
                    >
                      {cameras.map((camera) => (
                        <option key={camera.id} value={camera.id}>
                          {camera.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="aspect-video bg-black relative">
                    <LiveStream/>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow flex flex-col space-y-12">
                  {/* Active Alerts */}
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Active Alerts</h2>
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {alert.type === "gear" ? (
                              <HardHat className="h-5 w-5 text-yellow-500" />
                            ) : (
                              <Bell className="h-5 w-5 text-red-500" />
                            )}
                            <span className="capitalize">{alert.type}</span>
                          </div>
                          <span className="text-2xl font-bold">{alert.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Violence Analysis Plot */}
                  <div>
                    <LiveFeedPlot />
                  </div>
                </div>
              </div>


              <AlertManagement />

              {/* Safety Compliance Graphs */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h2 className="text-lg font-semibold mb-4">Safety Gear Compliance Rate</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={complianceData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        // Optionally format date if needed
                        tickFormatter={(value) => value}
                        angle={-45}
                        textAnchor="end"
                      />
                      <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="complianceRate" stroke="#8884d8" name="Compliance Rate" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h2 className="text-lg font-semibold mb-4">Safety Gear Violations by Type</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={violationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" tick={{ fontSize: 12 }} interval={0} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#82ca9d" name="Violation Count" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <ViolenceDetection />
              <PerformanceMetrics />
            </div>
          )}

          {activeTab === 'alerts' && <AlertManagement />}
          {activeTab === 'compliance' && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Safety Gear Compliance Rate</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={complianceData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#8884d8" name="Compliance Rate" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Safety Gear Violations by Type</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={violationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" tick={{ fontSize: 12 }} interval={0} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" name="Violation Count" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {activeTab === 'incidents' && <ViolenceDetection />}
          {activeTab === 'performance' && <PerformanceMetrics />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;