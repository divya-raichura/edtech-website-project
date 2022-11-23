const express = require("express");
const router = express.Router();

// import controller
const {
  getAllCourses,
  postCourses,
  getSingleCourse,
  getFavorites,
  addToFavorites,
  deleteCourse,
  deleteFavorites,
} = require("../controllers/coursesController");

const authMiddleware = require("../middleware/authentication");

/**
 * GET     public      /api/courses/
 * POST    private     /api/courses/
 * GET     public      /api/courses/course/:id
 * GET     private     /api/courses/favorites
 * POST    private     /api/courses/favorites/
 * DELETE  private     /api/courses/favorites/:id
 * DELETE  private     /api/courses/:id
 */

router.route("/").get(getAllCourses);

router.route("/").post(authMiddleware, postCourses);

router.route("/:id").delete(authMiddleware, deleteCourse);

router.route("/course/:id").get(getSingleCourse);

router
  .route("/favorites")
  .get(authMiddleware, getFavorites)
  .post(authMiddleware, addToFavorites);

router.route("/favorites/:id").delete(authMiddleware, deleteFavorites);

module.exports = router;
