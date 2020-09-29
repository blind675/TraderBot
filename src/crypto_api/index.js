const ccxt = require ('ccxt')

module.exports = {

    getPrice : async (currency) => {

        const cex       = new ccxt.cex();
        const snapshot  = await cex.fetchTicker(currency);

        return {sellPrice: snapshot.bid, buyPrice: snapshot.ask};
    }
}
