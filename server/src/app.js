const express = require("express");
const app = express();
const server = app.listen(8080, function() {
  console.log("server is running on http://localhost:8080");
});

const io = require("./socket")(server)

// const mongoose = require("mongoose");
// const mongoDB = "mongodb://localhost/my_database";
// mongoose.connect(mongoDB, {
//   useNewUrlParser: true
// });
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
