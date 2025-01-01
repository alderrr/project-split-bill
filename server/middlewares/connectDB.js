const connectMongoDB = require("../config/mongoDB");

const connectDB = async (req, res, next) => {
  try {
    const { db } = await connectMongoDB();
    req.db = db;
    next();
  } catch (error) {
    console.log(error, "connectDB");
    next(error);
  }
};

module.exports = connectDB;
