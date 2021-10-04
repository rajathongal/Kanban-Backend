const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const Kanban = require('../../models/kanban/kanban');
const jwt = require('jsonwebtoken');

module.exports = async function CommentAdd (args, context) {
    
    var token = context.req.headers.authorization.split('Bearer ')[1];
    
    try{
        return await jwt.verify(token, "MySuperSecretPassword", { algorithm: "HS256"}, async function(err, decoded){
            
            if(err){
                console.log(err)
                return new GraphQLError(err)
            }
            
            if(decoded){
               
                return await Kanban.findOneAndUpdate({_id: args.cardId}, {
                    $addToSet: {
                        comments: {
                            cardId: args.cardId,
                            message: args.message,
                            memberId: decoded._id
                        }
                    }
                },{upsert: true, new: true}, (e,s) => {}).then(async(res) => {
                    //return await Kanban.find({comments: {$elemMatch: {message: args.message}}}).then(res => {console.log(res)})
                    return await Kanban.aggregate([{
                        "$match" : {
                            "comments" : {
                                "$elemMatch" : {
                                    "$and" : [
                                        
                                        {message: args.message},
                                        {memberId: decoded._id}]
                                    
                                }
                            }
                        }
                    },{
                        "$project": {
                            "comments": {
                                "$filter": {
                                    "input": "$comments",
                                    "as": "comments",
                                    "cond": {
                                        "$and": [
                                            {"$eq" : ["$$comments.message", args.message]}
                                        ]
                                    }
                                }
                            }
                        }
                    }]).then(res => {
                        
                        return res[0].comments[0]})
                });
            }
        });
    } catch(e){
        return new GraphQLError(e)
    }
};
