const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const ContactUsForm = mongoose.models.ContactUsForm || mongoose.model("ContactUsForm", ContactUsSchema);

module.exports = { ContactUsForm }; 