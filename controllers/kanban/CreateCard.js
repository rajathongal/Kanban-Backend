const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const Kanban = require('../../models/kanban/kanban');
const KanbanList = require('../../models/kanban/KanbanList');

module.exports = async function CreateCard (args) {
    try{
        let card = new Kanban({
            name: args.name,
            listId: args.listId
        });

        return await Kanban.findOne({name: args.name}).then(async(res) => {
            if(!(res === null)){
                return new GraphQLError('CARD ALREADY EXISTS');
            } else {
                return await card.save().then(async (resp) => {
                    await KanbanList.findOneAndUpdate({_id: args.listId},{
                        $addToSet: {
                            cardIds: resp._id
                        }
                    },{upsert: true, new: true}, (e,s) => {});

                    return resp;
                });
            }
        });
    } catch(e){
        return new GraphQLError(e)
    }
};
