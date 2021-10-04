const mongoose = require("mongoose");
var {ObjectId} = require('mongodb');
var moment = require('moment');

const Schema = mongoose.Schema;

const kanbanSchema = new Schema({
attachments: [],
checklists: [{
    _id: {
        type: String,
        default: ObjectId
    },
    name: {
        type: String,
        default: "none"
    },
    checkItems:[
        {
            _id: {
                type: String,
                default: ObjectId
            },
            name: {
                type: String,
                default: "none"
            },
            state: {
                type: String,
                default: "none"
            }
        }
    ]
}],
comments: [{
    _id: {
        type: String,
        default: ObjectId
    },
    cardId: {
        type: String,
        default: "none"
    },
    createdAt: {
        type: String,
        default: moment().toDate().getTime()
    },
    memberId: {
        type: String,
        default: "none"
    },
    message: {
        type: String,
        default: "none"
    }
}],
cover: {
    data:{
        type: Buffer,
        default: Buffer.alloc(0)
        
    },
    contentType: {
        type: String,
        default: "none"
    },
},
due: {
    type: Date
},
isSubscribed: {
    type: Boolean,
    default:  false
},
listId: {
    type: String,
    default: "none"
},
name: {
    type: String,
    default: "none"
},
memberIds: [{
    type: String, 
    default: "none"
}],
description: {
    type: String,
    default: "none"
},
});

module.exports = mongoose.model('Kanban', kanbanSchema);