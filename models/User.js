const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['tenant', 'owner', 'manager'], required: true }
}, { timestamps: true });

const User = mongoose.model("User",UserSchema,"User")

module.exports = {User}