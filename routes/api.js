const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// USER ROUTES
router.get("/users", ctrl.users.index);
router.get("/users/:userId", ctrl.users.show);
router.post("/users", ctrl.users.create);
router.put("/users/:userId", ctrl.users.update);
router.delete("/users/:userId", ctrl.users.destroy);
router.post("/users/check-username", ctrl.users.checkUsername);

// PATTERN ROUTES
router.get("/patterns", ctrl.patterns.index);
router.get("/patterns/:patternId", ctrl.patterns.show);
router.post("/patterns/new/:userId", ctrl.patterns.create);
router.put("/patterns/:patternId", ctrl.patterns.update);
router.delete("/patterns/:patternId", ctrl.patterns.destroy);

module.exports = router;
