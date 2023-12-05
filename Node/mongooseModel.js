const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  courses: { type: String, required: true },
  whyTAMUCC: { type: String, required: true },
  // For file fields, you might want to store file paths or identifiers to retrieve the files.
  tenthCertificate: { type: String, required: true },
  twelfthCertificate: { type: String, required: true },
  bTechCertificate: { type: String, required: true },
  covidCertificate: { type: String, required: true },
  passport: { type: String, required: true },
  ds160Form: { type: String, required: true }
});

const Details = mongoose.model('Details', detailsSchema);

module.exports = Details;
