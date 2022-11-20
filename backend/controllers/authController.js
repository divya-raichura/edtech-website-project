// imports
const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../models/userModel");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");

// @desc     Register User
// @route    POST /api/auth/register
// @access   Public
const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  // check if all fields provided
  if (!name || !email || !password) {
    throw new BadRequestError("Please add all fields");
  }

  console.log(name, email, password);

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    console.log(userExists);
    throw new BadRequestError("User already exists");
  }

  // hash password in model and create user here
  const user = await User.create(req.body);

  if (user) {
    res
      .status(201)
      .json({ user: { name: user.name }, token: user.createToken() });
  } else {
    throw new BadRequestError("Invalid user data");
  }
});

// @desc     Login User
// @route    POST /api/auth/login
// @access   Public
const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("unauthenticated user");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("unauthenticated user");
  }

  const token = user.createToken();
  res.status(201).json({ user: { name: user.name }, token });
});

// // @desc     Login User
// // @route    POST /api/auth/login
// // @access   Public
// const login = (req, res) => {
//   res.send("login");
// };

module.exports = { register, login };
