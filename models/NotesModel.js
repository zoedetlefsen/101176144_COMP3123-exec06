const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    noteTitle: String,
    noteDescription: String,
    priority: {
        type: String,
        enum: ['HIGH', 'LOW', 'MEDIUM']
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('note', noteSchema);