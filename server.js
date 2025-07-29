require('dotenv').config(); 
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const PORT = process.env.PORT || 5000;
const http = require('http').createServer(app)
const authRoutes = require('./routes/authRoutes');
const houseRoutes = require('./routes/houseRoutes');
const managerRoutes = require('./routes/managerRoutes');
const issueRoutes = require('./routes/issueRoutes');

app.use(cors())
app.use(bodyParser.json())
app.use('/api/auth', authRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/issues', issueRoutes);


const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  databaseName: process.env.DB_NAME,
});
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('DB connection error:', err));