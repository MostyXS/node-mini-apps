const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return "Your notes..."
}

const readNote = title => {
    const notes = loadNotes()
    const matchNote = notes.find(note => note.title === title)

    if(matchNote) {
        console.log(matchNote.body)
    } else {
        console.log(chalk.inverse.red("No notes with title " + title))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)
    
    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added"))
    } else {
        console.log(chalk.red.inverse("Note title taken!"))
    }
    
    
}

const removeNote = title => {
    const notes = loadNotes()
    const newNotes = notes.filter(note => note.title !== title)

    if(newNotes.length < notes.length) {
        saveNotes(newNotes)
        console.log(chalk.green.inverse("Note succesfully removed"))
    } else {
        console.log(chalk.red.inverse("There are no note with this title"))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if(notes.length !== 0){
        console.log(chalk.yellow("Your notes:"))
        notes.forEach(note => {
            console.log(chalk.inverse.green(note.title))
            console.log(note.body)
        });
        
    } else {
        console.log("You do not have any notes")
    }
}

const saveNotes = notes => {
    const notesString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesString)
}
const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}