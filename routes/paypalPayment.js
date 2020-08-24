const express = require("express");
const router = express.Router();

const {
  getUserById,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication");

router.param("userId", getUserById);

const { getToken, processPayment } = require("../controllers/paypalPayment");
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
