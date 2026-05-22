const router = require("express").Router();

router.post("/", (req, res) => {
  res.json({ msg: "Activity logged", data: req.body });
});

module.exports = router;