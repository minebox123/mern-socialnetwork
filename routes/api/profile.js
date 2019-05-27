const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load profile model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/profile/test
// @desc Tests profile route
// @access Public route
router.get("/test", (req, res) => {
  res.json({
    msg: "Profile Works"
  });
});

// @route GET api/profile
// @desc Get current users profile
// @access Private route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile
// @desc  Create or edit user profile
// @access Private route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) {
      return (profileFields.handle = req.body.handle);
    }
    if (req.body.company) {
      return (profileFields.company = req.body.company);
    }
    if (req.body.website) {
      return (profileFields.website = req.body.website);
    }
    if (req.body.location) {
      return (profileFields.location = req.body.location);
    }
    if (req.body.bio) {
      return (profileFields.bio = req.body.bio);
    }
    if (req.body.status) {
      return (profileFields.status = req.body.status);
    }
    if (req.body.githubUserName) {
      return (profileFields.githubUserName = req.body.githubUserName);
    }
    // Skills - Split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields = req.body.skills.split(",");
    }
    // Socila
    profileFields.social = {};
    if (req.body.youtube) {
      return (profileFields.sociel.youtube = req.body.youtube);
    }
    if (req.body.twitter) {
      return (profileFields.sociel.twitter = req.body.twitter);
    }
    if (req.body.linkedin) {
      return (profileFields.sociel.linkedin = req.body.linkedin);
    }
    if (req.body.facebook) {
      return (profileFields.sociel.facebook = req.body.facebook);
    }
    if (req.body.instagram) {
      return (profileFields.sociel.instagram = req.body.instagram);
    }
  }
);

module.exports = router;
