const asyncHandler = require("express-async-handler");

// get all
const getAllCourses = asyncHandler(async (req, res) => {
  res.send("all courses");
});

// get fav
const getFavorites = asyncHandler(async (req, res) => {
  res.send("Favorites");
});

// post fav
const addToFavorites = asyncHandler(async (req, res) => {
  res.send("added to fav");
});

// delete fav
const deleteFavorites = asyncHandler(async (req, res) => {
  res.send("Delete Favorites");
});

module.exports = {
  getAllCourses,
  getFavorites,
  addToFavorites,
  deleteFavorites,
};
