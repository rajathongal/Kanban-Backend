const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const path = require("path");
const  connectDB  = require("./config/database");
const { graphqlHTTP } = require('express-graphql');
const multer = require('multer');
const schema = require('./GraphQL/query');
const { graphqlUploadExpress } = require('graphql-upload')
const UserImageUpload = require('./controllers/kanban/UserImageUpload');
const UserImageFetch = require('./controllers/kanban/UserImageFetch');

// store config variables in dotenv
require('dotenv').config();

//server creation
const app = express();

//security and cors policy
app.use(cors({credentials: true, origin: `${process.env.ALLOWEDORIGIN}`, exposedHeaders:['Authorization']}));

//Init BodyParser
app.use(bodyParser.json({ 
    limit: '50mb'
  }))
  
  app.use(bodyParser.urlencoded({ 
    extended: false,
    limit: '50mb',
    parameterLimit: 100000
  }))

//connect to database
connectDB();

//route Init
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.use('/graphql', 
graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })
,(req,res) => {
  graphqlHTTP({
    schema,
    graphiql: true,
    context: {req,res}
  })(req,res);
}
)

//Init multer
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,  //10MB
  },
});

app.post("/UserImageUpload", multerMid.single("file"), UserImageUpload);
app.post("/UserImageFetch", UserImageFetch)

  
module.exports = app;