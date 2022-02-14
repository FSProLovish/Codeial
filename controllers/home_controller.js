const Post = require("../models/post");

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
      res.render("home", {
        title: "Codeial | Home",
        posts: posts,
      });
    });
};
