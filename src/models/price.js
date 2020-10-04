const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const PriceSchema = new Schema({
    base: {
        type: String,
        enum: ['BTC'],
        required: true,
    },
    currency: {
        type: String,
        enum: ['USD','GBP', 'EUR'],
        required: true,
    },
    buy: {
        type: Number,
        required: true,
    },
    sell: {
        type: Number,
        required: true,
    },
    spot: {
        type: Number,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
        createIndexes: true,
        required: true,
    }
});

PriceSchema.statics.getPrices = async function({start, end = Date()} = {}) {
    return await Price.find({time: {$gte: start, $lte: end}});
};

PriceSchema.statics.getAverage = async function({start, end = Date()} = {}) {

    const prices = await Price.getPrices({start, end});
    const count = prices.length;
    return prices.reduce((sum, price) => sum + price.spot, 0) / count;
}

PriceSchema.statics.getMedian = async function({start, end = Date()} = {}) {

    const prices = await Price.getPrices({start, end});
    const spots = prices.map(price => price.spot).sort((a, b) => a - b) ;
    const length = spots.length;
    const half = Math.floor(length/2);

    if(length % 2) { return spots[half];}
    else {return (spots[half-1] + spots[half]) / 2.0;}

}

PriceSchema.statics.getMax = async function({start, end = Date()} = {}) {

    const prices = await Price.getPrices({start, end});
    return prices.reduce((max, price) => Math.max(max, price.spot), 0);
}

PriceSchema.statics.getMin = async function({start, end = Date()} = {}) {

    const prices = await Price.getPrices({start, end});
    return prices.reduce((min, price) => Math.min(min, price.spot), Number.MAX_SAFE_INTEGER);
}

PriceSchema.statics.getRange = async function({start, end = Date()} = {}) {

    const prices = await Price.getPrices({start, end});
    return prices.map(price => price.spot);
}

const Price = mongoose.model('Price', PriceSchema);
module.exports = Price;
