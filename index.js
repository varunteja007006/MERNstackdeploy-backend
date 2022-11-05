require("dotenv").config();

const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const mongoose = require("mongoose");
//express app
const app = express();

//middlewares
app.use(express.json());

//Global middleware
app.use((req, res, next) => {
  //console.log(req.path, req.method);
  next();
});
app.use(cors())
//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//app.get("/", (req, res) => {
//  res.json({ msg: "Welcome!!" });
//});

//connect to DB
mongoose
  .connect(
    "mongodb+srv://admin:admin123@mernstack.yzzbe4o.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to MongoDB");
    //listen for requests on the port
    app.listen(process.env.PORT, () => {
      console.log("Running on port : ", process.env.PORT);
    });
  })

  .catch((error) => {
    console.log(error);
  });
