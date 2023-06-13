import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
const Arflights = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 opacity-100 overflow-hidden">
        <div className="w-full h-30 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-600 py-4 flex  justify-center">
        <h3 className="mt-10 text-white text-center text-4xl font-bold">
          Add/Remove Flights!
        </h3>
        </div>
        <div className="flex flex-col h-screen">
        <div className="flex flex-row justify-spacearound">
          
        </div>
        </div>
      </div>
    </div>
  );
};

export default Arflights;
