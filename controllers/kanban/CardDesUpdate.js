const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const Kanban = require('../../models/kanban/kanban');

module.exports = async function CardDesUpdate (args) {
        try{
            return await Kanban.findOneAndUpdate({_id: args.cardId},{description: args.description},{}, (e,s) => {}).then(async(res) =>{
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
