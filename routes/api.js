const db = require("../models")

module.exports = function (app) {
// to return all documents in a collection, omit this parameter or pass an empty document ({}).
//GET
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });
    //stats
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).limit(5)
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });
//Post
    app.post("/api/workouts", (req, res) => {
    db.Workout.create({ day: Date.now() })  // today day when created
        .then(workout => {
            res.json(workout);
        }).catch(err => {
            res.json(err);
        });
});

//PUT
app.put("/api/workouts/:id", (req, res) => {

    db.Exercise.create(req.body)
        .then((data) => db.Workout.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: {
                    exercises: data._id
                },
            },
            { new: true })
        )
        .then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
});
}
