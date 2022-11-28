const { verify } = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");
const asyncWrapper = require("../middleware/asyncWrapper");

const verifyUser = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(
    "headers recieved authHeader",
    authHeader,
    "req header",
    req.headers
  );

  // authHeader should be there and it should start with bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("auth invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const verification = verify(token, process.env.SECRET_TOKEN);
    req.user = { userId: verification.userId, name: verification.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }

  if (!token) {
    throw new UnauthenticatedError("Not authorized, no token provided");
  }
});

module.exports = verifyUser;
