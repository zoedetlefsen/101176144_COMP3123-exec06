const express = require('express');
const NoteModel = require('../models/NotesModel');

const routes = express.Router();

// Create a new Note
routes.post('/notes', async (req, res) => {
    try {
        const newNote = new NoteModel({
            ...req.body
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({
            message: "Error creating the note",
            error: err
        });
    }
});

// Retrieve all Notes
routes.get('/notes', async (req, res) => {
    try {
        const noteList = await NoteModel.find({});
        res.status(200).json(noteList);
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving notes",
            error: err
        });
    }
});

// Retrieve a single Note with noteId
routes.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await NoteModel.findById(req.params.noteId);
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving note",
            error: err
        });
    }
});

// Update a Note with noteId
routes.put('/notes/:noteId', async (req, res) => {

    try {
        const updatedNote = await NoteModel.findByIdAndUpdate(
            req.params.noteId,
            { content: req.body.content },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json({
            message: "Error updating note",
            error: err
        });
    }
});

// Delete a Note with noteId
routes.delete('/notes/:noteId', async (req, res) => {
    try {
        const note = await NoteModel.findByIdAndRemove(req.params.noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({
            message: "Error deleting note",
            error: err
        });
    }
});

module.exports = routes;
