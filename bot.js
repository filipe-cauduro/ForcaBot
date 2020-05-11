const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./config.json');
const inter = require('./interations.js');
let gameHandler = {
  counterId: 1,
  games: []
}

bot.on("ready", () => {
    console.log('O bot está online!');
});

bot.on("message", message => {

  if (message.author.bot) return;
  
  if (message.channel.type == "text") {
    if (message.content.substring(0, cfg.prefix.length).toLowerCase() != cfg.prefix) return;
    
    const mess = message.content.split(" ").splice(1);
    const func = inter[mess[0].toLowerCase()];

    if (func) {
      gameHandler = func(message, gameHandler);
    } else if (mess[0] == "clear") {
      clearBotChat(message.channel);
    } else {
      message.channel.send("Desculpe, o comando que você digitou não existe.");
    }

  } else {

    let game = gameHandler.games.find(game => game.ownerId === message.author.id);

    if (game) {
    
      if (game.state < 3) {
    
        gameHandler = inter.basico(message, gameHandler);
    
      } else {
    
        message.channel.send("Para falar com o Bot, utilize um canal de servidor!")
    
      }
    
    }
  
  }
  
});

function clearBotChat(channel) {
  const cacheMessages = channel.messages.cache;
  cacheMessages.forEach(mess => {
    if (mess.content.substring(0, cfg.prefix.length) != cfg.prefix)
      mess.delete(mess);
  });
}

bot.login(cfg.token);