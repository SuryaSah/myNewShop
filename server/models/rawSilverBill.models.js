const mongoose = require('mongoose');

const RawSilverBillSchema = mongoose.Schema({
		customerName : String,
		customerMobile : Number,
		rawSilverDetails : [ {
			kachiNo : String,
    		weightInGram : Number,
    		purity : Number,
    		deduction : Number,
    		deductedPurity : Number,
    		silverInGram : Number
		} ],
		totalWeight : Number,
		totalSilver : Number
}, {
    timestamps: true
});

module.exports = mongoose.model('RawSilverBill', RawSilverBillSchema);