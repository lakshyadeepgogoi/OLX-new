import React from 'react';
import logo from '../../assets/logoDark.jpeg'; // Adjust the path according to your project structure

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-200 z-50">
      <div className="flex items-center justify-center animate-pulse">
        <div className="bg-white p-8 rounded-full shadow-lg">
          <img src={logo} alt="Logo" className="h-16 w-16" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
