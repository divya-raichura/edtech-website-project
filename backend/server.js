const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// routes imports
const courseRoutes = require("./routes/courseRoutes");

// extra imports
const { errorHandlerMiddleware } = require("./middleware/errorHandler");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/courses", courseRoutes);

// error middleware
app.use(errorHandlerMiddleware);

app.listen(port, () => console.log(`Server listening on port ${port}`));
