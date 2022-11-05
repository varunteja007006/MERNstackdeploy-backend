const { default: mongoose } = require("mongoose");
const Workout = require("../models/workoutModels");

//get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workout.find({ user_id}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

//get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  //validate if fields are empty
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill the necessary fields", emptyFields });
  }
  //add doc to DB
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  //pass two objects into findOneAndUpdate , find criteria & which has to be updated
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

//export the actions
module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
