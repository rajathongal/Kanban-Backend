const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const Kanban = require('../../models/kanban/kanban');

module.exports = async function CardSubscription (args) {
        try{
            return await Kanban.findOneAndUpdate({_id: args.cardId},{ $set: { isSubscribed: args.isSubscribed }},{}, (e,s) => {}).then(async(res) =>{
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
