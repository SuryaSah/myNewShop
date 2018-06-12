module.exports = (app) => {
    const notes = require('../controllers/rawSilver.controller.js');

    // Create a new Note
    app.post('/api/rawSilver', notes.create);

    // Retrieve all Notes
    app.get('/api/rawSilver', notes.findAll);

    //Retrieve rawSilver using pagination
    app.post('/api/rawSilverPagination',notes.findPageData);

    // Retrieve a single Note with noteId
    app.get('/api/rawSilver/:id', notes.findOne);

    // Update a Note with noteId
    app.put('/api/rawSilver/:id', notes.update);

    // Delete a Note with noteId
    app.delete('/api/rawSilver/:noteId', notes.delete);

    //Delete all records
    app.delete('/api/rawSilverDeleteAll',notes.deleteAll);
}