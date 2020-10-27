
module.exports = function regexReplacer(regex, str, options) {
    let nextMatch;
    let replacerId;
    let start, end;

    // {inBetween: [ '{', '}' ] }
    if (options.inBetween) {
        [start, end] = options.inBetween
    } else {
        let start = end = '';
    }

    // With wich map group should the matched string be replaced
    if (options.matchId) {
        replacerId = options.matchId
    }  else {
        replacerId = 1;
    }

    do {
        nextMatch = regex.exec(str);
        
        if (nextMatch) {
            // console.log(nextMatch);
            if (options.strReplace) {
                str = str.replace(nextMatch[0], options.strReplace)
                continue; 
            }
            str = str.replace(nextMatch[0], `${start}${nextMatch[replacerId]}${end}`)
        }
    } while (nextMatch);

    return str;
}