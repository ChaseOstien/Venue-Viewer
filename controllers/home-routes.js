const router = require("express").Router();
const { Comment, User } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.json({ message: "looks cool" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
