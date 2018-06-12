module.exports = (app) => {
    const rawSilverBill = require('../controllers/rawSilverBill.controller.js');

    // Create a new Note
    app.post('/api/rawSilverBill', rawSilverBill.create);
}