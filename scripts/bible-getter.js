const fs = require('fs')
const request = require('request');
const oneTimers = require('./helpers/one-timers')
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
let Verse = require('./models/verses-model')


// TODO: Make the request to BibleGetaway/BibleAPI
//     TODO: Make mongoDB object from one request
//     TODO: change link 
//

// const versions =['ESV', 'KJV', 'NIV']
const versionIds = {
    KJV: 'de4e12af7f28f599-02'
 }

const booksRaw = fs.readFileSync('/home/deyan/Dev-projects/Bible-to-DB/scripts/jsons/books.json')
const versionssRaw = fs.readFileSync('/home/deyan/Dev-projects/Bible-to-DB/scripts/jsons/versions.json')
const books = JSON.parse(booksRaw).books;
const versions  = JSON.parse(versionssRaw).versions;
let downloaded = {
    chapters: 0,
    books: 0,
    verses: 0
}


function downloadLoggerAdd(addToLog) {
    switch (addToLog) {
        case 'chapter':
            downloaded.chapters = downloaded.chapters + 1;
        case 'verse':
            downloaded.verses = downloaded.chapters + 1;
        case 'book':
            downloaded.chapters = downloaded.chapters + 1;
        default:
    }
}

// while loop for each book
let fillDb = async function(bookNumber) {
    let version = versions.engKJV;
    let versionId = version.id;
    let {name: bookName, id: bookId, chaptersLength} = books[bookNumber]

    // TODO: try to find a way to fill the whole DB with all books
    let makeRequest = async (currentChapter=1) => {
        oneTimers.getVersesAsync(versionId, `${bookId}.${currentChapter}`)
        .then(async (verses) => {
            // TODO: Add loop to go through all chapters of a book and get each chapter number
            verses.forEach( (verse, index) => {
                let dbVerse ={
                    version: version.abbreviation,
                    book: bookName,
                    chapter: currentChapter,
                    verseNumber: index + 1,
                    content: verse
                }
                
                downloadLoggerAdd('verse')
                Verse.create(dbVerse)
            })
            
            downloadLoggerAdd('chapter')
            if (currentChapter < chaptersLength) {
                await makeRequest(currentChapter+1)
                    .then(() => console.log(`Finished request for chapter: ${currentChapter+1}`))
                    .catch(console.error)
            } else {
                console.log(`All ${chaptersLength} chapters of ${bookName} have been requested!`);
                downloadLoggerAdd('book')
            }
        })
        .catch(console.error)
    }
    makeRequest();
}
// fillDb()

const uri = 'mongodb+srv://deyan:vRR4h8GKfgxJdPOs@bibles.smqdt.mongodb.net/Bible-versions'
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db}`));
};

async function startDb() {
    let connection;
    try {
        console.log('Connecting to DB...');
        connection = await mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});
        console.log(`Connected.\n Running at port: ${Verse.db.port}`);
        
        // console.log(Verse.db.host); // localhost
        // console.log(model.db.port); // 27017
        // console.log(Verse.db.name); // myDatabase
        // console.log(await Verse.find());

        for (let bookNumber = 0; bookNumber < books.length; bookNumber++) {
            fillDb(bookNumber)
        }
    }
    catch (error) {
        console.error(error);
    }
    // await client.connect();
}

// startDb();

oneTimers.countChapters();

