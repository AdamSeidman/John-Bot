const gameHandler = require('./games')
const sendHelpMessage = require('./help').sendHelpMessage
const utils = require('./utils')

let waitingUsers = []

var startNextRound = function (user) {
    
}

var startGame = function (user) {

}

var createGameInstance = function (user) {
    if (waitingUsers.find(x => x.id === user.id) !== undefined) {
        user.send('Already in game lobby.')
    } else {
        waitingUsers.push(user)
        user.send('Lobby created. Please connect game channel.')
    }
}

var adjustPlace = function (user, cmdList) {
    let command = cmdList[0].toLowerCase()
    cmdList = utils.makeString(cmdList)
    if (command === 'edit') {
        utils.cmd(user, gameHandler.editPlace(user, cmdList, true), () => {
            startNextRound(user)
        })
    } else if (command === 'set') {
        utils.cmd(user, gameHandler.editPlace(user, cmdList, false), () => {
            utils.cmd(user, gameHandler.addWillpower(user), () => {
                startNextRound(user)
            })
        })
    } else {
        user.send('Command not known.')
        return
    }
}

var addPlayerPoints = function (user, cmdList) {
    let person = findPerson(user, cmdList[0])
    cmdList = Number.parseInt(cmdList[1])
    if (isNaN(cmdList)) {
        user.send('Sorry, I do not understand what that means.')
    } else {
        utils.cmd(user, gameHandler.addPoints(user, person, cmdList), () => {
            user.send(`Awarded ${cmdList} points to ${person.name}.`)
        })
    }
}

var findPerson = function (user, name) {

}

var endGame = function (user) {

}

var editInventory = function (user, cmdList) {
    if (cmdList === undefined || cmdList.length === 0) {
        user.send('No item specified...')
        return
    }
    utils.cmd(user, utils.cmd(user, gameHandler.editInventory(user, utils.makeString('cmdList'), () => {
        gameHandler.sendStatusUpdate(user)
    })))
}

var handle = function (user, cmdList) {
    let command = cmdList[0].toLowerCase()
    cmdList = cmdList.slice(1)
    switch (command) {
    case 'round':
        startNextRound(user)
        break
    case 'start':
        startGame(user)
        break
    case 'init':
        createGameInstance(user)
        break
    case 'help':
        sendHelpMessage(user)
        break
    case 'place':
        adjustPlace(user, cmdList)
        break
    case 'points':
        addPlayerPoints(user, cmdList)
        break
    case 'end':
        endGame(user)
        break
    case 'inventory':
        editInventory(user, cmdList)
        break
    }
}