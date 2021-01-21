const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLList
} = graphql;
const { UserType, BoardSchema, CommentSchema, CheckListSchema } = require('./schema');
const { ListSchema, CardSchema, MoveSchema } = require('./schema');
const {ImageResponse} = require('./schema');
const SignUpUser = require('../controllers/auth/signup');
const { GraphQLUpload } = require('graphql-upload');
const signIn = require('../controllers/auth/signin');
const UserImageUpload = require('../controllers/kanban/UserImageUpload');
const ContiniousAuthVerify = require('../controllers/auth/ContiniousAuthVerify');
const {createWriteStream} = require('fs');
const RefreshAccess = require('../controllers/auth/RefreshAccess');
const ListADD  = require('../controllers/kanban/ListAdd');
const ListUpdate = require('../controllers/kanban/ListUpdate');
const ListClear = require('../controllers/kanban/ListClear');
const ListDelete = require('../controllers/kanban/ListDelete');
const CreateCard = require('../controllers/kanban/CreateCard');
const GetBoard = require('../controllers/kanban/Board');
const CardUpdate = require('../controllers/kanban/CardUpdate');
const CardDesUpdate = require('../controllers/kanban/CardDesUpdate');
const MoveCard = require('../controllers/kanban/MoveCard');
const DeleteCard = require('../controllers/kanban/DeleteCard');
const CommentAdd = require('../controllers/kanban/CommentAdd');
const CheckListAdd = require('../controllers/kanban/CheckListAdd');
const CardSubscription = require('../controllers/kanban/CardSubscription');
const CheckListUpdate = require('../controllers/kanban/CardSubscription');

exports.mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signInUser: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString)},
                password: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, {email, password}, context) {
               return signIn(email, password).then(resp =>{
                   context.res.setHeader('Authorization', `Bearer ${resp.accessToken}`)
                   return resp
               }).catch(err => console.log(err))
            }
        },
        signUpUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                email: { type: new GraphQLNonNull(GraphQLString)},
                password: { type: new GraphQLNonNull(GraphQLString)},
                image: {type: GraphQLUpload}
            },
            resolve(parentValue, {name, email, password}, context) {
               
                return SignUpUser(name, email, password, context).then(resp =>{
                    //context.res.cookie('accesstoken', resp.accesstoken, {httpOnly: true});
                    //context.res.cookie('rfsrt', resp.rfsrt, {httpOnly: true});
                    return resp;
                });
            }
        },
        UserImageUpload: {
            type: ImageResponse,
            description: 'Upload User Image',
            args: {
                email: { type: new GraphQLNonNull(GraphQLString)},
                image: {
                    description: 'Image File', 
                    type: new GraphQLNonNull(GraphQLUpload)
                }
            },
            async resolve(parentValue, {image,email}, context){
                var buffer;
                const { filename, mimetype, createReadStream } = await image;
                const stream = createReadStream();
                await new Promise((resolve, reject) => {
                    stream.on('error', error => {
                       unlink(filename, () => {
                          reject(error);
                        });
                    }).pipe(createWriteStream(filename))
                      .on('error', reject)
                      .on('finish', resolve)
                });

                  return {success: true}
            }
            
        },
        ContiniousAuthVerify: {
            type: UserType,
            async resolve(parentValue, args, context) { 
                return await ContiniousAuthVerify(context).then(resp => {
                    return resp;
                }).catch(e => console.log(e))
            }
        },
        Refresh: { 
            type: UserType,
            async resolve(parentValue, args, context) {
                
                return await RefreshAccess(context).then(resp => {
                    context.res.setHeader('Authorization', `Bearer ${resp.accessToken}`)
                    return resp
                }).catch(err => console.log(err))
            }
        },
        list: {
            type: ListSchema,
            args: { 
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parentValue, args){
                return await ListADD(args).then(res => {return res});
            }
        },
        listUpdate: {
            type: ListSchema,
            args: {
                listId: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parentValue, args){
                return await ListUpdate(args).then(res => {return res})
            }
        },
        listClear: { 
            type: ListSchema,
            args: {
                listId: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue, args){
                return await ListClear(args).then(res => {return res});
            }
        },
        listDelete: { 
            type: ListSchema,
            args: {
                listId: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue, args){
                return await ListDelete(args).then(res => {return res});
            }
        },
        createCard: { 
            type: CardSchema,
            args: {
                listId: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parentValue, args){
                return await CreateCard(args).then(res => {return res});
            }
        },
        board: {
            type: BoardSchema,
            async resolve(parentValue, args){
                return await GetBoard().then(res => {return res});
            }
        },
        cardUpdate: {
            type: CardSchema,
            args: {
                cardId: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                
            },
            async resolve(parentValue, args){
                return await CardUpdate(args).then(res => {return res});
            }
        },
        cardDesUpdate:{
            type: CardSchema,
            args: {
                cardId: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLString}
            },
            async resolve(parentValue, args){
                return await CardDesUpdate(args).then(res => {return res});
            }
        },
        moveCard: {
            type: MoveSchema,
            args: {
                cardId: {type: new GraphQLNonNull(GraphQLString)},
                listId: {type: new GraphQLNonNull(GraphQLString)},
                position: {type: graphql.GraphQLInt}
            },
            async resolve(parentValue, args){
                return await MoveCard(args).then(res => {return res});
            }
        },
        deleteCard: {
            type: ImageResponse,
            args: {
                cardId: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue, args){
                return await DeleteCard(args).then(res => {return res});
            }
        },
        comment: {
            type: CommentSchema,
            args: {
                cardId: {type: new GraphQLNonNull(GraphQLString)},
                message: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parentValue, args, context){
                return await CommentAdd(args, context).then(res => {return res});
            }
        },
        checklist: {
            type: CheckListSchema,
            args: {
                cardId: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parentValue, args, context){
                return await CheckListAdd(args).then(res => {return res});
            }
        },
        cardSubscription: {
            type: CardSchema,
            args: {
                    cardId: {type: new GraphQLNonNull(GraphQLString)},
                    isSubscribed: {type: new GraphQLNonNull(GraphQLBoolean)}
                },
                async resolve(parentValue, args){
                    return await CardSubscription(args).then(res => {return res})
                }
        },
        checkListUpdated: {
            type: CheckListSchema,
            args: {
                cardId: {type: new GraphQLNonNull(GraphQLString)},
                checklistId: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parentValue, args){
                
                return await CheckListUpdate(args).then(res => {
                    console.log(res.checklists)
                    return res.checklists[0]
                });
            }
        }
    }
});

/**let rs = new ArrayBuffer
                var readStream = createReadStream('./data.txt');
                readStream.on('open', () => {
                        console.log('Stream opened...');
                });
                    
                readStream.on('data', async chunk => {
                        var buffer
                        buffer += await Buffer.from(JSON.stringify(chunk));
                        
                });

                readStream.pipe(buffer)
                console.log(buffer) */