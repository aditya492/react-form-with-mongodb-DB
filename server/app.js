const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
// require("./db/conn");

dotenv.config({ path: "./config.env" });

app.use(express.json());
// const DB =
//   "mongodb+srv://aditya:aditya123@cluster0.mww3u.mongodb.net/mern?retryWrites=true&w=majority";

// const User = require("./model/userSchema");
const DB = process.env.DATABASE;
const PORT = process.env.PORT;

//we link the router file to make our route  easy

app.use(require("./router/auth"));

require("./db/conn"); //yhis is database connictivity from conn. file bwelow line from 23 can be writtern as ths line both are same.

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("MongoDB Connection Successful!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//Middleware
const middleware = (req, res, next) => {
  console.log("my middleware");
  next();
};

// app.get("/", (req, res) => {
//   res.send("welcome! Server Connected");
// });

app.listen(PORT, () => {
  console.log("Welcome!server is running!");
});

// mongodb+srv://aditya:<password>@cluster0.mww3u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
