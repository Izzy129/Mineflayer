const mineflayer = require('mineflayer');

const { pathfinder, Movements, goals:{ GoalBlock } } = require('mineflayer-pathfinder')

const bot = mineflayer.createBot({ 
    host: 'localhost',
    port: 49171,
    username: 'bot',
    // password: '12345678', // leave out for cracked servers
    version: '1.20.1'
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

    if (message === 'come') {
        const coords = { x: -60, y: 68, z: 11 }
        const goal = new GoalBlock(coords.x, coords.y, coords.z);
        bot.chat('going to ' + coords.x + ', ' + coords.y + ', ' + coords.z);
        await bot.pathfinder.goto(goal);
        bot.chat('I have arrived');
    }
})
