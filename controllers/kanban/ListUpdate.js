const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const KanbanList = require('../../models/kanban/KanbanList');

module.exports = async function ListUpdate (args) {
    try{
        return await KanbanList.findOneAndUpdate({_id: args.listId},{name: args.name},{}, (e,s) => {}).then(async(res) =>{
            if(!(res === null)){
                return res;
            } else {
                return new GraphQLError('CARD DOES NOT EXISTS')
            }
        })
    } catch(e){
        return new GraphQLError(e)
    }
};
