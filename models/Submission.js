const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  fullName: String,
  mobileNumber: String,
  emailId: String,
  aadharNo: String,
  annualIncome: String,
  counsellor_no: String,
  How_did_you_hear_about_us: String,
  tenthPercentage: String,
  twelfthPercentage: String,
  graduation: String,
  interestedCollege: String,
  interestedStream: String,
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = { Submission }; 