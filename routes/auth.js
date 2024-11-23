const express = require("express");
const router = express.Router();
module.exports = router;

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