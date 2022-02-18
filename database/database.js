const { json } = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
module.exports = () => {
    mongoose.connect(process.env.DATABASE_URL);

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
      });
      mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
        return json({code: 2, msg: err.message});
      });

    mongoose.Promise = global.Promise;
}
