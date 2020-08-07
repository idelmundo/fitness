const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(logger("dev"));

require("./routes/html.js")(app, path)
require("./routes/api.js")(app)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// Listen 
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});