import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import { get, post, put } from "../utils/Network";
import FlightCards from "../Components/FlightCards";

const Bookings = () => { 
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async (path , body = null) => {
    const response = await post(path,body);
    console.log(response);
    setSearchResults(response.flights);
  };
  let isAdmin = "user";
  useEffect(() => {
    if(localStorage.getItem("isAdmin")){
      alert("Use User Login to Book/View Flights ");
      navigate("/home");
      return;
    }
    if (!localStorage.getItem("token")) {
      alert("Please Login");
      navigate("/login");
    }
    else{
      handleSearch(`user/getuserflights`,{email : localStorage.getItem("user")});
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 opacity-100 overflow-hidden">
        <div className="w-full h-30 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-600 py-4 flex  justify-center">
        <h3 className="mt-10 text-white text-center text-4xl font-bold">
          Your Bookings!
        </h3>
        </div>
        <div className="flex flex-col h-screen">
        <div className="flex flex-row justify-spacearound">
          <div className="pb-2 flex-1 h-screen overflow-y-scroll ">
          <FlightCards  flights={searchResults} isUser={true} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
