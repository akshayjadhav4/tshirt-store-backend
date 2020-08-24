const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin
} = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");

//params
router.param("userID", getUserById);
router.param("categoryID", getCategoryById);

//actual routes

//Create
router.post(
  "/category/create/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//Read
router.get("/category/:categoryID", getCategory);
router.get("/categories", getAllCategory);

//Update
router.put(
  "/category/:categoryID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//delete 
router.delete(
    "/category/:categoryID/:userID",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteCategory
  );
module.exports = router;
