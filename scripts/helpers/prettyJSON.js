
module.exports = function prettyJSON(data) {
    return JSON.stringify(data, null, '  ')
}