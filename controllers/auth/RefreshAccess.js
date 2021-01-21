const Users = require('../../models/auth/user');
const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const jwt = require('jsonwebtoken');
const { generateToken } = require('../../utils/generateToken');
require('dotenv').config();

module.exports = async function RefreshAccess (context) {

   
    const token = context.req.headers.cookie.split('=')[3] || null;
    if(!token){
        return new GraphQLError("NOTOKEN");
    }

    return await jwt.verify(token, "jjeejffjdskngjdii384y67492nfjdnn", { algorithm: "HS256" }, async function(err, decoded){
        
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
                        accessToken:  await generateToken(res.name, res.email, res._id).Token
                    }
                }
            });
        }
    });
};