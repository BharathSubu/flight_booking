const express = require("express");
const User = require("../model/user.model");
const Flight = require("../model/flight.model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const middleware = require("../middleware");

router.route("/").get((req, res) => res.json("Your User Page Got it"));

//check if email is already present
router.route("/checkemail/:email").get(async (req, res) => {
  try {
    const result = await User.findOne({ email: req.params.email });
    if (result !== null) {
      return res.json({
        status: true,
        email: result["email"],
      });
    } else {
      return res.json({
        status: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

//search flights
router.route("/searchflights").get(async (req, res) => {
  const { date, flightname } = req.body;

  try {
    let flights = [];
    console.log(date + " " + flightname);
    if (date && flightname) {
      flights = await Flight.find({
        departureDateTime: {
          $gte: new Date(date),
          $lt: new Date(date).setDate(new Date(date).getDate() + 1),
        },
        name: flightname,
      });
    } else if (date) {
      flights = await Flight.find({
        departureDateTime: {
          $gte: new Date(date),
          $lt: new Date(date).setDate(new Date(date).getDate() + 1),
        },
      });
    } else if (flightname) {
      flights = await Flight.find({ name: flightname });
    }

    let response = {
      status: flights.length > 0,
      message: flights.length > 0 ? "Flights found" : "No flights found",
      flights: flights,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//get flights
router.route("/getflights").get(async (req, res) => {
  try {
    const flights = await Flight.find();
    const response = {
      status: true,
      message: "Flights have been retrieved",
      flights: flights,
    };
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//book ticket
router
  .route("/bookflight")
  .post(middleware.checkUserToken, async (req, res) => {
    const { email, flightname, count } = req.body;
    try {
      const user = await User.findOne({ email: email });
      const flight = await Flight.findOne({ name: flightname });

      const existingFlight = user.flights.find(
        (flight) => flight.name === flightname
      );

      if (existingFlight) {
        existingFlight.count += count;
      } else {
        user.flights.push({ name: flightname, count: count });
      }

      if (flight.currcapacity + count > flight.maxcapacity)
        return res.json({ message: "Maximum Capacity Reached", status: false });
      flight.currcapacity += count;

      await user.save();
      await flight.save();

      return res
        .status(200)
        .json({ message: "Ticket booked successfully", status: true });
    } catch (error) {
      console.log(error);
      return res.json({ error: "Internal Server Error" });
    }
  });

//cancelbooking
router
  .route("/cancelflight")
  .post(middleware.checkUserToken, async (req, res) => {
    const { email, flightname } = req.body;

    try {
      const user = await User.findOne({ email: email });

      const flight = await Flight.findOne({ name: flightname });

      const bookedFlight = user.flights.find(
        (flight) => flight.name === flightname
      );

      if (!bookedFlight) {
        return res.json({
          message: "Flight not booked by the user",
          status: false,
        });
      }

      flight.currcapacity -= bookedFlight.count;

      user.flights = user.flights.filter(
        (flight) => flight.name !== flightname
      );

      await user.save();
      await flight.save();

      return res
        .status(200)
        .json({ msg: "Flight cancelled successfully", status: true });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

//login function
router.route("/login").post(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      return res.status(403).json("Email/Password is incorrect");
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      let token = jwt.sign(
        { email: req.body.email, isAdmin: false },
        config.key,
        {}
      );
      return res.status(200).json({
        token: token,
        message: "success",
        status: true,
      });
    } else {
      return res.status(200).json({
        message: "Password is incorrect",
        status: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

//register function
router.route("/register").post(async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      password: hashedPassword,
      email: email,
    });

    await user
      .save()
      .then(() => {
        console.log("user registered");
        res
          .status(200)
          .json({ message: "User Successfully Registered", status: true });
      })
      .catch((err) => {
        res.json({ message: err, status: false });
      });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
