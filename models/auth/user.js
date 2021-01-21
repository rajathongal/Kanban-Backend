const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    avatar: { 
        data:{
            type: Buffer,
            default: Buffer.alloc(0)
            
        },
        contentType: {
            type: String,
            default: "none"
        },
        
    },
});

userSchema.index({email: 1}, { unique: true });

module.exports = mongoose.model('Users', userSchema);