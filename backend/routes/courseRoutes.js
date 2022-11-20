const express = require("express");
const router = express.Router();

// import controller
const {
  getAllCourses,
  postCourses,
  getSingleCourse,
  getFavorites,
  addToFavorites,
  deleteFavorites,
} = require("../controllers/coursesController");

const authMiddleware = require("../middleware/authentication");

/**
 * GET     public      /api/courses/
 * POST    private     /api/courses/course
 * GET     public      /api/courses/course/:id
 * GET     private     /api/courses/favorites
 * POST    private     /api/courses/favorites/
 * DELETE  private     /api/courses/favorites/:id
 */

router.route("/").get(getAllCourses);

router.route("/course").post(authMiddleware, postCourses);

router.route("/course/:id").get(getSingleCourse);

router
  .route("/favorites")
  .get(authMiddleware, getFavorites)
  .post(authMiddleware, addToFavorites);

router.route("/favorites/:id").delete(authMiddleware, deleteFavorites);

module.exports = router;
