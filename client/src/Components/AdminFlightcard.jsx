import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post, put } from "../utils/Network";

const AdminFlightcard = ({ flight }) => {
  const {
    name,
    from,
    to,
    price,
    currcapacity,
    maxcapacity,
    departureDateTime,
    arrivalDateTime,
  } = flight;

  const handleCancelBooking = async () => {
    const data = {
      name: name,
    };

    try {
      const response = await post("admin/deleteflight", data);
      if (response.status) {
        alert(response.message);
        window.location.reload();
      } else {
        alert("Failed to Cancel flight. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white mb-10">
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 mb-2">
          {from} - {to}
        </p>
        <p className="text-gray-700 mb-4">
          Departure: {new Date(departureDateTime).toLocaleString()}
        </p>
        <p className="text-gray-700 mb-4">
          Arrival: {new Date(arrivalDateTime).toLocaleString()}
        </p>

        <p className="text-gray-700 mb-4">
          Capacity: {currcapacity}/{maxcapacity}
        </p>

        <p className="text-gray-700 mb-4">Price: ${price}</p>

        <p className="text-gray-700 mb-4">
          Total tickets booked: {currcapacity}
        </p>

        <div className="flex justify-between">
          <div></div> {/* Empty div to push the content to the left */}
          <button
            onClick={handleCancelBooking}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete FLight
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFlightcard;
