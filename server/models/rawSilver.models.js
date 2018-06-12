const mongoose = require('mongoose');

const RawSilverSchema = mongoose.Schema({
    	kachiNo : String,
    	weightInGram : Number,
    	purity : Number,
    	deduction : Number,
    	deductedPurity : Number,
    	silverInGram : Number
}, {
    timestamps: true
});

module.exports = mongoose.model('RawSilver', RawSilverSchema);