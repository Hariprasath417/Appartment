const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema({
  houseNumber: { type: String, required: true },
  flat: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

const House = mongoose.model("House", houseSchema,"House");

module.exports = { House }