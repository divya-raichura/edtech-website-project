const express = require("express");
const router = express.Router();

// import controller
const {
  getAllCourses,
  getFavorites,
  deleteFavorites,
  addToFavorites,
} = require("../controllers/coursesController");

router.get("/", getAllCourses);
router.get("/favorites", getFavorites);
router.post("/:id", addToFavorites);
router.delete("/favorites/:id", deleteFavorites);

module.exports = router;
