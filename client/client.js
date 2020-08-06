const token = require('./token').token
const Discord = require('discord.js')
const msgHandler = require('base/messages')

const bot = new Discord.Client()
bot.login(token)

bot.on('ready', () => {
    console.log('John Bot Initialized')
})

bot.on('message', msg => {
    if (msg.member === null) {
        msgHandler.handleDM(msg)
    } else if (!msg.member.user.bot) {
        msgHandler.handleMessage(msg)
    }
})