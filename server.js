const express = require('express');
const path = require('path');
const fs = require('fs');
const notesArray = [];
const db = require('./db/db.json');
const htmlRoutes = require('./Routes/html');
// define port
const PORT = process.env.PORT || 3001;
// starts express
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// connects to html routes file
app.use(htmlRoutes);

// Get notes - happens on page load
app.get('/api/notes', (req, res) => {
    const notesArray = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')));
    res.send(notesArray);
});

// Create a note
app.post('/api/notes', (req, res) => {
    const notesArray = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json")));
    const newNote = req.body;
    newNote.id = (notesArray.length + 1).toString();
    notesArray.push(newNote);
    fs.writeFileSync(path.join(__dirname,"./db/db.json"), JSON.stringify(notesArray))
        res.json(notesArray);
    });

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
    const notesArray = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json")));
    const deleteNote = notesArray.filter((noteBgon) => noteBgon.id !== req.params.id)
    fs.writeFileSync(path.join(__dirname,"./db/db.json"), JSON.stringify(deleteNote))
        res.json(deleteNote);
});
// start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});