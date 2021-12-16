const router = require('express').Router()
const fs = require('fs')
const util = require('util')

const {
  v1:uuidv1
} = require ("uuid")

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function read() {
  return readFileAsync("db/db.json", "utf8")
}

function write(note) {
  return writeFileAsync('db/db.json', JSON.stringify(note))
}

router.get('/notes', (req, res) => {
  read().then((notes) => {
    var parsedNotes = JSON.parse(notes) || [];
    return parsedNotes;
  })
  .then((notes) => 
  res.json(notes))
  .catch((err) =>
    res.status(500).json(err)
  )
})

router.post('/notes', (req, res) => {
  const {title, text} = req.body
  if(!title || !text) {
    throw new Error ('Note title and text cannot be empty')
  }
  const newNote = {title, text, id: uuidv1()};
  read().then((notes) => {
    var parsedNotes = JSON.parse(notes) || [];
    return parsedNotes;
  }).then((notes) => {
    notes.push(newNote)
    return write(notes)
  })
  .then(() => newNote)
  .then((notes)=> {
    res.json(notes)
  })
  .catch((err) =>
    res.status(500).json(err)
  )
})

router.delete('/notes/:id', (req, res) => {
  read().then((notes) => {
    var parsedNotes = JSON.parse(notes) || [];
    return parsedNotes;
  }).then((notes) => notes.filter((note) => note.id !== req.params.id))
  .then((filteredNotes) => write(filteredNotes))
  .then(() => res.json({ok: true}))
  .catch((err) =>
    res.status(500).json(err)
  )
})

module.exports = router;