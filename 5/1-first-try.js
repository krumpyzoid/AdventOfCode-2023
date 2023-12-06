const fs = require('fs');

fs.readFile('./data.txt', (err, data) => {
    const { seeds, ...rest } = loadData(data);
    const seedLocations = seeds.map((seed) => getSeedLocation(seed, rest));
    const minSeedLocation = Math.min(...seedLocations);
    console.log(minSeedLocation);

    const seedsNumbers = getSeedsNumbers(seeds);
    console.log(seedsNumbers);
});

const getCategoryData = (categories, ctgIndex) => {
    const category = categories[ctgIndex];
    const data = category.split(':\n');
    const rows = data[1].split('\n');
    return rows
        .map((row) => row.split(' ')
            .map((number) => parseInt(number)));
}

const loadData = (data) => {
    const categories = data.toString().split('\n\n');
    const seeds = categories[0].split(': ')[1].split(' ').map((number) => parseInt(number));
    const seedToSoil = getCategoryData(categories, 1);
    const soilToFertilizer = getCategoryData(categories, 2);
    const fertilizerToWater = getCategoryData(categories, 3);
    const waterToLight = getCategoryData(categories, 4);
    const lightToTemperature = getCategoryData(categories, 5);
    const temperatureToHumidity = getCategoryData(categories, 6);
    const humidityToLocation = getCategoryData(categories, 7);

    return {
        seeds,
        seedToSoil,
        soilToFertilizer,
        fertilizerToWater,
        waterToLight,
        lightToTemperature,
        temperatureToHumidity,
        humidityToLocation,
    };
}

const getSeedLocation = (seed, data) => {
    const {  
        seedToSoil, 
        soilToFertilizer, 
        fertilizerToWater, 
        waterToLight, 
        lightToTemperature, 
        temperatureToHumidity, 
        humidityToLocation 
    } = data;

    const soil = getNextNumber(seed, seedToSoil);
    const fertilizer = getNextNumber(soil, soilToFertilizer);
    const water = getNextNumber(fertilizer, fertilizerToWater);
    const light = getNextNumber(water, waterToLight);
    const temperature = getNextNumber(light, lightToTemperature);
    const humidity = getNextNumber(temperature, temperatureToHumidity);
    const location = getNextNumber(humidity, humidityToLocation);

    return location;
}

const getNextNumber = (current, data) => {
    let nextNumber;
    for (let i=0; i<data.length; i++) {
        const [nextStart, currentStart, rangeLength] = data[i];
        if (current >= currentStart && current < currentStart + rangeLength) {
            nextNumber = current + nextStart - currentStart;
            break;
        }
    };
    return nextNumber || current;
}

const getSeedsNumbers = (seeds) => {
    const seedsNumbers = [];
    for (let i=0; i<seeds.length; i=i+2) {
        seedsNumbers.push([seeds[i], seeds[i] + seeds[i+1]]);
    };
    const sortedRanges = seedsNumbers.sort((a, b) => a[0] - b[0]);
    return sortedRanges;
}