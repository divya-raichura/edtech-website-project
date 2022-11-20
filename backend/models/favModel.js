const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  favoritedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [
      true,
      "Please provide userId in order to store who added to favorite",
    ],
  },
  favoritedCourse: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: [
      true,
      "Please provide courseId in order to store what needs to be added to favorite",
    ],
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
