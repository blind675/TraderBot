const moment = require('moment');
const SMA = require('technicalindicators').SMA;
const BB = require('technicalindicators').BollingerBands;
const Price = require('models/price');

module.exports = {
    onPrices: async (price) => {
        const yesterday = moment().subtract(1, 'days').toDate();


        const dayMax = await Price.getMax({start: yesterday})
        console.log("max: " + dayMax);

        const dayAverage = await Price.getAverage({start: yesterday})
        console.log("average: " + dayAverage);

        const dayMedian = await Price.getMedian({start: yesterday})
        console.log("median: " + dayMedian);

        const dayMin = await Price.getMin({start: yesterday})
        console.log("min: " + dayMin);

        console.log("price: " + price);
    },

    getBollinger: async ({start, end = Date(), period = 1} = {}) => {
        const prices = await Price.getRange({start, end});

        const total = prices.length - period;

        const input = {
            period: total,
            values: prices,
            stdDev: 2
        }

        const outcome = BB.calculate(input);

        return outcome;
    },

    showAvailable: ({bollinger, prices} = {}) => {

        const lowRange = bollinger['lower'];
        const midRange = bollinger['middle'];
        const midLowRange = (midRange - lowRange) / 2 + lowRange;

        const availables = prices.filter(prices => {
           return prices < midrange;
        });


    }

}
