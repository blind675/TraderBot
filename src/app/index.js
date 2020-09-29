const crypto_api = require('crypto_api')
const database = require('database')

module.exports = {
    start: async () => {

        database.connect();

        setInterval(async  () => {
            // const {sellPrice, buyPrice} = await crypto_api.getPrice('BTC/USD');
            // console.log ( sellPrice, buyPrice );
        }, 30 * 1000);

    }
}
