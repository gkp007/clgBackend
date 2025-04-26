import mongoose from "mongoose";

const interestFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  course: { type: String, required: true },
  batch: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
});

export const InterestForm =
  mongoose.models.InterestForm ||
  mongoose.model("InterestForm", interestFormSchema);
