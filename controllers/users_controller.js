const User = require("../models/user");

module.exports.profile = function (req, res) {
  // if (req.cookies.user_id) {
  //   User.findById(req.cookies.user_id, function (err, user) {
  //     if (err) {
  //       console.log("error...");
  //       return;
  //     }
  //     if (user) {
  return res.render("profile", {
    title: "Profile",
  });
  //       } else {
  //         return res.redirect("/users/sign-in");
  //       }
  //     });
  //   } else {
  //     return res.redirect("/users/sign-in");
  //   }
};

// render the sign in Page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// render the sign up Page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding the user in signup");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating the user while signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign in and create a session for user
module.exports.createSession = function (req, res) {
  // User.findOne({ email: req.body.email }, function (err, user) {
  //   if (err) {
  //     console.log("error in finding the user in signup");
  //     return;
  //   }
  //   if (user) {
  //     if (user.password != req.body.password) {
  //       return res.redirect("back");
  //     }
  //     res.cookie("user_id", user.id);
  //     return res.redirect("/users/profile");
  //   } else {
  //     return res.redirect("back");
  //   }
  // });
  return res.redirect("/");
};

// Sign out
module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};
