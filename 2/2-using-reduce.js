const fs = require('fs');

const getFormattedMap = (data) => {
    const rows = data.toString().split('\n');

    return rows.map((row) => {
        const [_, game] = row.split(': ');
        const setsAsStrings = game.split('; ');
        return setsAsStrings.map((setString) => {
            const set = {};
            setString.split(', ').forEach((pair) => {
                const [number, color] = pair.split(' ');
                set[color] = parseInt(number);
            })
            return set;
        });
    });
}

const isValidGame = (game) => {
    return game.reduce((prev, current) => {
        if (current.red > 12 || current.green > 13 || current.blue > 14) {
            return false;
        }
        return prev;
    }, true);
}

const getMinimumOfEachColor = (game) => {
    return game.reduce((prev, current) => ({
            red: Math.max(prev.red, current.red || 0),
            green: Math.max(prev.green, current.green || 0),
            blue: Math.max(prev.blue, current.blue || 0),
        }), {
        red: 0,
        green: 0,
        blue: 0,
    });
}

const getPowerOfGame = (set) => {
    return set.red * set.green * set.blue;
} 

fs.readFile('./data.txt', (err, data) => {
    const list = getFormattedMap(data);

    const sumOfValidIds = list.reduce((prev, current, id) => {
        if (isValidGame(current)) {
            return prev + id + 1;
        }
        return prev;
    }, 0);
    console.log(sumOfValidIds);

    const sumOfPowers = list.reduce((prev, current) => {
        const minimums = getMinimumOfEachColor(current);
        const power = getPowerOfGame(minimums);
        return prev + power;
    }, 0)
    console.log(sumOfPowers);
});
