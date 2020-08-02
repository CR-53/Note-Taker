const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT =  process.env.PORT || 3000;

//Reading static file inside public folders
app.use(express.static(__dirname + '/Develop/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

var storedNotes = JSON.parse(fs.readFileSync("Develop/db/db.json"));

// route for notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/Develop/public/notes.html"));
});


// route for reading the db.json file
app.get("/api/notes", (req, res) => {
    return res.json(storedNotes);
});

// route for posting to the db.json file
app.post("/api/notes", (req, res) => {
    var newNote = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        title: req.body.title,
        text: req.body.text
    } 
    storedNotes.push(newNote);
    fs.writeFileSync("Develop/db/db.json", JSON.stringify(storedNotes));
    res.end();
});

// route for reading the db.json file
app.delete("/api/notes/:id", (req, res) => {
    // stores the id of the selected note to delete
    var selectedNoteId = req.params.id;
    // finds where the index of where id of the selected note to delete matches inside of the database
    var selectedNoteIndex = storedNotes.findIndex(note => note.id === selectedNoteId);
    // removes the selected note to delete using the index found above
    storedNotes.splice(selectedNoteIndex, 1); 
    // rewrites the updated database to the page
    fs.writeFileSync("Develop/db/db.json", JSON.stringify(storedNotes));
    res.end();
});

// route for index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/Develop/public/index.html"));
});

app.listen(PORT, function () {
    console.log(`The port is listening to ${PORT}`)
})