//imports
const mongoose = require("mongoose");//ORM tool for mongodb
require("dotenv").config();

//temp var init
let connectionString = "";
mongoose.Promise = global.Promise;

//connection logic
if (process.env.NODE_ENV === "production") {
  
    connectionString =  "mongodb+srv://ardentrascal:qDj4YQtAWGL3SgWV@cluster0.kb7jo.mongodb.net/kanban?retryWrites=true&w=majority" ;

  } else if (process.env.NODE_ENV === "development") {

    connectionString = process.env.TEST_MONGODB_URI;

  } else {

    connectionString = "mongodb+srv://ardentrascal:qDj4YQtAWGL3SgWV@cluster0.kb7jo.mongodb.net/kanban?retryWrites=true&w=majority";
  }

  const connectDB = async () => {
    try {
      await mongoose.connect(connectionString, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        dbName: "kanban",
      });
  
      console.log("MongoDB connected...");
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
};

  
module.exports = connectDB; 
