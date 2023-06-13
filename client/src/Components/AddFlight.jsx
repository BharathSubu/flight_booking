import React, { useState } from "react";
import { get, post, put } from "../utils/Network";

const AddFlight = () => {
  const [flightData, setFlightData] = useState({
    name: "",
    from: "",
    to: "",
    departureDateTime: "",
    arrivalDateTime: "",
    price: 0,
    maxcapacity: 60,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in flightData) {
      if (flightData[key] === "" || flightData[key] === 0) {
        alert("Please fill in all fields");
        return;
      }
    }
    console.log(flightData);
    // Reset the form after submission
    try {
      const response = await post("admin/addflight", flightData);
      alert(response.message);
      setFlightData({
        name: "",
        from: "",
        to: "",
        departureDateTime: "",
        arrivalDateTime: "",
        price: 0,
        maxcapacity: 60,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding flight:", error);
    }
  };

  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white p-4">
      <h2 className="text-xl font-bold mb-4">Add Flight</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name of the Flight
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={flightData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
            placeholder="Flight Name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="from"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            From
          </label>
          <input
            type="text"
            id="from"
            name="from"
            value={flightData.from}
            onChange={handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
            placeholder="From"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="to"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            To
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={flightData.to}
            onChange={handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
            placeholder="To"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="departureDateTime"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Departure Date and Time
          </label>
          <input
            type="datetime-local"
            id="departureDateTime"
            name="departureDateTime"
            value={flightData.departureDateTime}
            onChange={handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="arrivalDateTime"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Arrival Date and Time
          </label>
          <input
            type="datetime-local"
            id="arrivalDateTime"
            name="arrivalDateTime"
            value={flightData.arrivalDateTime}
            onChange={handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={flightData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
            placeholder="Price"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="maxcapacity"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Max Capacity
          </label>
          <input
            type="number"
            id="maxcapacity"
            name="maxcapacity"
            value={flightData.maxcapacity}
            onChange={handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
            placeholder="Max Capacity"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Flight
        </button>
      </form>
    </div>
  );
};

export default AddFlight;
