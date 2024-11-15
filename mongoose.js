var config = require('./config');


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const uri = config.MONGO_URI;

// let connection;
// const connect = async () => {
//     connection = await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       bufferCommands: false, // Disable mongoose buffering
//       serverSelectionTimeoutMS: 5000
//     }).then(() => mongoose);
//     console.log("this is the connection: ",connection)
//     return connection;
// };

// async function getConnection() {
//   const connection = await connect();
//   console.log("after connection:", uri)
//   return connection;
// }


// module.exports = { connect, getConnection };

const connectToDatabase = async () => {
  let isConnected;
  if (isConnected) {
    console.log('using existing database connection');
    return Promise.resolve();
  }

  console.log('using new database connection');
  const database = await mongoose.connect(uri, {useNewUrlParser: true});
  isConnected = database.connections[0].readyState;

  console.log("is connected: ", isConnected)
  // return isConnected;
};

module.exports = connectToDatabase;