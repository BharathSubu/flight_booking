import React, { useEffect } from "react";
import FlightCard from "./FlightCard";
import AdminFlightcard from "./AdminFlightcard";
import UserFlightCard from "./UserFlightCard";

const FlightCards = ({ flights, isUser }) => {
  return (
    <div className="m-8 mb-40">
      {isUser === "user"
        ? flights.map((flight) => (
            <FlightCard key={flight.flight._id} flight={flight} isUser="user" />
          ))
        : isUser === "public"
        ? flights.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))
        : isUser === "admin"
        ? flights.map((flight) => (
            <AdminFlightcard key={flight._id} flight={flight} />
          ))
        : flights.map((flight) => (
            <UserFlightCard key={flight.flight._id} flight={flight} />
          ))}
    </div>
  );
};

export default FlightCards;
