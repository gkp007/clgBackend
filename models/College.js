const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: String,
  location: String,
  courses: [String],
  rating: Number,
  description: String,
  establishedYear: Number,
  facilities: [String],
  contact: {
    email: String,
    phone: String,
    address: String,
  },
  website: String,
});

const College = mongoose.model("College", collegeSchema);

module.exports = { College }; 