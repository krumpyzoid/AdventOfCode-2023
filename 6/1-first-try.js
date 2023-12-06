const fs = require('fs');

fs.readFile('./data.txt', (err, data) => {
    const [time, distance] = data.toString()
        .split('\n')
        .map((row) => row.match(/[0-9]+/g)
            .map((number) => parseInt(number))
        );

        // PART ONE
        const waysToWin = time.map((t, index) => {
            let winningStrategies = 0;
            for (let i = 0; i < t; i++) {
                if (((t - i) * i) > distance[index]) winningStrategies++;
            }
            return winningStrategies;
        });
        const firstAnswer = waysToWin.reduce((acc, cur) => acc * cur, 1);

        // PART TWO
        // This is a math problem, not a programming problem.
        // t = total time, d = distance to beat, x = time waited
        // d = x * (t - x)
        // -x^2 + tx - d = 0
        // x = (-t +- sqrt(t^2 - 4d)) / -2
        const {t, d} = {
            t: parseInt(time.join('')),
            d: parseInt(distance.join('')),
        };

        const x = (-t + Math.sqrt(t * t - 4 * d)) / -2;
        const x2 = (-t - Math.sqrt(t * t - 4 * d)) / -2;
        const secondAnswer = Math.ceil(x2) - Math.ceil(x);
        console.log(secondAnswer);
});