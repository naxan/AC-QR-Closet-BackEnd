const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// USER ROUTES
router.get("/users", ctrl.students.index);
router.get("/users/:userId", ctrl.students.show);
router.post("/users", ctrl.students.create);
router.put("/users/:userId", ctrl.students.update);
router.delete("/users/:userId", ctrl.students.destroy);

// PATTERN ROUTES
router.get("/patterns", ctrl.patterns.index);
router.get("/patterns/:patternId", ctrl.patterns.show);
router.post("/patterns", ctrl.patterns.create);
router.put("/patterns/:patternId", ctrl.patterns.update);
router.delete("/patterns/:patternId", ctrl.patterns.destroy);

module.exports = router;
