const moment = require('moment');
const Price = require('models/price');

module.exports = {
    onPrices: async (price) => {
        const yesterday = moment().subtract(1, 'days').toDate();


        const dayMax = await Price.getMax({ start: yesterday })
        console.log("max: " + dayMax);

        const dayAverage = await Price.getAverage({ start: yesterday })
        console.log("average: " + dayAverage);

        const dayMedian = await Price.getMedian({ start: yesterday })
        console.log("median: " + dayMedian);

        const dayMin = await Price.getMin({ start: yesterday })
        console.log("min: " + dayMin);

        console.log("price: " + price);
    }
}
