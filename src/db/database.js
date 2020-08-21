require('dotenv').config();
const mongoose = require('mongoose');
const Users = require('../models/users');

async function myDbConnection() {

  try {
    mongoose.set('useNewUrlParser',true);
    mongoose.set('useCreateIndex',true);  
    const uri = process.env.DB_URI;
    let connectionPromise = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    if (mongoose.connection) {
        console.log('Connected Successfully to DB')
        global.connectionPromise = connectionPromise;
    } else { global.connectionPromise = null; 
            console.log('not connected to DB') }
    return connectionPromise;
  } catch (error) {
      console.log('Error connecting to DB ::', error);
  }
}

module.exports = myDbConnection();
