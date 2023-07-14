const mineflayer = require('mineflayer');
const config = require('./config.json');
const { pathfinder, Movements, goals:{ GoalBlock } } = require('mineflayer-pathfinder')

const bot = mineflayer.createBot({ 
    host: config.host,
    port: config.port,    
    username: config.username,
    // password: config.password, // leave out for cracked servers
    version: config.version
});


bot.once('spawn', () => {
    bot.loadPlugin(pathfinder)
    const defaultMovements = new Movements(bot)
    bot.pathfinder.setMovements(defaultMovements)

    console.log('Bot is online!')
    bot.chat('Hello world!')
})



bot.on('chat', async (username, message) => {
    if (username === bot.username) return // ignore bot messages

    if (message) {
        const coords = { x: -60, y: 68, z: 11 }
        const goal = new GoalBlock(coords.x, coords.y, coords.z);
        bot.chat('going to ' + coords.x + ', ' + coords.y + ', ' + coords.z);
        await bot.pathfinder.goto(goal);
        bot.chat('I have arrived');
    }
})
