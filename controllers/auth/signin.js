const Users = require('../../models/auth/user');
const bcrypt = require('bcryptjs');
const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const { generateToken } = require('../../utils/generateToken');

module.exports = async function signIn (email, password) {
    try{
        return await Users.findOne({email: email}).then( async(response) => {
            if(response === null){
                return new GraphQLError("User Does Not Exist");
            } else {
                return {
                    name: response.name,
                    email: response.email,
                    _id: response._id,
                    accessToken: await generateToken(response.name, response.email, response._id).Token,
                    rfsrt: await generateToken(response.name, response.email).rfsrt
                }
            }
        });
    } catch(err){
        return new GraphQLError(err)
    }
    
};