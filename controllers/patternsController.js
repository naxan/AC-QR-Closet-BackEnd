const db = require("../models");

const index = (req, res) => {
  db.Pattern.find({})
    .populate("author", "username _id")
    .exec((err, allPatterns) => {
      if (err)
        return res.status(400).json({
          status: 400,
          error: "Something went wrong, please try again.",
        });

      res.json(allPatterns);
    });
};

const show = (req, res) => {
  db.Pattern.findById(req.params.patternId)
    .populate("author", "username _id")
    .exec((err, foundPattern) => {
      if (err)
        return res.status(400).json({
          status: 400,
          error: "Something went wrong, please try again.",
        });

      res.json(foundPattern);
    });
};

const create = (req, res) => {
  req.body.author = req.params.userId;

  db.Pattern.create(req.body, (err, newPattern) => {
    if (err)
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, please try again.",
      });

    db.User.findById(req.params.userId, (err, foundUser) => {
      foundUser.createdPatterns.push(newPattern);
      foundUser.save((err, savedUser) => {
        if (err)
          return res.status(400).json({
            status: 400,
            error: "Something went wrong, please try again.",
          });
      });

      res.json(newPattern);
    });
  });
};

const update = (req, res) => {
  db.Pattern.findByIdAndUpdate(
    req.params.patternId,
    req.body,
    { new: true },
    (err, updatedPattern) => {
      if (err)
        return res.status(400).json({
          status: 400,
          error: "Something went wrong, please try again.",
        });

      res.json(updatedPattern);
    }
  );
};

const destroy = (req, res) => {
  db.Pattern.findByIdAndDelete(req.params.patternId, (err, deletedPattern) => {
    if (err)
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, please try again.",
      });

    res.json(deletedPattern);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
