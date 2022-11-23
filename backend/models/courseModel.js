const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide course name"],
      maxlength: 50,
    },
    price: {
      type: Number,
      required: [true, "Please provide course name"],
      default: 5,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: 240,
    },
    image: {
      type: String,
      required: [true, "Please provide image"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide userId to store who created course"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
