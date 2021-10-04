const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const KanbanList = require('../../models/kanban/KanbanList');
const Kanban = require('../../models/kanban/kanban');


module.exports = async function DeleteCard (args) {
    try{
        return await Kanban.findOneAndDelete({_id: args.cardId}).then(async res => {
            return await KanbanList.findOne().where({cardIds: args.cardId}).then(async resp => {
                console.log(resp)
                return await KanbanList.findOneAndUpdate({_id: resp._id},{
                    $pull: {cardIds: args.cardId}
                }).then(response => {
                    return {
                        success: true,
                    }
                })
            })
        })
    } catch(e){
        return new GraphQLError(e)
    }
};
