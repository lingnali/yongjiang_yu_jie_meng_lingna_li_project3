const express = require("express");
const router = express.Router();
const User = require("./models/user");
const asyncWrapper = require("./utils/asyncWrapper");

router.get("/authenticate", (req, res) => {
  if (!req.session.user_id) {
    return res.send("err");
  } else {
    res.send(req.session.username);
  }
});

router.post(
  "/register",
  asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    res.send("success");
  })
);

router.post(
  "/login",
  asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
      req.session.user_id = foundUser._id;
      req.session.username = foundUser.username;
      res.send("success");
    } else {
      res.send("fail");
    }
  })
);

router.post("/logout", (req, res) => {
  // req.session.user_id = null;
  req.session.destroy();
  res.send("Logout successful!");
});

module.exports = router;
