// TODO: switch to coinbase in 48 hours
const ccxt = require ('ccxt')

module.exports = {

    getPrice : async (currency) => {

        const cex       = new ccxt.cex();
        const snapshot  = await cex.fetchTicker(currency);

        return {sellPrice: snapshot.bid, buyPrice: snapshot.ask};
    }
}


const config = require('configuration')
const coinbase = require('coinbase')

const apiKey = config.get('COINBASE_API_KEY')
const apiSecret = config.get('COINBASE_API_SECRET')

const client = new coinbase.Client({ apiKey, apiSecret })


// /*
//  * Also supported 'BTC-EUR' 'BTC-GBP'
//  */
// let currency = 'USD';
// let base = 'BTC';
//
//
// module.exports = {
//     setCurrency: curr => {
//         currency = curr
//     },
//     setBase: bas => {
//         base = bas
//     },
//     getPrices: async function() {
//         const currencyPair = base + '-' + currency;
//
//         const actions = [this.getSpotPrice(), this.getBuyPrice(), this.getSellPrice()]
//
//         const results = await Promise.all(actions)
//         const ordering = ['spot', 'buy', 'sell']
//
//         const dict = {}
//
//         for (let i in ordering) {
//             const order = ordering[i]
//             const result = results[i]
//             dict[order] = result
//         }
//
//         const data = {
//             base: base,
//             currency: currency,
//             spot: dict['spot']['amount'],
//             buy: dict['buy']['amount'],
//             sell: dict['sell']['amount'],
//             time: Date()
//         }
//
//         return data
//     },
//     getSpotPrice: async () => new Promise((resolve, reject) => {
//         const currencyPair = currency
//
//         client.getSpotPrice({ currencyPair }, (err, obj) => {
//             err ? reject(err) : resolve(obj.data)
//         })
//     }),
//     getBuyPrice: async () => new Promise((resolve, reject) => {
//         const currencyPair = currency
//
//         client.getBuyPrice({ currencyPair }, (err, obj) => {
//             err ? reject(err) : resolve(obj.data)
//         })
//     }),
//     getSellPrice: async () => new Promise((resolve, reject) => {
//         const currencyPair = currency
//         client.getSellPrice({ currencyPair }, (err, obj) => {
//             err ? reject(err) : resolve(obj.data)
//         })
//     })
// }

