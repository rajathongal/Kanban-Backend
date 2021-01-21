const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const Kanban = require('../../models/kanban/kanban');

module.exports = async function CheckListAdd (args) {
    try {
        return await Kanban.findOneAndUpdate({_id: args.cardId},{
            $addToSet: {
                checklists: {
                    name: args.name
                }
            }
        },{upsert: true, new: true}, (e,s) => {}).then(async res => {
            return await Kanban.aggregate([{
                    "$match" : {
                        "checklists": {
                            "$elemMatch" : {
                                "$and" : [
                                    {name: args.name},
                                   
                                ]
                            }
                        }
                    }
                },{
                    "$project": {
                        "_id" : 1, "name" : 1, "checkItems" : 1, 
                        "checklists": {
                            "$filter": {
                                "input": "$checklists",
                                "as": "checklists",
                                    "cond": {
                                        "$and": [
                                            {"$eq" : ["$$checklists.name", args.name]},
                                            
                                        ]
                                    }
                            }
                        }
                    }
                }
            ]).then(res => {
                
                return res[0]});
        })
    } catch (err) {
        return new GraphQLError(err);
    }
}