const express = require("express");
const {
  getUser,
  updateUserStatus,
  deleteUser,
  createUser,
  UserSignup,
  UserSignin,
  resetPassword,
  getProfile,
  updateProfile,
  deleteProfile,
  getUserById,
} = require("../controllers/user.controller");
const singleUpload = require("../middlewares/multer");
const router = express.Router();
const VerifyToken = require("../middlewares/userAuthToken");

router.post("/signup", UserSignup);
router.post("/signin", UserSignin);
router.post("/forgot", resetPassword);
router.get("/get", getUser);
router.patch("/:id/status", updateUserStatus);
router.delete("/:id", deleteUser);
// router.post("/create",createUser)

// router.get('/profile ',VerifyToken.verifyToken, getUserById);
router.route("/profile").get(VerifyToken.verifyToken, getUserById);
router.route("/profile/update").put(VerifyToken.verifyToken,singleUpload, updateProfile);
// router.put('/profile', VerifyToken.verifyToken, updateProfile);
router.delete("/profile", VerifyToken.verifyToken, deleteProfile);

module.exports = router;
