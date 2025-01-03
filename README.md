
# Real-Time Violence and Safety Violation Detection Frontend

This repository is the frontend for the Real-Time Violence and Safety Violation Detection System. It connects to the Flask backend using **Socket.IO** and provides an interactive interface for administrators to monitor, analyze, and manage incidents detected in real-time video streams. 

## Features

- **Real-Time Incident Monitoring**: Displays live alerts for detected violent incidents and safety gear violations.
- **Historical Data Analysis**: Enables users to review past incidents and analyze trends.
- **User Management**: Supports role-based access for various types of users.
- **Alert Management and Assignment**: Allows admins to manage alerts and assign incidents for review.
- **Interactive Dashboards**: Displays metrics and performance data related to incidents and violations.
- **Live Feed Plot**: Visualizes the live feed data and frame-by-frame incident updates.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [File Descriptions](#file-descriptions)
- [Future Enhancements](#future-enhancements)

---

## Installation

### Prerequisites

- **Node.js** and **npm** installed.
- **Socket.IO** client to communicate with the Flask backend.

### Clone the Repository

```bash
git clone https://github.com/GauravPatil-Dev/SafeVisionAI.git
cd SafeVisionAI
```

### Install Dependencies

```bash
npm install
```

---

## Usage

1. **Start the Frontend**: Run the following command to start the development server:
   ```bash
   npm start
   ```

2. **Connect to the Backend**:
   - The frontend is set up to connect to the backend via **Socket.IO** at `http://127.0.0.1:5000`.
   - Ensure that the Flask server is running on this URL. If the backend URL differs, update it in the `socket` configuration (see [Configuration](#configuration)).

3. **Navigate to the Web Interface**:
   - Open a browser and go to `http://localhost:3000` (or the port configured in your `package.json`) to access the frontend interface.

---

## Project Structure

```bash
SafeVisionAI/
│
├── src/                    # Main source directory
│   ├── components/         # Reusable components
│   ├── pages/              # Main pages for the app
│   ├── sockets/            # Socket connection management
│   └── App.tsx             # Main App entry point
│
├── public/                 # Static assets
├── package.json            # Project dependencies and scripts
└── README.md               # Documentation
```

---

## Configuration

### Socket.IO Connection

In `sockets/index.js`, configure the socket connection to your Flask server:

```javascript
import { io } from 'socket.io-client';

const socket = io('http://127.0.0.1:5000'); // Replace with your Flask server URL if different
debug: true
export default socket;
```

---

## File Descriptions

Below are the descriptions of the main files you provided:

### Components

1. **Dashboard.tsx** - Displays an overview of incidents, safety violations, and trends, allowing admins to quickly assess safety and security.

2. **UserManagement.tsx** - Manages user roles and access control, enabling administrators to add or modify users.

3. **AlertManagement.tsx** - Allows admins to view and manage alerts generated by the system, including acknowledging or dismissing alerts.

4. **AssignmentTracking.tsx** - Tracks assigned incidents, providing a clear view of assigned cases and review status.

5. **IncidentAssignment.tsx** - Manages the assignment of incidents to users, enabling efficient tracking and review processes.

6. **IncidentDetails.tsx** - Provides detailed information about each incident, displaying relevant frames and timestamps.

7. **PerformanceMetrics.tsx** - Visualizes system performance data, showing metrics such as detection accuracy and response times.

8. **HistoricalData.tsx** - Shows historical data of incidents, allowing for analysis over time.

9. **livefeedplot.tsx** - Displays a live plot of detected incidents, updating in real-time with incoming frames.

10. **ViolenceDetection.tsx** - Manages the real-time detection and processing of violent incidents using the LSTM model.

---

## Future Enhancements

- **Enhanced Data Visualization**: Add additional charts and plots for deeper data analysis and trends.
- **User Notifications**: Implement push notifications or email alerts for critical incidents.
- **Customization Options**: Allow users to set custom thresholds and preferences for incident alerts.
- **Improved Mobile Responsiveness**: Ensure the application is fully functional on mobile devices.

---

## Troubleshooting

1. **Socket Connection Errors**:
   - Verify that the Flask backend is running on the specified URL and port.
   - Check the network configuration if accessing remotely.

2. **Dependency Issues**:
   - Run `npm install` to ensure all dependencies are installed.

3. **Performance Optimization**:
   - For large data sets, consider implementing pagination or data compression.

---

## Contributors

- **[Gaurav Patil]** - Developer
- **[Manish Reddy]** - Developer
- **[Pratima Yadav]** - Developer
- **[Shubham Das]** - Developer


This project is a crucial part of a real-time monitoring system aimed at enhancing workplace safety and security. Contributions are welcome, and feel free to submit issues or feature requests.