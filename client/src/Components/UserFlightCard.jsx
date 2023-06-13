import React from "react";
import { get, post, put } from "../utils/Network";

const UserFlightCard = (data) => {
  const { email, flight, count } = data.flight;
  console.log(data);
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
    try {
      const body = {
        email: email,
        count: count,
        flightname: name,
      };
      const response = await post("admin/cancelbooking", body);
      if (response.status) {
        window.location.reload();
        alert("Booking canceled successfully");
      } else {
        alert("Failed to cancel booking");
      }
    } catch (error) {
      console.error("An error occurred while canceling the booking:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-5">
      <h2 className="text-lg font-bold mb-2">{name}</h2>
      <p className="mb-2">
        {from} to {to}
      </p>
      <p className="mb-2">
        Departure: {new Date(departureDateTime).toLocaleString()} --- Arrival:{" "}
        {new Date(arrivalDateTime).toLocaleString()}
      </p>
      <p className="mb-2">Booked by: {email}</p>
      <p className="mb-2">Total number of tickets: {count}</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCancelBooking}
      >
        Cancel Booking
      </button>
    </div>
  );
};

export default UserFlightCard;
