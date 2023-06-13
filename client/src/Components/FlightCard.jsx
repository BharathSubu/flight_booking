import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post, put } from "../utils/Network";

const FlightCard = ({ flight, isUser }) => {
  let count = 0;
  if (isUser) {
    count = flight.count;
    flight = flight.flight;
  }

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

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleCancelBooking = async () => {
    const email = localStorage.getItem("user");

    const data = {
      email: email,
      flightname: name,
    };

    try {
      const response = await post("user/cancelflight", data);
      if (response.status) {
        alert("Flight Cancelled successfully!");
        window.location.reload();
      } else {
        alert("Failed to Cancel flight. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleBookFlight = async () => {
    const email = localStorage.getItem("user");

    if (!email) {
      alert("Please log in");
      navigate("/login", { replace: true });
      return;
    }

    const data = {
      email: email,
      flightname: name,
      count: quantity,
    };

    try {
      const response = await post("user/bookflight", data);
      if (response.status) {
        alert("Flight booked successfully!");
        window.location.reload();
        navigate("/home", { replace: true });
      } else {
        alert("Failed to book flight. Please try again or use User Login.");
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
        {!isUser && (
          <p className="text-gray-700 mb-4">
            Capacity: {currcapacity}/{maxcapacity}
          </p>
        )}
        <p className="text-gray-700 mb-4">Price: ${price}</p>
        {isUser && (
          <p className="text-gray-700 mb-4">Total Price: ${price * count}</p>
        )}

        {!isUser ? (
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <div className="flex items-center border border-gray-300 py-1 px-2 rounded leading-tight focus:outline-none focus:border-blue-500">
              <button
                onClick={handleDecrement}
                className="text-gray-500 focus:outline-none"
              >
                -
              </button>
              <span className="px-2">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="text-gray-500 focus:outline-none"
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 mb-4">Total tickets: {count}</p>
        )}
        <div className="flex justify-between">
          <div></div> {/* Empty div to push the content to the left */}
          {isUser ? (
            <button
              onClick={handleCancelBooking}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel Booking
            </button>
          ) : (
            <button
              onClick={handleBookFlight}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Book {quantity} {quantity === 1 ? "Ticket" : "Tickets"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
