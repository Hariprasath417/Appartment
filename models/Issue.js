const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
  description: { type: String },
  raisedBy: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['owner', 'tenant'], required: true }
  },
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'House', required: true },
  status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' }
}, { timestamps: true });

const Issue = mongoose.model("Issue", issueSchema,"Issue");

module.exports = { Issue }