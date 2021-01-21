const Users = require('../../models/auth/user');
const graphql = require('graphql');
const {
    GraphQLError,
} = graphql;
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async function ContiniousAuthVerify (context) {
    
    const token = context.req.headers.authorization.split('Bearer ')[1] || context.req.headers.accessToken || null;
    
    if(!token){
        return new GraphQLError("NOTOKEN");
    }

    return await jwt.verify(token, "MySuperSecretPassword", { algorithm: "HS256" }, async function(err, decoded){
        
        if(err){
            
            return new GraphQLError("INVALIDTOKEN");
        }
        if(decoded){
           
            return await Users.findOne({email: decoded.email}).then(async (res) => {
                
                if(res === null){
                    return new GraphQLError("INVALIDUSER");
                } else{
                   
                    return {
                        name: res.name,
                        email: res.email,
                        _id: res._id,
                    }
                }
            });
        }
    });
};