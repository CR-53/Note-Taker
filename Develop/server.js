const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT =  process.env.PORT || 3000;

//Reading static file inside public folders
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

var test = "this route works"


// route for notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});


// route for reading the db.json file
app.get("/api/notes", (req, res) => {
    res.json(test)
});

// route for posting to the db.json file
app.post("/api/notes", (req, res) => {
    var test2 = req.body;
    console.log(test2);
});

// route for reading the db.json file
app.delete("/api/notes:id", (req, res) => {
    res.json(test)
});

// route for index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(PORT, function () {
    console.log(`The port is listening to ${PORT}`)
})