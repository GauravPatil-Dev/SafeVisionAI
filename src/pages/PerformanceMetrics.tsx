import React from 'react';

const PerformanceMetrics = () => {
  const metrics = [
    { name: 'Model Accuracy', value: '95%' },
    { name: 'False Positive Rate', value: '2.3%' },
    { name: 'Average Processing Time', value: '150ms' },
    { name: 'CPU Usage', value: '65%' },
    { name: 'Memory Usage', value: '4.2GB' },
    { name: 'Network Latency', value: '25ms' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="border p-4 rounded">
            <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;