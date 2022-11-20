const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide course name"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    image: {
      type: String,
      required: [true, "Please provide image"],
    },
    taughtBy: {
      type: String,
      required: [true, "Please provide description"],
      default: "Bhide Sir",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
