// components/LiveFeedPlot.tsx
import React, { useEffect, useState } from 'react';
import socket from '../socket';

const LiveFeedPlot: React.FC = () => {
  const [plotData, setPlotData] = useState<string>('');

  useEffect(() => {
    // Listen for plot updates
    socket.on('plot_update', (data: any) => {
      setPlotData('data:image/png;base64,' + data.plot_data);
    });

    // Cleanup
    return () => {
      socket.off('plot_update');
    };
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold">Violence Analysis Plot</h3>
      {plotData ? (
        <img src={plotData} alt="Violence Plot"   style={{ width: '100%', maxWidth: '800px', height: 'auto' }} />
      ) : (
        <p>Loading plot...</p>
      )}
    </div>
  );
};

export default LiveFeedPlot;
