const mineflayer = require('mineflayer');
const config = require('./config.json');
const { pathfinder, Movements, goals:{ GoalBlock, GoalNear } } = require('mineflayer-pathfinder')

const bot = mineflayer.createBot({ 
    host: config.host,
    port: config.port,    
    username: config.username,
    // password: config.password, // leave out for cracked servers
    version: config.version
});

const RANGE_GOAL = 1 // get within this radius of the player


bot.once('spawn', () => {
    bot.loadPlugin(pathfinder)
    const defaultMovements = new Movements(bot)
    bot.pathfinder.setMovements(defaultMovements)

    console.log('Logged in as ' + bot.username + '!');

    console.log('Connected to ' + config.host + ':' + config.port + '!')
    bot.chat('Hello world!')




bot.on('chat', async (username, message) => {
    if (username === bot.username || !message.startsWith(config.prefix)) return // ignore bot messages and non-commands

    if (message == config.prefix + 'come') {
        const target = bot.players[username]?.entity
        if (!target) {
            bot.chat("I don't see you !")
            return
        }
        const { x: playerX, y: playerY, z: playerZ } = target.position

    bot.pathfinder.setMovements(defaultMovements)
    bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, RANGE_GOAL))
    bot.chat('Going to ' + username);  
    
    
    }
    })
})
