const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
  // Populate the post of each user
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      if (err) {
        console.log("error in fetching the posts from database");
        return;
      }
      User.find({}, function (err, users) {
        res.render("home", {
          title: "Codeial | Home",
          posts: posts,
          all_users: users,
        });
      });
    });
};
