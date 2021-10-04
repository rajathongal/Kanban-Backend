const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const Kanban = require('../../models/kanban/kanban');
const KanbanList = require('../../models/kanban/KanbanList');

module.exports = async function MoveCard (args) {
    try {
        return await KanbanList.findOne().where({cardIds: args.cardId}).then(async res => {
            await KanbanList.findOneAndUpdate({_id: res._id},{
                $pull: {cardIds: args.cardId}
            }).then(async reso => {
                return await KanbanList.findOneAndUpdate({_id: args.listId},{
                    $addToSet: {
                        cardIds: args.cardId
                    }
                },{upsert: true, new: true}, (e,s) => {}).then(async resp => {
                    await Kanban.findByIdAndUpdate({_id: args.cardId}, {
                        listId: args.listId
                    },{upsert: true, new: true}, (e,s) => {});
    
                    return {
                        cardId: args.cardId,
                        position: args.position,
                        listId: args.listId
                    };
                })
            })
            
        });
    } catch (err) {
        return new GraphQLError(err);
    }

};