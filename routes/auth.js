const express = require("express");
const router = express.Router();


const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (id) => {
  return jwt.sign({id}, JWT_SECRET, { expiresIn: "1d" });
}

const prisma = require("../prisma");


router.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);
  if (!token) return next();

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUniqueOrThrow({
      where: { id }
    });
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
});


router.post("/register", async (req, res, next) => {
  // Grab credentials of user
  const { username, password } = req.body;

  try {
    // Create a new User with those creds
    const user = await prisma.user.register(username, password);

    // Store the id into a token
    const token = createToken(user.id);

    // Send the token back
    res.status(201).json({ token });
  } catch (e) {
    next(e);
  }
});



router.post("/login", async (req, res, next) => {
  // Grab the creds of the user
  const { username, password} = req.body;
  try {
    // Find user in database based on the creds and log them in
    const user = await prisma.user.login(username, password);
  
    // Store the id into a token
    const token = createToken(user.id);

    // Send back the token
    res.status(201).json({ token });

  } catch (e) {
    next(e);
  }
});

const authenticate = (req, res, next) => {
  if (req.user) {  //req.customer?? maybe not cus i dont have a customer model
    next();
  } else {
    next({
      status: 401,
      message: "You must be logged in."
    });
  }
};

module.exports = {
  router,
  authenticate
};