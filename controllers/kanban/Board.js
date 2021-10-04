const graphql = require('graphql');
const {
    GraphQLError
} = graphql;
const KanbanList = require('../../models/kanban/KanbanList');
const Kanban = require('../../models/kanban/kanban');
const Users = require('../../models/auth/user');

module.exports = async function GetBoard () {
    try{
        var list = await KanbanList.find().then(res => {return res});
        var card = await Kanban.find().then(res => {return res});
        var member = await Users.find().select('_id name').then(res => {return res});
        
        return {
            lists: list,
            cards: card,
            members: member
        }
    } catch(e){
        return new GraphQLError(e)
    }
};
