const mongoose = require("mongoose");
const randomString = require("randomstring");

const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },

  shortUrl: {
    type: String,
    required: true,
    default: randomString.generate(7),
  },
});

module.exports = mongoose.model("urlSchema", urlSchema);
