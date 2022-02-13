const Post = require("../models/post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // Populate the post of each user
  Post.find({})
    .populate("user")
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
