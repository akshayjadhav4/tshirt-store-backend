var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signup, signin, signout ,isSignedIn} = require("../controllers/authentication");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    check("email")
      .isEmail()
      .withMessage("Email Required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long")
      .matches(/\d/)
      .withMessage("must contain a number")
  ],
  signup
);


router.post(
  "/signin",
  [
    check("email")
      .isEmail()
      .withMessage("Email Required"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("Password must required.")
  ],
  signin
);


router.get("/signout", signout);


// router.get("/testroute", isSignedIn,(req,res)=>{
//   res.json(req.auth)
// });

module.exports = router;
