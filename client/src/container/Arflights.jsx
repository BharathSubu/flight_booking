import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import AddFlight from "../Components/AddFlight";
import FlightCards from "../Components/FlightCards";
import { get, post, put } from "../utils/Network";

const Arflights = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (path) => {
    const response = await get(path);
    setSearchResults(response.flights);
  };
  useEffect(() => {
    handleSearch("admin/getallflights");
  }, []);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 opacity-100 overflow-hidden mt-10">
        <div className="w-full h-30 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-600 py-4 flex  justify-center">
          <h3 className="mt-10 text-white text-center text-4xl font-bold">
            Add/Remove Flights!
          </h3>
        </div>
        <div className="flex flex-col h-screen mt-10">
          <div className="flex flex-row justify-spacearound">
            <div className="mx-10  h-screen  overflow-y-scroll">
              <div>
                <AddFlight />
                <div className=" mb-40"></div>
              </div>
            </div>
            <div
              className="pb-2 flex-1 h-screen overflow-y-scroll "
              ref={scrollRef}
            >
              {searchResults && (
                <FlightCards flights={searchResults} isUser="admin" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arflights;
