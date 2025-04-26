const mongoose = require("mongoose");

const interestFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  course: { type: String, required: true },
  batch: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
});

const InterestForm = mongoose.models.InterestForm || mongoose.model("InterestForm", interestFormSchema);

module.exports = { InterestForm }; 