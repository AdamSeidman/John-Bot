var rollDie = function (extra) {
    return (Math.floor((Math.random * 6) + 1) + (extra || 0)) >= 6
}

var randomArrayItem = function (arr) {
    if (arr === undefined || arr.length <= 1) {
        return undefined
    }
    return arr[Math.floor(Math.random() * arr.length)]
}

var makeString = function (arr) {
    if (arr === undefined || arr.length === 0) {
        return ''
    } else if (arr.length === 1) {
        return arr[0]
    }

    let str = ''
    arr.forEach(x => str += (x + ' '))
    return str.slice(0, str.length - 1)
}

var handleGameMessage = function(user, str, callback) {
    if (str === undefined) {
        if (callback !== undefined) {
            callback()
        }
    } else {
        user.send(str)
    }
}

module.exports = {
    rollDie: rollDie,
    randomArrayItem: randomArrayItem,
    makeString: makeString,
    cmd: handleGameMessage
}