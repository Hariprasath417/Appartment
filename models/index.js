const mongoose = require('mongoose')

const db = {}
db.mongoose = mongoose
db.User = require('./User').User;
db.Flat = require('./Flat').Flat;
db.House = require('./House').House;
db.Issue = require('./Issue').Issue;

module.exports = db;