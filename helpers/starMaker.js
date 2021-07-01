function starMaker(level){
    let output = ``
    level = +level

    for(let i = 0; i < level ; i++){
        output += `★`
    }
    return output
}

module.exports = starMaker