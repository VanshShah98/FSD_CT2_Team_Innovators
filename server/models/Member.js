const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  regNumber: String,
  degreeStream: String,
  hobbies: String,
  image: String
});

module.exports = mongoose.model('Member', memberSchema);
