const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 5000;
const app = express();

// routes imports
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");

// db and error imports
const connectDb = require("./db/db");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFound = require("./middleware/not-found");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// error middleware
app.use(errorHandlerMiddleware);
app.use(notFound);

// server and db
async function start() {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
