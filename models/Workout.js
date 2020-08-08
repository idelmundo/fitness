const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
totalDuration: {
    type: Number,
    default: 0
},
    day: Date,
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }]
 })


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

