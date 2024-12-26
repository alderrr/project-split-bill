if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dbname = process.env.MONGODB_DBNAME;

// Create a MongoClient with a MongoClientOptions object to set the Stable API verison
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(dbname).command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB");
  } finally {
    // Ensures that the clinet will close when you finish/error
    await client.close();
  }
}
run();
