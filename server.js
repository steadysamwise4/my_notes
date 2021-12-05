const express = require('express');
const path = require('path');
const fs = require('fs');
const notesArray = [];
const db = require('./db/db.json');

// Helper method for generating unique ids
// const uuid = require('./helpers/uuid');

const htmlRoutes = require('./Routes/html');
// const apiRoutes = require('./Routes/api');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(htmlRoutes);
// app.use(apiRoutes);

app.get('/api/notes', (req, res) => {
    const notesArray = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')));
    console.log(notesArray);
    res.send(notesArray);
});

app.post('/api/notes', (req, res) => {
    const notesArray = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json")));
    const newNote = req.body;
    newNote.id = (notesArray.length + 1).toString();
    notesArray.push(newNote);
    fs.writeFileSync(path.join(__dirname,"./db/db.json"), JSON.stringify(notesArray))
        res.json(notesArray);
    });

app.delete('/api/notes/:id', (req, res) => {
    const notesArray = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json")));
    const deleteNote = notesArray.filter((noteBgon) => noteBgon.id !== req.params.id)
    fs.writeFileSync(path.join(__dirname,"./db/db.json"), JSON.stringify(deleteNote))
        res.json(deleteNote);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});