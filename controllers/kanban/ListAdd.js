const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const KanbanList = require('../../models/kanban/KanbanList');

module.exports = async function ListADD (args) {
    let list = new KanbanList({
        name: args.name
    })
    try{
        return await KanbanList.findOne({name: args.name}).then(async(res) =>{
            if(!(res === null)){
                return new GraphQLError('CARD ALREADY EXISTS')
            } else {
                await list.save();
                return list;
            }
        })
    } catch(e){
        return new GraphQLError(e)
    }
};
