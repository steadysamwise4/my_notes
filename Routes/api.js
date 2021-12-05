const router = require('express').Router();
const notesArray = require('../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


router.get('/api/notes', (req, res) => {  
    res.sendFile(path.join(__dirname, '../db/db.json'));  
        // fs.readFileSync(path.join(__dirname, notesArray), "utf-8", (err, data) => {
        //     if (err) {
        //         res.status(500).end
        //     }
        // console.log(data);
        // });
});

router.post('/api/notes', (req, res) => {
    const notesArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
    const newNote = req.body;
    newNote.id = uuidv4();
    notesArray.push(newNote);
    fs.writeFileSync("../db/db.json", JSON.stringify(notesArray))
        res.json(notesArray);
    });

       
   
    


module.exports = router;