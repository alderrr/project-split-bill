const connectMongoDB = require("../config/mongoDB");

const connectDB = async (req, res, next) => {
  try {
    const { db } = await connectMongoDB();
    if (!db) {
      throw {
        message: "Database not found",
      };
    }
    req.db = db;
    next();
  } catch (error) {
    console.log(error, "connectDB");
    next(error);
  }
};

module.exports = connectDB;
