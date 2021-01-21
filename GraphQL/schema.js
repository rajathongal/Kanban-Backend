const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        accessToken: {type: GraphQLString},
        rfsrt: {type: GraphQLString}
        
    })
});

const ImageResponse = new GraphQLObjectType({
    name: 'ImageResponse',
    fields: () => ({
        success: {type: GraphQLBoolean}
    })
});

const ListSchema = new GraphQLObjectType({
    name: 'ListSchema',
    fields: () => ({
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        cardIds: {type: new GraphQLList(GraphQLString)}
    })
});

const CommentSchema = new GraphQLObjectType({
    name: 'CommentSchema',
    fields: () => ({
        _id: { type: GraphQLString},
        cardId: { type: GraphQLString},
        createdAt: { type: GraphQLString},
        memberId: { type: GraphQLString},
        message: { type: GraphQLString},
    })
});

const CheckItems = new GraphQLObjectType({
    name: 'CheckItems',
    fields: () => ({
        _id: { type: GraphQLString},
        name: {type: GraphQLString},
        state: {type: GraphQLString},
    })
});

const CheckListSchema = new GraphQLObjectType({
    name: 'CheckListSchema',
    fields: () => ({
        _id: { type: GraphQLString},
        name: {type: GraphQLString},
        checkItems: {type: new GraphQLList(CheckItems)}
    })
});

const CardSchema = new GraphQLObjectType({
    name: 'CardSchema',
    fields: () => ({
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        attachments: { type: new GraphQLList(GraphQLString)},
        checklists: { type: new GraphQLList(CheckListSchema)},
        comments: { type: new GraphQLList(CommentSchema)},
        cover: {type: GraphQLString},
        due: {type: GraphQLString},
        isSubscribed: {type: GraphQLBoolean},
        listId: {type: GraphQLString},
        memberIds: {type: new GraphQLList(GraphQLString)},
        description: {type: GraphQLString},
    })
})

const BoardSchema = new GraphQLObjectType({
    name: 'BoardSchema',
    fields: () => ({
        lists: {type: new GraphQLList(ListSchema)},
        cards: {type: new GraphQLList(CardSchema)},
        members: {type: new GraphQLList(UserType)}
    })
});

const MoveSchema = new GraphQLObjectType({
    name: 'MoveSchema',
    fields: () => ({
        cardId: { type: GraphQLString},
        listId: { type: GraphQLString},
        position: {type: GraphQLInt}
    })
});



module.exports = { UserType, ImageResponse, ListSchema, CardSchema, BoardSchema, MoveSchema, CommentSchema, CheckListSchema, CheckItems }