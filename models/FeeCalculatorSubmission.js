const mongoose = require("mongoose");

const feeCalculatorSubmissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cast: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    desiredCourse: { type: String, required: true },
    desiredCollege: { type: String, required: true },
    stateScholarship: { type: String, required: true },
    secondScholarship: { type: Number, required: true },
    totalFees: { type: Number, required: true },
    courseFee: { type: Number, required: true },
    stateScholarshipAmount: { type: Number, required: true },
    secondScholarshipAmount: { type: Number, required: true },
    submissionDate: { type: Date, default: Date.now }
});

const FeeCalculatorSubmission = mongoose.model("FeeCalculatorSubmission", feeCalculatorSubmissionSchema);

module.exports = { FeeCalculatorSubmission }; 