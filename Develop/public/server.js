const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT =  process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

var test = "this route works"

// route for index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

// route for notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/notes.html"));
});

// route for reading the db.json file
app.get("/api/notes", (req, res) => res.json(test));

// route for posting to the db.json file
app.post("/api/notes", (req, res) => {
    var test2 = req.body;
    console.log(test2);
});

app.listen(PORT, function () {
    console.log(`The port is listening to ${PORT}`)
})