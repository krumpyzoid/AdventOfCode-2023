const fs = require('fs');

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const getNumber = (str) => {
    const sanitizedString = str
        .replaceAll('one', 'o1e')
        .replaceAll('two', 't2o')
        .replaceAll('three', 't3e')
        .replaceAll('four', 'f4r')
        .replaceAll('five', 'f5e')
        .replaceAll('six', 's6x')
        .replaceAll('seven', 's7n')
        .replaceAll('eight', 'e8t')
        .replaceAll('nine', 'n9e');
    const numbers = sanitizedString
        .split('')
        .filter((char) => digits.includes(char));
    return parseInt(numbers[0] + numbers[numbers.length - 1]);
}

fs.readFile('./data.txt', (err, data) => {
    const list = data.toString().split('\n');
    const result = list.map(getNumber);
    const total = result.reduce((acc, cur) => acc + cur, 0);
    console.log(total)
});

