const fs = require('fs');

fs.readFile('./data.txt', (err, data) => {
    const rows = data.toString().split('\n');

    const numbers = getAllNumbers(rows);

    const sumOfEngineParts = numbers.reduce((prev, current) => {
        if (isValidPart(current, rows)) {
            return prev + parseInt(current.number);
        }
        return prev;
    }, 0);

    // console.log(sumOfEngineParts)

    const stars = getAllStars(rows);
    const sumOfGears = stars.reduce((prev, current) => {
        const adjacentNumbers = getAdjacentNumbers(current, numbers);
        const gearPower = getGearPower(adjacentNumbers);
        return prev + gearPower;
    }, 0)
    console.log(sumOfGears);
});

const stringContainsSymbol = (string) => {
    return !!string.match(/[^a-z0-9\.]/);
}

const getNumbersInString = (string) => {
    return [...string.matchAll(/[0-9]{1,}/g)];
}

const getAllNumbers = (rows) => {
    const numbers = [];

    rows.forEach((row, rowIndex) => {
        const numbersInRow = getNumbersInString(row);
        if (numbersInRow) {
            numbersInRow.forEach((number) => {
                const { index } = number;
                numbers.push({
                    number: number[0],
                    row: rowIndex,
                    startIndex: index,
                    endIndex: index + number[0].length - 1,
                });
            });
        }
    });

    return numbers;
}

const isValidPart = (number, rows) => {
    const { row, startIndex, endIndex } = number;
    const leftIndex = Math.max(startIndex - 1, 0);
    const rightIndex = Math.min(endIndex + 1, 140);

    const rowAbove = row > 0 ? rows[row - 1].substring(leftIndex, rightIndex + 1) : null;
    const sides = [rows[row][leftIndex], rows[row][rightIndex]].join('');
    const rowBelow = row < rows.length - 1 ? rows[row + 1].substring(leftIndex, rightIndex + 1) : null;

    if (
        (rowAbove && stringContainsSymbol(rowAbove)) 
        || stringContainsSymbol(sides)
        || (rowBelow && stringContainsSymbol(rowBelow))
        ) {
        return true;
    }

    return false;
}

const getStarsInString = (string) => {
    return [...string.matchAll(/\*/g)];
}

const getAllStars = (rows) => {
    const stars = [];

    rows.forEach((row, rowIndex) => {
        const starsInRow = getStarsInString(row);
        if (starsInRow) {
            starsInRow.forEach((star) => {
                const { index } = star;
                stars.push({
                    row: rowIndex,
                    index: index,
                });
            });
        }
    });

    return stars;
}

const getAdjacentNumbers = (star, numbers) => {
    const { row, index } = star;
    const adjacentNumbers = [];

    numbers.forEach((number) => {
        const { row: numberRow, startIndex, endIndex } = number;
        if (numberRow === row) {
            if (startIndex === index + 1 || endIndex === index - 1) {
                adjacentNumbers.push(number);
            }
        }
        if (numberRow === row - 1 || numberRow === row + 1) {
            if ((startIndex >= index - 1 && startIndex <= index + 1) || (endIndex >= index - 1 && endIndex <= index + 1)) {
                adjacentNumbers.push(number);
            }
        }
    });

    return adjacentNumbers;

}

const getGearPower = (numbers) => {
    if (numbers.length === 2) {
        return parseInt(numbers[0].number) * parseInt(numbers[1].number);
    }
    return 0;
}