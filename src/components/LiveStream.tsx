import React, { useEffect, useState } from 'react';
import socket from '../socket';

const LiveStream: React.FC = () => {
  const [frame, setFrame] = useState<string>('');
  //const [plotData, setPlotData] = useState<string>('');
  const [violenceScore, setViolenceScore] = useState<number>(0);

  useEffect(() => {
    // Start the live stream when the component mounts
    socket.emit('start_stream');

    // Listen for frame updates
    socket.on('frame', (data: any) => {
      setFrame('data:image/jpeg;base64,' + data.frame);
    });

    // Listen for violence score updates
    socket.on('violence_score', (data: any) => {
      setViolenceScore(data.score);
    });

    // Listen for violence alerts
    socket.on('violence_alert', (data: any) => {
      alert(`Violence detected! Score: ${data.score.toFixed(2)}`);
    });

    // Clean up on component unmount
    return () => {
      // Stop the live stream
      socket.emit('stop_stream');

      // Remove event listeners
      socket.off('frame');
      socket.off('plot_update');
      socket.off('violence_score');
      socket.off('violence_alert');
    };
  }, []);

  return (
    <div>
      <div className="aspect-video bg-black relative">
      {frame ? (
       <img
       src={frame}
       alt="Live Frame"
       className="absolute top-0 left-0 w-full h-full object-cover"
     />

      ) : (
        <p>Loading live stream...</p>
      )}
      </div>
    </div>
  );
};

export default LiveStream;
