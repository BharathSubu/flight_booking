import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="relative flex  items-center justify-center h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute w-full h-full bg-gradient-to-b from-blue-200 via-blue-400 to-blue-900 opacity-75 animate-sea-wave-1"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 opacity-75 animate-sea-wave-3 mix-blend-multiply filter blur-2xl"></div>
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 opacity-75 animate-sea-wave-2 mix-blend-multiply filter blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
