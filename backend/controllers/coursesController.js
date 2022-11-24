/**
 * GET     public      /api/courses/
 * POST    private     /api/courses/
 * Get    private     /api/courses/myCourses
 * GET     public      /api/courses/course/:id
 * GET     private     /api/courses/favorites
 * POST    private     /api/courses/favorites/
 * DELETE  private     /api/courses/favorites/:id
 * DELETE  private     /api/courses/:id
 */

// imports
const Courses = require("../models/courseModel");
const Favorites = require("../models/favModel");
const User = require("../models/userModel");
const asyncHandler = require("../middleware/asyncWrapper");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

// @desc     Get all courses
// @route    GET /api/courses
// @access   Public
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Courses.find().sort("createdAt");
  res.status(200).json({
    count: courses.length,
    msg: "success",
    courses,
  });
});

// @desc     Get my courses
// @route    GET /api/courses/myCourses
// @access   Private
const getMyCourses = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new BadRequestError("unauthenticated");
  }
  const userId = req.user.userId;
  const courses = await Courses.find({ createdBy: userId });
  res.status(200).json({ courses });
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

  res.status(200).json({ msg: "success", course });
});

// @desc     Post course
// @route    POST /api/courses/course
// @access   Private
const postCourses = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new BadRequestError("unauthenticated");
  }
  req.body.createdBy = req.user.userId;
  req.body.creator = req.user.name;
  const { name, description, image, price } = req.body;

  if (!name || !description || !image || !price) {
    throw new BadRequestError("Please provide all fields");
  }

  const course = await Courses.create(req.body);
  res.status(201).json({ msg: "success", course });
});

// @desc     DELETE course
// @route    DELETE /api/courses/:id
// @access   Private
const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!req.user) {
    throw new BadRequestError("User not found");
  }

  // @make sure only user that created course can delete it
  const course = await Courses.findById(id);
  if (course.createdBy.toString() !== req.user.userId) {
    throw new UnauthenticatedError("user not authorized to delete");
  }
  await Courses.findByIdAndDelete(id);
  res.status(202).json({ msg: "success" });
});

// @desc     Get favorite courses
// @route    GET /api/courses/favorites
// @access   Private
const getFavorites = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new BadRequestError("User not found");
  }

  const userId = req.user.userId;

  const user = await User.findById(userId);

  // make sure that does the user/course even exists?
  if (!user) {
    throw new BadRequestError("User not found");
  }

  const favsIds = await Favorites.find({ favoritedBy: userId });
  // console.log(favsIds);

  const favArr = favsIds.map((item) => {
    return item.favoritedCourse;
  });
  // console.log("favarr", favArr);

  const favs = await Courses.find({ _id: { $in: favArr } });
  // console.log("favs : ", favs);

  /** @Bug need to return fav courses
   *
   * todo 1: redefine model such that the courses contains array of users that have liked the course
   * todo 2 -> done: find out how to query current model
   */

  res.status(200).json({ favs });
});

// @desc     Post course to favorite
// @route    POST /api/courses/favorites/
// @access   Private
const addToFavorites = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new BadRequestError("User not found");
  }

  const userId = req.user.userId;

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

  // check if course is already in fav
  // was using 'const' hence gave error
  const fav = await Favorites.findOne({
    favoritedBy: userId,
    favoritedCourse: _id,
  });
  if (fav) {
    throw new BadRequestError("Already in fav");
  }

  const createFav = await Favorites.create({
    favoritedBy: userId,
    favoritedCourse: _id,
  });

  res
    .status(201)
    .json({ msg: "success", courseName: course.name, favDetails: createFav });
});

// @desc      Delete course from favorite
// @route     DELETE /api/courses/favorites/:id
// @access    Private
const deleteFavorites = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new BadRequestError("User not found");
  }

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

  if (!deletedFav) {
    throw new NotFoundError(
      `No favorite with user id ${userId} and course id ${courseId}`
    );
  }
  res.status(202).json({ msg: "success" });
});

module.exports = {
  getAllCourses,
  getSingleCourse,
  postCourses,
  getFavorites,
  getMyCourses,
  addToFavorites,
  deleteCourse,
  deleteFavorites,
};
