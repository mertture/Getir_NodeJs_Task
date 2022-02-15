const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
module.exports = () => {
    mongoose.connect(process.env.DATABASE_URL);

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
      });
      mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
      });

    mongoose.Promise = global.Promise;
}
