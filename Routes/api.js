const router = require('express').Router();
const notesArray = require('../db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
router.get('/api/notes', (req, res) => {
    try {
        res.json(notesArray)
        
    } catch (error) {
       res.json(error) 
    }
});

router.post('/api/notes', (req, res) => {
    const newNote = {title: req.body.title, text: req.body.text, id: uuidv4()}
    try {
        notesArray.push(newNote).then(newArray => {
            fs.writeFileSync("../db.json", newArray);
            res.json({ msg: 'success' })
        })
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;