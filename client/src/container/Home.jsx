import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import SearchBar from "../Components/SearchBar";
import { get, post, put } from "../utils/Network";
import FlightCards from "../Components/FlightCards";

const Home = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
   
    const handleSearch = async (path , body = null) => {
      const response = await post(path,body);
      setSearchResults(response.flights);
    };
    useEffect(() => {
      handleSearch('user/searchflights',null);
    }, []);
    useEffect(() => {
      scrollRef.current.scrollTo(0, 0);
    });

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 opacity-100 overflow-hidden">
        <div className="w-full h-30 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-600 py-4 flex  justify-center">
        <h3 className="mt-10 text-white text-center text-4xl font-bold">
          Book your tickets with ease, with Ticker Booking!
        </h3>
        </div>
        <div className="flex flex-col h-screen">
        <div className="flex flex-row justify-spacearound">
          <div className="m-5">
          <SearchBar onSearch={handleSearch}  /></div>
          <div className="pb-2 flex-1 h-screen overflow-y-scroll " ref={scrollRef}>
          <FlightCards  flights={searchResults} isUser={false}/></div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
