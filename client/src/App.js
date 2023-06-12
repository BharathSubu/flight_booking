import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LandingPage from "./container/LandingPage";
import Home from "./container/Home";
import Bookings from "./container/Bookings";
import Arflights from "./container/Arflights";
import Allbookings from "./container/Allbooking";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LandingPage />} />
        <Route path="/booking" element={<Bookings />} />
        <Route path="/arflights" element={<Arflights />} />
        <Route path="/allbookings" element={<Allbookings />} />

        <Route path="/*" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
