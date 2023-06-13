import React, { useState, useEffect } from 'react';
 
import { get, post, put } from "../utils/Network";

const SearchBar = ({ onSearch  }) => {
  const [flightName, setFlightName] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [options, setOptions] = useState({
    flightNames: [],
    fromLocations: [],
    toLocations: [],
  });

  useEffect( () => {  
        const fetchData = async () => {
          try { 
            const response = await get('user/getItems');
            const { flightNames, fromLocations, toLocations } = response;
            setOptions({ flightNames, fromLocations, toLocations });
           
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();      
  }, []);



  const handleSearch = async (e) => {
    e.preventDefault();

    if (!flightName && !fromLocation && !toLocation && !departureDate) {
      onSearch("user/searchflights" );
      return;
    }

    if (flightName || fromLocation || toLocation || departureDate) {
      const requestBody = {};

if (flightName !== '') {
  requestBody.flightName = flightName;
}

if (fromLocation !== '') {
  requestBody.fromLocation = fromLocation;
}

if (toLocation !== '') {
  requestBody.toLocation = toLocation;
}

if (departureDate !== '') {
  requestBody.departureDate = departureDate;
}
      onSearch("user/searchflights" , requestBody);
    }
    setFlightName('');
    setFromLocation('');
    setToLocation('');
    setDepartureDate('');
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSearch}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flightName">
              Flight Name
            </label>
            <select
              id="flightName"
              className="w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
              value={flightName}
              onChange={(e) => setFlightName(e.target.value)}
            >
              <option value="">Select Flight</option>
              {options.flightNames.map(flight => (
                <option value={flight} key={flight}>{flight}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromLocation">
              From
            </label>
            <select
              id="fromLocation"
              className="w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
            >
              <option value="">Select From Location</option>
              {options.fromLocations.map(location => (
                <option value={location} key={location}>{location}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toLocation">
              To
            </label>
            <select
              id="toLocation"
              className="w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
            >
              <option value="">Select To Location</option>
              {options.toLocations.map(location => (
                <option value={location} key={location}>{location}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departureDate">
              Departure Date and Time
            </label>
            <input
              type="datetime-local"
              id="departureDate"
              className="w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
