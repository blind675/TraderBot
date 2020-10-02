const moment = require('moment');
const crypto_api = require('crypto_api');
const database = require('database');
const Price = require('models/price');
const Trading = require('crypto_trading');

const TIME_INTERVAL = 30 * 1000

const mainLoop = async () => {
    try {

        const {sellPrice, buyPrice} = await crypto_api.getPrice('BTC/USD');
        console.log(sellPrice, buyPrice);

        const spotPrice = ((buyPrice + sellPrice) / 2);
        const price = await Price.create({
            base: 'BTC',
            currency: 'USD',
            buy: buyPrice,
            sell: sellPrice,
            spot: spotPrice,
            time: Date(),
        });

        Trading.onPrices(spotPrice);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    start: async () => {

        await database.connect();

        mainLoop();
        setInterval(mainLoop, TIME_INTERVAL);

    }
}
