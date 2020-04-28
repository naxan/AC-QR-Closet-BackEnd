const db = require("../models");
const fs = require("fs");
const patternsController = require("./patternsController");

const index = (req, res) => {
  db.User.find({})
    .populate("createdPatterns", "title description textCode image")
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
  db.User.findById(req.params.userId)
    .populate("createdPatterns", "title description textCode image")
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
  // check if update has new pro pic
  if (req.body.profilePic) {
    db.User.findById(req.params.userId, (err, foundUser) => {
      if (err)
        return res.status(400).json({
          status: 400,
          error: "Something went wrong, please try again.",
        });

      // check if user had previous pro pic and delete + unlink previous pic if so
      if (foundUser.profilePic) {
        fs.unlink(foundUser.profilePic.imageData, (err) => {
          if (err)
            return res.status(400).json({
              status: 400,
              error: "Something went wrong, please try again.",
            });
          console.log("picture unlinked");
        });

        db.Image.findByIdAndDelete(foundUser.profilePic._id, (err) => {
          if (err)
            return res.status(400).json({
              status: 400,
              error: "Something went wrong, please try again.",
            });
          console.log("picture deleted");

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
        });

        // if user did not have previous pro pic, finish the update
      } else {
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
      }
    });

    // if user did not add new pro pic, no need to check, just update info
  } else {
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
  }
};

const destroy = (req, res) => {
  // delete user
  db.User.findByIdAndDelete(req.params.userId, (err, deletedUser) => {
    if (err)
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, please try again.",
      });

    // check if user has a profile pic uploaded
    // if so, delete that pic
    // if not, simply delete user
    if (deletedUser.profilePic) {
      fs.unlink(deletedUser.profilePic.imageData, (err) => {
        if (err)
          return res.status(400).json({
            status: 400,
            error: "Something went wrong, please try again.",
          });
      });

      db.Image.findByIdAndDelete(deletedUser.profilePic._id, (err) => {
        if (err)
          return res.status(400).json({
            status: 400,
            error: "Something went wrong, please try again.",
          });
      });
    }

    // map through user's patterns, delete patterns and their images
    if (deletedUser.createdPatterns.length > 0) {
      deletedUser.createdPatterns.map((patternId) => {
        db.Pattern.findById(patternId, (err, foundPattern) => {
          if (err)
            return res.status(400).json({
              status: 400,
              error: "Something went wrong, please try again.",
            });

          // unlink images from patterns
          fs.unlink(foundPattern.image.imageData, (err) => {
            if (err)
              return res.status(400).json({
                status: 400,
                error: "Something went wrong, please try again.",
              });
            console.log("image unlinked");
          });

          // delete image data from database
          db.Image.findByIdAndDelete(foundPattern.image._id, (err) => {
            if (err)
              return res.status(400).json({
                status: 400,
                error: "Something went wrong, please try again.",
              });
            console.log("image deleted");
          });

          // now delete pattern
          db.Pattern.findByIdAndDelete(patternId, (err) => {
            if (err)
              return res.status(400).json({
                status: 400,
                error: "Something went wrong, please try again.",
              });
            console.log("pattern deleted");
          });
        });
        // end map
      });
    } // end patterns if statement

    res.json(deletedUser);
  });
};

const checkUsername = (req, res) => {
  db.User.find({ username: req.body.username }, (err, foundUser) => {
    if (err)
      return res.status(400).json({
        status: 400,
        ok: false,
        message: "Something went wrong, please try again",
      });

    if (foundUser) {
      return res.status(400).json({
        status: 400,
        ok: false,
        message: "Username already taken",
      });
    }
    res.status(200).json({
      status: 200,
      ok: true,
    });
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  checkUsername,
};
