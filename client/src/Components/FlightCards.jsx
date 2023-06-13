import React, { useEffect } from "react";
import FlightCard from "./FlightCard";

const FlightCards = ({ flights, isUser }) => {
  return (
    <div className="m-8 mb-40">
      {isUser
        ? flights.map((flight) => (
          <FlightCard key={flight.flight._id} flight={flight} isUser={true}/>
        ))
        : flights.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
    </div>
  );
};

export default FlightCards;
