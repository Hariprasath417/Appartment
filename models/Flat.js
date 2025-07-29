const mongoose =  require('mongoose')

const flatSchema = new mongoose.Schema({
  name: { type: String ,enum: ['A','B'], required:true}
});

const Flat = mongoose.model("Flat",flatSchema,"Flat")

module.exports = { Flat }