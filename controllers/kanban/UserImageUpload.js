/*const Users = require('../../models/auth/user');
const graphql = require('graphql');
const {
    GraphQLError
} = graphql;

module.exports = async function UserImageUpload ( mimetype, email, buffer) {
    
    const payload = {
        "avatar": {
            "data": buffer,
            "contentType": mimetype
        }
    };
    try{
        return await Users.findOneAndUpdate({email: email}, payload, {new: true, upsert: true, rawResult: true}, (e,s)=>{})
                          .then((resp) => {
                            if(resp !== null){
                               
                                return {success: true}
                            } else {
                                return {success: false}
                            }
                          });
    }catch (e){
        return new GraphQLError(e)
    }
};*/

const Users = require('../../models/auth/user');

module.exports = UserImageUpload = async (req,res) => {
    const payload = {
        "avatar": {
            "data": req.file.buffer,
            "contentType": req.file.mimetype
        }
    }; 
    return await Users.findOneAndUpdate({email: req.body.email}, payload, {new: true, upsert: true, rawResult: true}, (e,s)=>{}).then((resp) => {
        if(resp !== null){               
            return res.status(200).json({success: true})
        } else {
            return res.status(404).json({success: false})
        }
    });
};          