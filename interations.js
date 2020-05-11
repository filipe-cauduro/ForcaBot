const forca = require('./game.js');
const { answers } = require('./guess-answers.json');

module.exports = {
    ping: async function(message){
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms.`);
    },
    jogar: function (message, gameHandler){
        if (gameHandler.games.find(game => game.guildId === message.guild.id)) {
            const m = message.channel.send("Você não pode iniciar um novo jogo pois já existe um em andamento neste servidor.");
            return;
        } 

        gameHandler.games.push(forca.createGame(message.guild.id, message.author.id, message.channel, gameHandler.counterId));
        gameHandler.counterId++;

        message.author.send("Digite a sua palavra:");

        return gameHandler;
    },
    basico: function (message, gameHandler) {

        let game = gameHandler.games.find(game => game.ownerId === message.author.id);

        if (game.state == 1) {
            game.word = message.content.toLowerCase().trim();
            message.author.send("Digite a dica para a sua palavra:");

        } else if (game.state == 2) {
            game.category = (message.content.charAt(0).toUpperCase()
                            + message.content.substring(1, message.content.length).toLowerCase()).trim();

            game.display = forca.prepareDisplay(game.word);
        }

        game.state++;

        gameHandler.games[gameHandler.games.findIndex(oldGame => oldGame.id === game.id)] = game;

        if (game.state == 3) {
            let display = forca.display(game);
            game.channel.send(display.join("\n"));
        }

        return gameHandler;
    },
    chutar: function (message, gameHandler) {

        let game = gameHandler.games.find(game => game.guildId === message.guild.id);
        const mess = message.content.split(" ").splice(2).toString();
        
        let guessResult;
        
        if (message.author.id == game.ownerId && 8 == 12) 
            guessResult = { id: 5, game };
        else 
            guessResult = forca.guess(mess, game);
        
        let answer = answers.find(ans => ans.id == guessResult.id);
        
        message.channel.send(answer.message);

        game = guessResult.game;

        let display = forca.display(game);
        game.channel.send(display.join("\n"));

        if (answer.id == 2 || answer.id == 4){
            gameHandler.games.splice(gameHandler.games.findIndex(oldGame => oldGame.id === game.id), 1);
        } else {
            gameHandler.games[gameHandler.games.findIndex(oldGame => oldGame.id === game.id)] = game;
        }

        return gameHandler;
    },
    ajuda: function (message) {
        const { help } = require('./config.json');
        message.channel.send("Você pode encontrar tudo sobre o bot em:\n" + help);
    }
}