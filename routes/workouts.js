const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require('../middleware/requireAuth')

//express router
const router = express.Router();

//Middleware 
router.use(requireAuth)
//Middleware is fired before the below functions

//get all workouts
router.get("/", getWorkouts);

//get a single workout
router.get("/:id", getWorkout);

//post a new workout
router.post("/", createWorkout);

//delete a workout
router.delete("/:id", deleteWorkout);

//Update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
