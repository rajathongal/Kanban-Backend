const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const KanbanList = require('../../models/kanban/KanbanList');
const Kanban = require('../../models/kanban/kanban');

module.exports = async function ListDelete (args) {
    try{
        
        return await KanbanList.findOneAndDelete({_id: args.listId}).then(async(res) =>{
            
            if(!(res === null)){
                await Kanban.deleteMany().where({listId: args.listId})
                return {_id: args.listId};
            } else {
                return new GraphQLError('CARD DOES NOT EXISTS')
            }
        })
    } catch(e){
        return new GraphQLError(e)
    }
};
