const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ver dbVerse = {
    // version:
    // book:
    // chapter:
    // num:
    // content:
// }
let test = {
    "_id":{"$oid":"5f3e7f106ff075d6baf79b50"},
    "version":"KJV",
    "book":"Genesis",
    "chapter":{"$numberInt":"50"},
    "num":{"$numberInt":"26"},
    "content":"26 So Joseph died, <i class=\"add\">being</i> an hundred and ten years old: and they embalmed him, and he was put in a coffin in Egypt."
}

const verseSchema = new Schema({
    version: {
        type: String,
        required: true,
    },
    book: {
        type: String,
        required: true,
    },
    chapter: {
        type: Number,
        required: true,
    },
    verseNumber: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    versionKey: false 
});

// Thir parameter is needed 
const Verse = mongoose.model('ESV', verseSchema, 'ESV');

module.exports = Verse;