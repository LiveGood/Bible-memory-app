const fs = require('fs')
// Matches all verses of a chapter returned from BibleGetaway
const regexString = /<\/sup>(.*?)<\/span|<\/span>(.*?)<\/span>/gm

// DONE: TODO: write all requests to a file
// DONE: TODO: Makke a looping requst to All Books, Chapters and verses to Bible Getaway async
'https://www.biblegateway.com/quicksearch/?quicksearch=Philippians+1&version=ESV'
// This will go on the front end later
const bibleBooks = [
	{name: 'Genesis', chapters: 50},
	{name: 'Exodus', chapters: 40},
	{name: 'Leviticus', chapters: 27},
	{name: 'Numbers', chapters: 36},
	{name: 'Deuteronomy', chapters: 34},
	{name: 'Joshua', chapters: 24},
	{name: 'Judges', chapters: 21},
	{name: 'Ruth', chapters: 4},
	{name: '1 Samuel', chapters: 31},
	{name: '2 Samuel', chapters: 24},
	{name: '1 Kings', chapters: 22},
	{name: '2 Kings', chapters: 25},
	{name: '1 Chronicles', chapters: 29},
	{name: '2 Chronicles', chapters: 36},
	{name: 'Ezra', chapters: 10},
	{name: 'Nehemiah', chapters: 13},
	{name: 'Eshter', chapters: 10},
	{name: 'Job', chapters: 42},
	{name: 'Psalms', chapters: 150},
	{name: 'Proverbs', chapters: 31},
	{name: 'Ecclesiastes', chapters: 12},
	{name: 'Song of Songs', chapters: 8},
	{name: 'Isaiah', chapters: 66},
	{name: 'Jeremiah', chapters: 52},
	{name: 'Lamentations', chapters: 5},
	{name: 'Ezekiel', chapters: 48},
	{name: 'Daniel', chapters: 12},
	{name: 'Hosea', chapters: 14},
	{name: 'Joel', chapters: 3},
	{name: 'Amos', chapters: 9},
	{name: 'Obadiah', chapters: 1},
	{name: 'Jonah', chapters: 4},
	{name: 'Micah', chapters: 7},
	{name: 'Nahum', chapters: 3},
	{name: 'Habakkuk', chapters: 3},
	{name: 'Zephaniah', chapters: 3},
	{name: 'Haggai', chapters: 2},
	{name: 'Zechariah', chapters: 14},
	{name: 'Malachi', chapters: 4},
	{name: 'Matthew', chapters: 28},
	{name: 'Mark', chapters: 16},
	{name: 'Luke', chapters: 24},
	{name: 'John', chapters: 21},
	{name: 'Acts', chapters: 28},
	{name: 'Romans', chapters: 16},
	{name: '1 Corinthians', chapters: 16},
	{name: '2 Corinthians', chapters: 13},
	{name: 'Galatians', chapters: 6},
	{name: 'Ephisians', chapters: 6},
	{name: 'Philippians', chapters: 4},
	{name: 'Colossians', chapters: 4},
	{name: '1 Thessalonians', chapters: 5},
	{name: '2 Thessalonians', chapters: 3},
	{name: '1 Timothy', chapters: 6},
	{name: '2 Timothy', chapters: 4},
	{name: 'Titus', chapters: 3},
	{name: 'Philemon', chapters: 1},
	{name: 'Hebrews', chapters: 13},
	{name: 'James', chapters: 5},
	{name: '1 Peter', chapters: 5},
	{name: '2 Peter', chapters: 3},
	{name: '1 John', chapters: 5},
	{name: '2 John', chapters: 1},
	{name: '3 John', chapters: 1},
	{name: 'Jude', chapters: 1},
	{name: 'Revelation', chapters: 22}
];

let file = fs.createWriteStream('test.txt')
let requests = []
const getBible = (version) => {
    //  'https://www.biblegateway.com/quicksearch/?quicksearch=Philippians+1&version=ESV'   
    let request = bibleBooks.forEach((book, index) => {
        for (let i = 1; i <= book.chapters; i++) {
            // file.write(`https://www.biblegateway.com/quicksearch/?quicksearch=${book.name}+${i}&version=ESV\n`)

            // add + between the same name letters
            let chpaterString = isNaN(parseInt(book.name[1])) ? book.name.split(' ').join('+'): book.name
            requests.push(`https://www.biblegateway.com/quicksearch/?quicksearch=${chpaterString}+${i}&version=`)

        }
    })
    // file.end();
}

getBible('ESV');
fs.writeFileSync('requests.json', JSON.stringify({requests: requests}, null, '\t'))




// let stringArray = fs.createWriteStream('myStringArray.js')
// function createMystringArray() {
//     stringArray.write('\n\nconst bibleBooks = [\n')
//     bibleBooks.forEach(((book, index) => {
//         stringArray.write(`\t{name: '${book}', chapters: ${chapters[index]}}${index < bibleBooks.length - 1 ? ',\n' : '\n'}`)
//     }))
//     stringArray.write('];\n')
// }
// createMystringArray();


