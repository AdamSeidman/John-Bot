const utils = require('./utils')

var games = []

var addGame = function (user, channel, players) {
    games.push({
        user: user,
        channel: channel,
        players: players,
        inSession: false,
        inventory: []
    })
}

var startGame = function (user) {
    let game = findGame(user)
    if (game.players.length < 2) {
        return 'Not Enough Players to Start.'
    } else if (game.inSession) {
        return 'Game already in session.'
    } else {
        game.inSession = true
    }
}

var stopGame = function (user) {
    let game = findGame(user)
    if (!game.inSession) {
        return 'Game not in session.'
    }
    game.inSession = false
}

var removeGame = function (user) {
    for (let i = 0; i < games.length; i++) {
        if (games[i].user.id === user.id) {
            games = games.splice(0, i).concat(games.splice(i + 1))
            return
        }
    }
}

var addWilpower = function (user, player, amt) {
    let game = findGame(user)
    if (game === undefined || !game.inSession) {
        return 'Function not available at this time.'
    }
    game.players.forEach(person => {
        if (amt === undefined) {
            ++person.willpower
        } else if (player.id === person.id) {
            person.willpower += amt
        }
        if (person.willpower > 10) {
            person.willpower = 10
        }
    })
}

var addPoints = function (user, player, amt) {
    let game = findGame(user)
    if (game === undefined || !game.inSession) {
        return 'Function not available at this time.'
    }
    let person = game.players.find(x => x.id === player.id)
    if (person === undefined) {
        return 'Could not find specified player.'
    }
    person.score += amt
}

var getWillpower = function (user, player) {
    return findGame(user).players.find(x => x.id === player.id).willpower
}

var findGame = function (user) {
    return games.find(x => x.user.id === user.id)
}

var getWinners = function (user) {
    let winners = []
    let players = findGame(user).player
    let highscore = 0
    players.forEach(player => {
        if (player.score > highscore) {
            highscore = player.score
        }
    })
    players.forEach(player => {
        if (player.score === highscore) {
            winners.push(player)
        }
    })
    if (winners.length === 1) {
        return winners[0]
    } else if (winners.length === 0) {
        return undefined
    } else {
        return winners 
    }
}

var getRandomPlayer = function (user) {
    return utils.randomArrayItem(findGame(user).players)
}

var addPlayer = function (user, player) {
    let game = findGame(user)
    if (game.inSession) {
        return 'Sorry, the game has already started.'
    } else if (game.players.find(x => x.id === player.id) !== undefined) {
        return 'Player is already in game.'
    }
    game.players.push({
        data: player,
        name: player.name,
        id: player.id,
        score: 0,
        willpower: 10,
        note: ''
    })
}

var sendStatusUpdate = function (user) {
    console.log(user) // TODO real update
}

var editPlace = function (user, newPlace, isUpdate) {
    let game = findGame(user)
    if (!game.inSession) {
        return 'Game has not started'
    } else {
        game.place = (isUpdate ? newPlace + ' ' : '') + newPlace
    }
}

var editInventory = function (user, item) {
    let game = findGame(user)
    if (!game.inSession) {
        return 'Game has not started'
    } else if (item === undefined) {
        game.inventory = []
    } else {
        game.inventory.push(item)
    }
}

module.exports = {
    findGame: findGame,
    editWilpower: addWilpower,
    addGame: addGame,
    removeGame: removeGame,
    getWillpower: getWillpower,
    getWinners: getWinners,
    addPoints: addPoints,
    addPlayer: addPlayer,
    getRandomPlayer: getRandomPlayer,
    startGame: startGame,
    stopGame: stopGame,
    sendStatusUpdate: sendStatusUpdate,
    editPlace: editPlace,
    editInventory: editInventory
}