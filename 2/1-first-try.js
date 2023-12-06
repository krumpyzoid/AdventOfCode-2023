const fs = require('fs');

const getFormattedMap = (data) => {
    const rows = data.toString().split('\n');
    const map = new Map();

    rows.forEach((row, index) => {
        const [_, game] = row.split(': ');
        const setsAsStrings = game.split('; ');
        const setsAsObjects = setsAsStrings.map((setString) => {
            const set = {};
            setString.split(', ').forEach((pair) => {
                const [number, color] = pair.split(' ');
                set[color] = parseInt(number);
            })
            return set;
        });
        map.set(index + 1, setsAsObjects);
    });

    return map;
}

const isValidGame = (game) => {
    for (let i = 0; i < game.length; i++) {
        const current = game[i];
        if (current.red > 12 || current.green > 13 || current.blue > 14) {
            return false;
        }
    }
    return true;
}

const getMinimumOfEachColor = (game) => {
    const minimums = {
        red: 0,
        green: 0,
        blue: 0,
    };
    game.forEach((set) => {
        minimums.red = Math.max(minimums.red, set.red || 0);
        minimums.green = Math.max(minimums.green, set.green || 0);
        minimums.blue = Math.max(minimums.blue, set.blue || 0);
    });
    return minimums;
}

const getPowerOfGame = (set) => {
    return set.red * set.green * set.blue;
} 

fs.readFile('./data.txt', (err, data) => {
    const map = getFormattedMap(data);
    
    const validIds = [];
    map.forEach((game, id) => {
        if (isValidGame(game)) {
            validIds.push(id);
        }
    });
    const sumOfValidIds = validIds.reduce((acc, cur) => acc + cur, 0);
    console.log(sumOfValidIds);

    const powers = [];
    map.forEach((game) => {
        const minimums = getMinimumOfEachColor(game);
        const power = getPowerOfGame(minimums);
        powers.push(power);
    })
    const sumOfPowers = powers.reduce((acc, cur) => acc + cur, 0);
    console.log(sumOfPowers);
});
