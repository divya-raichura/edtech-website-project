/**
 * GET     public      /api/courses/
 * GET     private     /api/courses/course/:id
 * POST    private     /api/courses/course
 * GET     private     /api/courses/favorites
 * POST    private     /api/courses/favorites/
 * DELETE  private     /api/courses/favorites/:id
 */

// imports
const Courses = require("../models/courseModel");
const Favorites = require("../models/favModel");
const User = require("../models/userModel");
const asyncHandler = require("../middleware/asyncWrapper");
const { BadRequestError, NotFoundError } = require("../errors");

// @desc     Get all courses
// @route    GET /api/courses
// @access   Public
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Courses.find().sort("createdAt");
  res.status(200).json({ count: courses.length, courses });
});

// @desc     Get single courses
// @route    GET /api/courses/course/:id
// @access   Public
const getSingleCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Courses.findOne({ _id: id });

  if (!course) {
    throw new NotFoundError(`No course with id ${id}`);
  }

  res.status(200).json({ course });
});

// @desc     Post course
// @route    POST /api/courses/course
// @access   Private
const postCourses = asyncHandler(async (req, res) => {
  const { name, description, image, taughtBy } = req.body;

  if (!name || !description || !image) {
    throw new BadRequestError("Please provide all fields");
  }

  const course = await Courses.create(req.body);
  res.status(200).json({ course });
});

// @desc     Get favorite courses
// @route    GET /api/courses/favorites
// @access   Private
const getFavorites = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const user = await User.findById(userId);

  // make sure that does the user/course even exists?
  if (!user) {
    throw new BadRequestError("User not found");
  }

  const favs = await Favorites.find({ favoritedBy: userId });

  res.status(200).json({ favs });
});

// @desc     Post course to favorite
// @route    POST /api/courses/favorites/
// @access   Private
const addToFavorites = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  // note here, I don't know what will be sent in body
  // id or _id?
  const { _id } = req.body;

  if (!_id) {
    throw new BadRequestError("Please provide the course id");
  }

  const user = await User.findById(userId);
  const course = await Courses.findById(_id);

  // make sure that does the user/course even exists?
  if (!user) {
    throw new BadRequestError("User not found");
  }

  if (!course) {
    throw new BadRequestError("Course not found");
  }

  const fav = await Favorites.create({
    favoritedBy: userId,
    favoritedCourse: _id,
  });

  res.status(200).json({ fav });
});

// @desc      Delete course from favorite
// @route     DELETE /api/courses/favorites/:id
// @access    Private
const deleteFavorites = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const courseId = req.params.id;

  const user = await User.findById(userId);
  const course = await Courses.findById(courseId);

  // make sure that does the user/course even exists?
  if (!user) {
    throw new BadRequestError("User not found");
  }

  if (!course) {
    throw new BadRequestError("Course not found");
  }

  const deletedFav = await Favorites.findOneAndDelete({
    favoritedBy: userId,
    favoritedCourse: courseId,
  });

  console.log("deleted fav: ", deletedFav);

  if (!deletedFav) {
    throw new NotFoundError(
      `No favorite with user id ${userId} and course id ${courseId}`
    );
  }
  res.status(200).send({ msg: "success" });
});

module.exports = {
  getAllCourses,
  getSingleCourse,
  getFavorites,
  postCourses,
  addToFavorites,
  deleteFavorites,
};
