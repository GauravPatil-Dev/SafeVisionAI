import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle, Clock, Users, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <Home className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link to="/alerts" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <AlertTriangle className="inline-block mr-2" size={20} />
          Alert Management
        </Link>
        <Link to="/assignment/1" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <Clock className="inline-block mr-2" size={20} />
          Incident Assignment
        </Link>
        <Link to="/historical-data" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <BarChart2 className="inline-block mr-2" size={20} />
          Historical Data
        </Link>
        <Link to="/user-management" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <Users className="inline-block mr-2" size={20} />
          User Management
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;