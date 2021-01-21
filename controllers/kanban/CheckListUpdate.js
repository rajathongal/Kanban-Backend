const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const Kanban = require('../../models/kanban/kanban');

module.exports = async function CheckListUpdate (args) {
    try{
        return await Kanban.findOneAndUpdate({ checklists: {_id: args.checklistId}},{
            $set: {"checklists": { "name": args.name}}
        },{upsert: true}, (e,s) => {}).then(res => console.log(res))
    } catch(e) {
        return new GraphQLError(e)
    }
};

/*** return await Kanban.findOneAndUpdate({_id: args.cardId,
                "checklists._id": args.checklistId },
                {$set: {"checklists.$.name": args.name}},{}, (e,s) => {})
                .then(async(res) =>{
                    console.log(res)
                if(!(res === null)){
                    return res;
                } else {
                    return new GraphQLError('CARD DOES NOT EXISTS')
                }
            }) */