const RawSilverBill = require('../models/rawSilverBill.models.js');

// Create and Save a new Note
exports.create = (req, res) => {
    console.log("Bill data is",req.body);
    const rawSilverBill = new RawSilverBill(req.body);
    rawSilverBill.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the raw silver object."
        });
    });
};