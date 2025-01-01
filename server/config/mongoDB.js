if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dbname = process.env.MONGODB_DBNAME;

let cachedClient = null;
let cachedDB = null;

const connectMongoDB = async () => {
  if (cachedClient && cachedDB) {
    console.log("Reusing existing MongoDB connection");
    return { client: cachedClient, db: cachedDB };
  }
  console.log("Creating new MongoDB connection");
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect(); // Connect the client to server
  const db = client.db(dbname);
  cachedClient = client;
  cachedDB = db;
  return { client, db };
};

module.exports = connectMongoDB;
