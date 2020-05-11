const { findIdIn } = require('./utils.js');
const decache  = require('./node_modules/decache/decache.js');

module.exports = {
    createGame: function (guildId, ownerId, channel, id) {
        return {
            id,
            word: "",
            category: "",
            guildId,
            ownerId,
            channel,
            display: [],
            guesses: [],
            state: 1
        }
    },
    prepareDisplay: function (word) {
        let strArr = [];
        for (var i = 0; i < word.length; i++) {
            let char = word.charAt(i);
            if (char == "-" || char == " ")
                strArr.push(word.charAt(i));
            else
                strArr.push("_");
        }
        return strArr;
    },
    guess: function (guess, game) {
        if (guess.length == 1) {

            if (game.guesses.find(letter => guess == letter)) return { id: 0, game };

            game.guesses.push(guess);

            let hit = false;

            for (var i = 0; i < game.word.length; i++) {
                
                let char = game.word.charAt(i);

                if (char == guess) {
                    game.display[i] = char;
                    hit = true;
                }
            }

            if (hit)
                return { id: 1, game };
            else 
                game.state++;
                return { id: 3, game };

        } else if (guess.length > 1) {

            for (let i = 0; i < guess.length; i++) {
                let hit = false;

                for (let j = 0; j < game.guesses.length; j++) {
                    if (guess.charAt(i) == game.guesses[j]) hit = true;
                }

                if (hit == false) game.guesses.push(guess.charAt(i));
            }
            
            for (let i = 0; i < game.word.length; i++) {
                game.display[i] = game.word.charAt(i);
            }

            if (guess == game.word) {
                game.state = 10;
                return { id: 2, game };
            } else {
                game.state = 9;
                return { id: 4, game };
            }
        } else {
            return { id: 0, game };
        }

    },
    display: function (game) {
        const { states } = require('./states.json');
        
        let state = findIdIn(states, game.state);

        decache('./states.json');

        let letters = "";

        state.display[1] += game.category;

        if (game.guesses.length > 0)
            state.display[2] += game.guesses.join(", ");
        
        for (let i = 0; i < game.display.length; i++) {
            let letter = game.display[i];
            if (letter == "_")
                letters += "\\_ ";
            else
                letters += letter + " ";
        }
        
        state.display[state.display.length - 1] += letters;
        return state.display;
    }
}