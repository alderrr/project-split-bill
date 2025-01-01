if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connectDB = require("./middlewares/connectDB");

const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers/index");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(connectDB);

app.use(router);

app.listen(port, () => {
  console.log(`Connected to Port: ${port}`);
});
