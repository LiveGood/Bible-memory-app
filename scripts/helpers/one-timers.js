const request = require('request');
const requestP = require('request-promise');
const prettyJSON = require('./prettyJSON')
const strInject = require('stringinject').default;
const fs = require('fs')
const regexReplacer = require('../helpers/regexReplacer')

module.exports = (function() {
    let oneTimers = {}

    const versesMatch = /<\/span>(.*?)<span/gm
    const headers = {
        headers: {
          'User-Agent': 'request',
          'api-key': 'ead0fdf65000e527c15d3bf409d92800',
          'content-type': 'application/json'
        }
    };
    
    const urls = {
        versions: 'https://api.scripture.api.bible/v1/bibles',
        books: `https://api.scripture.api.bible/v1/bibles/{version}/books?include-chapters=true&include-chapters-and-sections=true`,
        chapters: `https://api.scripture.api.bible/v1/bibles/{version}/books/JHN/chapters`,
        verses: 'https://api.scripture.api.bible/v1/bibles/{version}/chapters/{chapter}'
    }
    
    oneTimers.getChapters = function(version) {
        console.log(`Calling: ${strInject(urls.books, {version: version})}`);
        request({...headers, url: strInject(urls.books, {version: version})},
            (error, response, body) => {
                if (error) {
                    return console.error(error);
                }
                const versions = JSON.parse(body).data;
                console.log(versions[0].id);    
              });
    }

    oneTimers.countChapters = function() {
        let url = 'https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books?include-chapters=true&include-chapters-and-sections=true'
        request({...headers, url: url},
            (error, response, body) => {
                if (error) {
                    return console.error(error);
                }
                const chapters = JSON.parse(body).data;
                let chapterNumbers = []
                chapters.forEach((book) => chapterNumbers.push({
                    name: book.name,
                    id: book.id,
                    chaptersLength: book.chapters.length - 1
                }))
                fs.writeFileSync('./jsons/books.json', prettyJSON({books: chapterNumbers}))
              });
    }

    oneTimers.getVersions = function () {
        console.log(`Calling: ${urls.versions}`);
        request({...headers, url: urls.versions},
            (error, response, body) => {
                if (error) {
                    return console.error(error);
                }
                
                let versions = JSON.parse(body).data;
                let returnObj = {};
                versions.forEach((bible) => {
                    returnObj[bible.abbreviation] = {
                        id: bible.id,
                        abbreviation: bible.abbreviationLocal,
                        name: bible.name
                    }
                })
    
                fs.writeFileSync('./bible-objects/versions.json', prettyJSON({versions: returnObj}))
            }
        )
    }

    oneTimers.getVersesAsync = async function(versionId, chapterId) {      
        let url = strInject(urls.verses, {version: versionId, chapter: chapterId})
        let chapterVerses = []
        let response;
        
        try {
            console.log(`Calling: ${url}`)
            response = await requestP({...headers, url: url})
        }
        catch (error){
            Promise.reject(error);
        }
        
        let data = JSON.parse(response).data;   
        let verses = regexReplacer(
            /<span class="add">(.*?)<\/span>/gm,
            data.content,
            {inBetween: ['<i class=\"add\">', '</i>']}
        );
        
        let nextMatch;
        let countMatch = 0;
        const versesMatch = /(\d\d|\d)<\/span>(.*?)(<span|<\/p>)/gm
        do {
            nextMatch = versesMatch.exec(verses);
            
            if (nextMatch) {
                countMatch++;
                let index = chapterVerses.push(`${nextMatch[1]} ${nextMatch[2]}`) - 1;
            }
        } while (nextMatch);

        return Promise.resolve(chapterVerses);
    }

    return oneTimers
})()