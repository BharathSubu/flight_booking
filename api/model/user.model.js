const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  aadhar: {
    type: String,
    default: null,
    unique: true,
  },
  mobile: {
    type: String,
    default: null,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    immutable: false,
  },
  flights: [
    {
      name: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("User", User);
