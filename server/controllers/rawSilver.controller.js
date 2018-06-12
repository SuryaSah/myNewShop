const RawSilver = require('../models/rawSilver.models.js');
const fs = require('fs');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.kachiNo && req.body.weightInGram && req.body.purity) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }
    var obj = {
    	kachiNo : req.body.kachiNo,
    	weightInGram : req.body.weightInGram,
    	purity : req.body.purity,
    	deduction : req.body.deduction ,
    	deductedPurity : req.body.deductedPurity,
    	silverInGram : req.body.silverInGram 
    }
    // data.push(obj)
    // fs.writeFile('../myAPP/src/assets/json/data.json', JSON.stringify(data), (err) => {  
    //     if (err) throw err;
    //     console.log('Data written to file');
    //     res.send(data);
    // });
    // Save Note in the database
    const rawSilver = new RawSilver(obj);
    rawSilver.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the raw silver object."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    RawSilver.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving raw silver."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findPageData = (req, res) => {
    var pageNo = req.body.page;
    var limit = 7;
    var skip = (pageNo-1) * limit;
    var totalCount;
    console.log("page no is",req.body);
    //count documents
    RawSilver.count({}, function(err, count){
        if(err){
            totalCount = 0;
        }
        else{
            totalCount = count;
        }
    });

    if(totalCount == 0){
        return res.status(400).send({
            message: "No Document in Database.."
        });
    }
   // get paginated documents
    RawSilver.find().skip(skip).limit(limit).exec((err, docs) => {
        console.log("docs",docs);
        if(err){
            return res.status(400).send({
            message: "Error Occured"
        });

        }
        else if(!docs){
            return res.status(400).send({
            message: "Docs Not Found"
        });
        }
        else{
            var result = {
                "totalRecords" : totalCount,
                "page": pageNo,
                "details": docs
            };
            return res.send(result);
        }

    });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    RawSilver.findById(req.params.noteId)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Silver raw material not found with id " + req.params.noteId
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Silver raw material not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving silver raw material with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.weight) {
        return res.status(400).send({
            message: "weight can not be empty"
        });
    }
    // Find note and update it with the request body
    RawSilver.findByIdAndUpdate(req.params.id, {
        weightInGram : req.body.weight,
        silverInGram : req.body.silverInGram
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Silver raw material not found with id " + req.params.noteId
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Silver raw material not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating silver raw material with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    console.log("id is",req.params.noteId);
    RawSilver.findByIdAndRemove(req.params.noteId)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Silver raw material not found with id " + req.params.noteId
            });
        }
        res.send({message: "Silver raw material deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Silver raw material not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete silver raw material with id " + req.params.noteId
        });
    });
};
exports.deleteAll = (req,res) => {
    RawSilver.remove()
    .then(data => {
        if(!data){
            return res.status(404).send({
                message : "no records in rawSilver db"
            });
        }
        res.send({message: "Silver raw material deleted successfully!"})
    })
    .catch(err => {
        if(err) {
            return res.status(404).send({
                message: "Silver raw material not found with id "
            });                
        }
        return res.status(500).send({
            message: "Could not delete silver raw material with id "
        });
    });
}