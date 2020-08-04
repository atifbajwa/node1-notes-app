const chalk = require('chalk')
const fs = require('fs')

// adding notes into notes.json
const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title )

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        savedNotes(notes)
        console.log(chalk.green.inverse('New notes added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!')) 
    }
        
}

// remvoe notes from notes.json
const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        savedNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

// listing notes from notes.json
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))
    notes.forEach( note => {
        console.log(note.title)
    });
}

// read notes from notes.json
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

// saved notes into notes.json 
const savedNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// loading notes from notes.json
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
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote,
}