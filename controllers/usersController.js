const db = require("../models");

const index = (req, res) => {
  db.User.find({})
    .populate("createdPatterns", "title textCode image")
    .exec((err, allUsers) => {
      if (err)
        return res.status(400).json({
          status: 400,
          error: "Something went wrong, please try again.",
        });

      res.json(allUsers);
    });
};

const show = (req, res) => {
  db.User.find(req.params.id)
    .populate("createdPatterns", "title textCode image")
    .exec((err, foundUser) => {
      if (err)
        return res.status(400).json({
          status: 400,
          error: "Something went wrong, please try again.",
        });

      res.json(foundUser);
    });
};

const create = (req, res) => {
  db.User.create(req.body, (err, newUser) => {
    if (err)
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, please try again.",
      });

    res.json(newUser);
  });
};

const update = (req, res) => {
  db.User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err)
        return res.status(400).json({
          status: 400,
          error: "Something went wrong, please try again.",
        });

      res.json(updatedUser);
    }
  );
};

const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.params.userId, (err, deletedUser) => {
    if (err)
      return res
        .status(400)
        .json({
          status: 400,
          error: "Something went wrong, please try again.",
        });

    res.json(deletedUser);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
