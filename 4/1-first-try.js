const fs = require('fs');

fs.readFile('./data.txt', (err, data) => {
    const rows = data.toString().split('\n');

    const games = rows
        .map((row) => row.split(': ')[1].split(' | '))
        .map((row) => row.map((numbers) => numbers.split(' ')
            .map((number) => parseInt(number))
            .filter((number) => !isNaN(number)
        )));
    
    const totalPoints = games.reduce((totalPoints, [winningNumbers, playedNumbers]) => {
        const currentGamePoints = winningNumbers.reduce((gamePoints, currentNumber) => {
            if (playedNumbers.includes(currentNumber)) {
                return gamePoints === 0 ? 1 : gamePoints * 2;
            }
            return gamePoints;
        }, 0);
        return totalPoints + currentGamePoints;
    }, 0);
    // console.log(totalPoints);

    ////////////////////////////////
    // PART TWO
    ////////////////////////////////
    const map = {};
    games.forEach((game, index) => {
        map[parseInt(index) + 1] = {
            validNumbers: game[0],
            playedNumbers: game[1],
            numberOfCards: 1,
        };
    });

    Object.entries(map).forEach(([id, game]) => {
        const matchingNumbers = getNumberOfMatchingNumbers(game);
        for (let i = 1; i <= matchingNumbers; i++) {
            if (parseInt(id) + i <= games.length) map[parseInt(id) + i].numberOfCards += game.numberOfCards;
            else break;
        }
    });

    let numberOfCards = 0;
    Object.entries(map).forEach(([_, game]) => {
        numberOfCards += game.numberOfCards;
    });
    console.log(numberOfCards);
});

const getNumberOfMatchingNumbers = (game) => {
    const { validNumbers, playedNumbers } = game;
    return validNumbers.reduce((acc, cur) => {
        if (playedNumbers.includes(cur)) {
            return acc + 1;
        }
        return acc;
    }, 0);
};