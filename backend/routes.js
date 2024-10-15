const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const users = {
    1: { id: 1, name: "Somkiat Pui" },
  };

  if (users[id]) {
    res.json(users[id]);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

module.exports = router;
