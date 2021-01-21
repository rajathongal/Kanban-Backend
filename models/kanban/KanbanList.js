const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ListsSchema = new Schema({
    
    name: {
        type: String,
        default: "none"
    },
    cardIds: [{
        type: String, 
        default: "none"
    }]

});

module.exports = mongoose.model('KanbanList', ListsSchema);